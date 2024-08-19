"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SquigglyLines from "../../components/SquigglyLines";
import { useRouter, usePathname } from "next/navigation";

export default function HomePage() {
  const pathname = usePathname();
  const isKorean = pathname ? pathname.startsWith("/ko") : false;

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
          한국에서 가장 진보된{" "}
          <span className="relative whitespace-nowrap text-[#205047]">
            <SquigglyLines />
            <span className="relative">AI 인테리어 도구</span>
          </span>
          .
        </h1>

        <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-400 text-gray-500 leading-7">
          한국의 미니멀리스트 디자인을 완벽하게 반영하는 AI 도구로, 당신의 공간을 세련되고 현대적으로 변화시켜 보세요.
        </h2>

        <Link
          className="bg-[#205047] rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-[#1a4238] transition"
          href={`${isKorean ? "/ko/dream" : "/en/dream"}`}
        >
          꿈의 방 생성하기
        </Link>

        <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-8 sm:flex-row flex-col">
              <div>
                <h3 className="mb-1 font-medium text-lg text-gray-300">원래 방</h3>
                <Image
                  alt="Original photo of a room"
                  src="/original-pic.jpeg"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <h3 className="mb-1 font-medium text-lg text-gray-300">생성된 방</h3>
                <Image
                  alt="Generated photo of a room"
                  width={400}
                  height={400}
                  src="/generated-pic-2.jpeg"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
