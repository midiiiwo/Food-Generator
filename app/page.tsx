import Hero from "@/components/Hero";
import GenerateFood from "@/components/generateFood";
import { FloatingNav } from "@/components/ui/floatingNavbar";
import Image from "next/image";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import About from "@/components/about";
import Vector from "@/components/images/vector2.png";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div
        className="absolute inset-0 bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${Vector.src})`,
          opacity: 0.5, // adjust the value to your liking (0 = fully transparent, 1 = fully opaque)
        }}
      ></div>
      <div className="relative z-10 max-w-7xl w-full">
        
        <Hero />
        <About />
      </div>
    </main>
  );
}
