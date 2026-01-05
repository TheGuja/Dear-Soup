'use client'

import { useEffect, useState } from "react";
import { createJournal } from "@/utils/utils";
import { getJournalEntries } from "@/utils/utils";
import DSBanner from "../ui/components/DSBanner";
import Link from "next/link";
import JournalIcon from "../ui/components/JournalIcon";
import Journal from "../ui/components/Journal";

export default function Page() {
    const [journalEntries, setJournalEntries] = useState<Journal[]>([])
    useEffect(() => {
        const getJournalLinks: () => Promise<void> = async () => {
            const data = await getJournalEntries();
            setJournalEntries(data);
        }

        getJournalLinks();
    }, []);

    return (
        <div className="min-h-screen">
            <DSBanner />
            {/* <button className="border hover:bg-stone-200 m-4 cursor-pointer" onClick={async () => {
                await createJournal();
            }}>
                Create new Journal
            </button> */}
            <button
                className="
                    group
                    inline-flex items-center gap-3
                    bg-white text-gray-700
                    px-4 py-3 h-14 min-w-[140px]
                    rounded-2xl
                    shadow-md hover:shadow-lg
                    hover:bg-slate-50
                    transition-all duration-200 ease-in-out
                    m-4 cursor-pointer
                "
                onClick={async () => {
                    await createJournal();
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-blue-500 drop-shadow-sm" />
                    <path d="M12 5V19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-blue-500 drop-shadow-sm" />
                    <path d="M12 5V19" stroke="#78716C" strokeWidth="3" strokeLinecap="round" />
                    <path d="M5 12H19" stroke="#78716C" strokeWidth="3" strokeLinecap="round" />
                    <path d="M5 12H12" stroke="#78716C" strokeWidth="3" strokeLinecap="round" />
                    <path d="M12 5V12" stroke="#78716C" strokeWidth="3" strokeLinecap="round" /> 
                </svg>

                <span className="font-medium text-sm tracking-wide">Create new Journal</span>
            </button>
            <div className="flex flex-row flex-wrap">
                {journalEntries.map((journal: Journal) => (
                    <JournalIcon key={journal.journal_id} journal={journal}/>
                ))}
            </div>
        </div>
    )
}