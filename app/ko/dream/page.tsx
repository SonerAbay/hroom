"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { UrlBuilder } from "@bytescale/sdk";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import LoadingDots from "../../../components/LoadingDots";
import ResizablePanel from "../../../components/ResizablePanel";
import Toggle from "../../../components/Toggle";
import appendNewToName from "../../../utils/appendNewToName";
import downloadPhoto from "../../../utils/downloadPhoto";
import { CompareSlider } from "../../../components/CompareSlider";
import { UploadDropzone } from "@bytescale/upload-widget-react";

const options = {
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
  editor: { images: { crop: false } },
  styles: {
    colors: {
      primary: "#205047", // Updated to greenish color
      error: "#d23f4d", // Error messages
      shade100: "#fff", // Standard text
      shade200: "#fffe", // Secondary button text
      shade300: "#fffd", // Secondary button text (hover)
      shade400: "#fffc", // Welcome text
      shade500: "#fff9", // Modal close button
      shade600: "#fff7", // Border
      shade700: "#fff2", // Progress indicator background
      shade800: "#fff1", // File item background
      shade900: "#ffff", // Various (draggable crop buttons, etc.)
    },
  },
};

export default function DreamPage() {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>(""); // Initially empty
  const [promptStrength, setPromptStrength] = useState<number>(0.8);
  const [guidanceScale, setGuidanceScale] = useState<number>(15);
  const [useAIRefinement, setUseAIRefinement] = useState<boolean>(false); // Checkbox state

  const UploadDropZone = () => (
    <UploadDropzone
      options={options}
      onUpdate={({ uploadedFiles }) => {
        if (uploadedFiles.length !== 0) {
          const image = uploadedFiles[0];
          const imageName = image.originalFile.originalFileName;
          const imageUrl = UrlBuilder.url({
            accountId: image.accountId,
            filePath: image.filePath,
            options: {
              transformation: "preset",
              transformationPreset: "thumbnail",
            },
          });
          setPhotoName(imageName);
          setOriginalPhoto(imageUrl);
          generatePhoto(imageUrl);
        }
      }}
      width="670px"
      height="250px"
    />
  );

  async function generatePhoto(fileUrl: string) {
    setLoading(true);
    const res = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl: fileUrl,
        prompt,
        prompt_strength: promptStrength,
        guidance_scale: guidanceScale,
        useAIRefinement, // Pass checkbox value to backend
      }),
    });

    const newPhoto = await res.json();
    if (res.status !== 200) {
      setError(newPhoto);
    } else {
      setRestoredImage(newPhoto);
    }
    setLoading(false);
  }

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
        <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-100 sm:text-6xl mb-5">
          꿈의 방을 <span className="text-[#205047]">생성</span>하세요
        </h1>
        <ResizablePanel>
          <AnimatePresence>
            <motion.div className="flex justify-between items-center w-full flex-col mt-4">
              {!restoredImage && (
                <>
                  <div className="space-y-4 w-full max-w-sm">
                    <div className="flex mt-3 items-center space-x-3">
                      <Image src="/number-1-white.svg" width={30} height={30} alt="1 icon" />
                      <p className="text-left font-medium">프롬프트 입력</p>
                    </div>
                    <input
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="방을 설명하세요..."
                      className="mt-2 p-2 text-black w-full rounded-md"
                    />
                    {/* AI Refinement Checkbox */}
                    <div className="flex items-center space-x-2 mt-2">
                      <input
                        type="checkbox"
                        checked={useAIRefinement}
                        onChange={(e) => setUseAIRefinement(e.target.checked)}
                        id="ai-refinement"
                        className="form-checkbox"
                      />
                      <label htmlFor="ai-refinement" className="text-gray-300">
                      AI가 내 프롬프트를 다듬도록 설정
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4 w-full max-w-sm mt-10">
                    <div className="flex mt-3 items-center space-x-3">
                      <Image src="/number-2-white.svg" width={30} height={30} alt="2 icon" />
                      <p className="text-left font-medium">프롬프트 강도</p>
                    </div>
                    <input
                      type="number"
                      value={promptStrength}
                      onChange={(e) => setPromptStrength(parseFloat(e.target.value))}
                      min={0}
                      max={1}
                      step={0.1}
                      className="mt-2 p-2 text-black w-full rounded-md"
                    />
                  </div>
                  <div className="space-y-4 w-full max-w-sm mt-10">
                    <div className="flex mt-3 items-center space-x-3">
                      <Image src="/number-3-white.svg" width={30} height={30} alt="3 icon" />
                      <p className="text-left font-medium">안내 강도</p>
                    </div>
                    <input
                      type="number"
                      value={guidanceScale}
                      onChange={(e) => setGuidanceScale(parseFloat(e.target.value))}
                      min={1}
                      max={50}
                      step={1}
                      className="mt-2 p-2 text-black w-full rounded-md"
                    />
                  </div>

                  <div className="mt-4 w-full max-w-sm">
                    <div className="flex mt-6 w-96 items-center space-x-3">
                      <Image src="/number-4-white.svg" width={30} height={30} alt="4 icon" />
                      <p className="text-left font-medium">방 사진 업로드</p>
                    </div>
                  </div>
                </>
              )}
              {restoredImage && (
                <div>
                  여기 당신의 <b>{prompt}</b>에 기반한 방이 있습니다.
                </div>
              )}
              <div className={`${restoredLoaded ? "visible mt-6 -ml-8" : "invisible"}`}>
                <Toggle sideBySide={sideBySide} setSideBySide={(newVal) => setSideBySide(newVal)} />
              </div>
              {restoredLoaded && sideBySide && <CompareSlider original={originalPhoto!} restored={restoredImage!} />}
              {!originalPhoto && <UploadDropZone />}
              {originalPhoto && !restoredImage && (
                <Image alt="original photo" src={originalPhoto} className="rounded-2xl h-96" width={475} height={475} />
              )}
              {restoredImage && originalPhoto && !sideBySide && (
                <div className="flex sm:space-x-4 sm:flex-row flex-col">
                  <div>
                    <h2 className="mb-1 font-medium text-lg">원래 방</h2>
                    <Image alt="original photo" src={originalPhoto} className="rounded-2xl relative w-full h-96" width={475} height={475} />
                  </div>
                  <div className="sm:mt-0 mt-8">
                    <h2 className="mb-1 font-medium text-lg">생성된 방</h2>
                    <a href={restoredImage} target="_blank" rel="noreferrer">
                      <Image alt="restored photo" src={restoredImage} className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in w-full h-96" width={475} height={475} onLoadingComplete={() => setRestoredLoaded(true)} />
                    </a>
                  </div>
                </div>
              )}
              {loading && (
                <button disabled className="bg-[#205047] rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 w-40">
                  <span className="pt-4">
                    <LoadingDots color="white" style="large" />
                  </span>
                </button>
              )}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-8" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <div className="flex space-x-2 justify-center">
                {originalPhoto && !loading && (
                  <button
                    onClick={() => {
                      setOriginalPhoto(null);
                      setRestoredImage(null);
                      setRestoredLoaded(false);
                      setError(null);
                    }}
                    className="bg-[#205047] rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-[#1a4238] transition"
                  >
                    새 방 생성
                  </button>
                )}
                {restoredLoaded && (
                  <button
                    onClick={() => {
                      downloadPhoto(restoredImage!, appendNewToName(photoName!));
                    }}
                    className="bg-white rounded-full text-black border font-medium px-4 py-2 mt-8 hover:bg-gray-100 transition"
                  >
                    생성된 방 다운로드
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
}
