'use client'

import { useState } from "react"
import { redirect } from "next/navigation"

// export default function JournalIcon({ journal }: { journal: Journal}) {
//     const [isHighlighted, setIsHighlighted] = useState<boolean>(false);

//     return (
//         <button className={`border mr-4 ${isHighlighted ? "bg-stone-200": "bg-transparent"}`} onClick={() => setIsHighlighted(!isHighlighted)} onDoubleClick={() => redirect(`/journals/${journal.journal_id}`)}>{journal.title}</button>
//     )
// }

export default function JournalIcon({ journal }: { journal: Journal }) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <button
      type="button"
      // 1. Container Styles
      className={`
        group
        relative flex flex-col
        w-60 h-52
        rounded-2xl           /* Modern Drive uses very round corners */
        border
        transition-all duration-100 ease-in-out
        cursor-pointer
        outline-none
        
        /* 2. Conditional Styling (Selection State) */
        ${isSelected
          ? "bg-blue-100/30 border-blue-600 shadow-[0_0_0_1px_rgba(37,99,235,1)]" // Blue wash + Blue Border + Blue Ring
          : "bg-white border-gray-200 hover:bg-gray-50 hover:shadow-sm"
        }
      `}
      onClick={() => setIsSelected(!isSelected)}
      onDoubleClick={() => redirect(`/journals/${journal.journal_id}`)}
    >


    <span className="text-sm font-medium text-gray-700 truncate w-full text-left">
        {journal.title}
    </span>

    </button>
  );
}