import Image from "next/image";
import SideNav from "./ui/home/Navbar";
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
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="h-[90vh] flex items-center justify-center bg-stone-950 text-white">
        <h1 className="text-8xl font-bold text-center">Dear Soup</h1>
      </section>

      {/* Scroll target section */}
      <section className="min-h-screen flex items-center justify-center bg-white text-black">
        <h2 className="text-4xl font-semibold text-center">Welcome to the next Soup</h2>
      </section>
    </div>    
  );
}
