import { Ratelimit } from "@upstash/ratelimit";
import redis from "../../utils/redis";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import OpenAI from "openai";


// Create a new ratelimiter, that allows 5 requests per 24 hours
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(500, "1440 m"),
      analytics: true,
    })
  : undefined;

// Initialize OpenAI client with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  // Rate Limiter Code
  if (ratelimit) {
    const headersList = headers();
    const ipIdentifier = headersList.get("x-real-ip");

    const result = await ratelimit.limit(ipIdentifier ?? "");

    if (!result.success) {
      return new Response(
        "Too many uploads in 1 day. Please try again in 24 hours.",
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": result.limit,
            "X-RateLimit-Remaining": result.remaining,
          } as any,
        }
      );
    }
  }

  // Destructure and extract the parameters from the request body
  const { imageUrl, prompt, prompt_strength, guidance_scale, useAIRefinement } = await request.json();

  // Step 1: Conditionally refine the prompt using GPT-4 if the checkbox is selected
  let finalPrompt = prompt;
  if (useAIRefinement) {
    finalPrompt = await refinePrompt(prompt);
  }

  console.log("Using Prompt: ", finalPrompt); // Debugging: Log the prompt being used in the image generation

  if (!finalPrompt) {
    return new Response("Error refining the prompt. Please try again.", {
      status: 500,
    });
  }

  // Step 2: Proceed with the image generation process using the (refined or original) prompt
  let startResponse = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + process.env.REPLICATE_API_KEY,
    },
    body: JSON.stringify({
      version: "76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", // Updated model version
      input: {
        image: imageUrl,
        prompt: finalPrompt, // Use the final prompt (refined or original)
        negative_prompt: "lowres, watermark, banner, logo, contactinfo, deformed, blurry",
        prompt_strength: prompt_strength || 0.8, // Default to 0.8 if not provided
        guidance_scale: guidance_scale || 15,    // Default to 15 if not provided
      },
    }),
  });

  let jsonStartResponse = await startResponse.json();

  let endpointUrl = jsonStartResponse.urls.get;

  // Poll for the result until the image generation is complete
  let restoredImage: string | null = null;
  while (!restoredImage) {
    console.log("polling for result...");
    let finalResponse = await fetch(endpointUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      },
    });
    let jsonFinalResponse = await finalResponse.json();

    if (jsonFinalResponse.status === "succeeded") {
      restoredImage = jsonFinalResponse.output;
    } else if (jsonFinalResponse.status === "failed") {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return NextResponse.json(
    restoredImage ? restoredImage : "Failed to generate image"
  );
}
// rate changed to 40
// Function to refine the prompt using GPT-4
async function refinePrompt(userInput: string) {
  const prompt = `Here is the user prompt for changing the design of an interior: '${userInput}'\n\nRefine this prompt to be more understandable by ControlNet and give some details without being too creative. Do not add extra furniture or windows unless the user asks for it specifically. If the prompt is not in English you need to translate it to English then refine the prompt. The output should include only the image generation prompt as if it will be directly given to the model.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an interior design prompt refiner." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000,
    });

    const choice = response.choices?.[0]?.message?.content?.trim();

    if (choice) {
      console.log("Refined Prompt: ", choice); // Debugging: Log the refined prompt
      return choice;
    } else {
      console.error("Invalid response structure from OpenAI:", response);
      return userInput; // Fall back to user input if refinement fails
    }
  } catch (error) {
    console.error("Error calling GPT-4 API:", error);
    return userInput; // Fall back to user input if an error occurs
  }
}
