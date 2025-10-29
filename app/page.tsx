import Image from "next/image";
import SideNav from "./ui/home/sidenav";

export default function Home() {
  return (
      <div className="h-screen flex items-center justify-center bg-stone-950">
        <h1 className="text-8xl font-bold text-center text-white">
          Dear Soup
        </h1>
      </div>
  )
}