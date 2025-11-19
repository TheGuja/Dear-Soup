


// export default function JournalBook() {

//     return (
//         <HTMLFlipBook width={300} height={500} className="">
//             <div className="demoPage">
//                 Page 1
//                 <Tiptap />
//             </div>
//             <div className="demoPage ">Page 2</div>
//             <div className="demoPage">Page 3</div>
//             {/* <div className="demoPage">Page 4</div> */}
//         </HTMLFlipBook>
//   );
// }

"use client";

import HTMLFlipBook from "react-pageflip";

export default function JournalBook() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-stone-100">
      <HTMLFlipBook
        width={400}
        height={550}
        className="shadow-2xl"
        showCover={true}
        style={{ backgroundColor: "#f8f5f2" }}
      >
        <div>
            Page 1
        </div>
        <div>
            Page 2
        </div>
        <div>
            Page 3
        </div>
      </HTMLFlipBook>
    </div>
  );
}

// function Page({ number, children }: { number: number; children: React.ReactNode }) {
//   return (
//     <div className="bg-white border border-gray-300 shadow-inner p-6 flex flex-col justify-between">
//       <div className="text-gray-800 font-serif leading-relaxed">{children}</div>
//       <div className="text-gray-400 text-right text-sm mt-4">Page {number}</div>
//     </div>
//   );
// }


// function Page({ number, children }: { number: number; children: React.ReactNode }) {
//   return (
//     <div className="bg-white border border-gray-300 shadow-inner p-6 flex flex-col justify-between">
//       <div className="text-gray-800 font-serif leading-relaxed">{children}</div>
//       <div className="text-gray-400 text-right text-sm mt-4">Page {number}</div>
//     </div>
//   );
// }
