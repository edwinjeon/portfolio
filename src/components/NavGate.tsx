"use client";
import { usePathname } from "next/navigation";
import TopBar from "@/components/TopBar";

export default function NavGate({ children }: { children: React.ReactNode }) {
  const isHome = usePathname() === "/";
  return (
    <>
      {!isHome && <TopBar />}
      {children}
    </>
  );
}
