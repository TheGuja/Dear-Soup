'use client'

import Image from "next/image";
import Navbar from "./ui/home/Navbar";
import { useState } from "react";
import Sidebar from "./ui/components/Sidebar";
// import { createClient } from "@/utils/supabase/server";

// export default function Home() {
//   return (
//       <div className="h-screen flex items-center justify-center bg-stone-950">
//         <h1 className="text-8xl font-bold text-center text-white">
//           Dear Soup
//         </h1>
//       </div>
//   )
// }
export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="min-h-screen">
      {!isOpen && (
          <button onClick={() => setIsOpen(true)} className="fixed top-4 left-4 z-50 px-4 py-2 bg-white text-black rounded hover:bg-stone-200">
            Open
          </button>
        )
      }
      <Sidebar open={isOpen} onClose={() => setIsOpen(false)} />
      <section className="h-[90vh] flex items-center justify-center bg-stone-950 text-white">
        <h1 className="text-8xl font-bold text-center">Dear Soup</h1>
      </section>
      <section className="min-h-screen flex items-center justify-center bg-white text-black">
        <h2 className="text-4xl font-semibold text-center">Welcome to the next Soup</h2>
      </section>
    </div>    
  );
}
