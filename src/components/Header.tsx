import { LucideArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Header({title}:{title:string}) {
  const router = useRouter()
  return (
    <div className="flex w-full relative justify-center items-center p-2 mb-4 border-gray-500 border-b-2">
      <LucideArrowLeft
        className="h-full absolute rounded-md left-2 cursor-pointer"
        size={32}
        onClick={() => router.back()}
      />{" "}
      <span className="text-lg capitalize">{title}</span>
    </div>
  );
}
