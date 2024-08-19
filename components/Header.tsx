"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // Extract locale from the pathname (ko or en)
  const isKorean = pathname.startsWith("/ko");

  const toggleLanguage = () => {
    const nextLocale = isKorean ? "en" : "ko";
    const nextPathname = `/${nextLocale}${pathname.replace(/^\/(ko|en)/, "")}`;
    router.push(nextPathname);
  };

  return (
    <header className="flex flex-col xs:flex-row justify-between items-center w-full mt-3 border-b pb-7 sm:px-4 px-2 border-gray-500 gap-2">
      <Link href={isKorean ? "/ko" : "/en"} className="flex space-x-2">
        <Image
          alt="header text"
          src="/bed.svg"
          className="sm:w-10 sm:h-10 w-9 h-9"
          width={24}
          height={24}
        />
        <h1 className="sm:text-3xl text-xl font-bold ml-2 tracking-tight">
          H-Terrior
        </h1>
      </Link>
      <button onClick={toggleLanguage} className="flex items-center">
        <Image
          alt="Switch Language"
          src={isKorean ? "/english.svg" : "/korean.svg"} // Switch icons based on the current language
          className="w-8 h-8"
          width={32}
          height={32}
        />
      </button>
    </header>
  );
}
