import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FloatingNav } from "@/components/ui/floatingNavbar";
import Link from "next/link";
import FooterPage from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Food generator",
  description: "Generated by biggmidd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black-100`}>
        <FloatingNav
          navItems={[
            { name: "Home", link: "/", icon: <FaHome /> },
            { name: "Menu", link: "/menu", icon: <MdOutlineMenuBook /> },
            { name: "Favourite", link: "/favourites", icon: <IoFastFoodOutline /> },
            { name: "About", link: "/about", icon: <FaRegUser /> },
          ]}
        />
        {children}
        <FooterPage/>
      </body>
    </html>
  );
}