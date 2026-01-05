'use client'

import { redirect } from "next/navigation"

export default function JournalIcon({ journal }: { journal: Journal }) {

  return (
    <button
      type="button"
      className={`
        group relative flex items-center gap-4
        w-full max-w-xs p-4
        m-4
        rounded-2xl
        border border-stone-200 bg-white
        transition-all duration-200 ease-in-out
        cursor-pointer outline-none
        hover:bg-stone-100 hover:border-stone-400 hover:shadow-md
      `}
      onDoubleClick={() => redirect(`/journals/${journal.journal_id}`)}
    >

      <div className="flex-shrink-0">
         <div className="h-12 w-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-500 group-hover:bg-stone-200 group-hover:text-stone-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
         </div>
      </div>

      <span className="text-sm font-medium text-stone-600 truncate w-full text-left select-none group-hover:text-stone-900">
        {journal.title}
      </span>

    </button>
  );
}