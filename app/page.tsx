import { redirect } from "next/navigation";

export default function Home() {
  // Redirect users visiting the root URL to the Korean version
  redirect("/ko");
}