'use client'

import { useState, useRef } from "react"
import { shareJournal } from "@/utils/utils";

export default function ShareDialogue( {journalID }: { journalID: string}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const sharedUserRef = useRef<HTMLInputElement | null>(null);

    const handleShare: () => Promise<void> = async () => {
        const sharedUser = sharedUserRef.current?.value;

        if ( !sharedUser ) {
            alert("Please fill out shared user field!")
            return;
        }

        await shareJournal(journalID, sharedUser);
    };

    return (
        <div>
            {!isOpen && (
                    <button onClick={() => setIsOpen(true)} className="fixed top-4 right-4 z-50 px-3 py-2 bg-white text-black rounded-md hover:bg-stone-200 shadow-sm">
                        Share Journal
                    </button>
                )
            }
            <div onClick={() => setIsOpen(false)} className={`flex justify-center items-center fixed inset-0 bg-black/50 transition-opacity ${isOpen ? 'opacity-100 visible' : 'pointer-events-none opacity-0 invisible'}`}>
                <div className="bg-white w-11/12 max-w-md rounded-lg shadow-lg p-6 text-stone-900" onClick={(e) => e.stopPropagation()}>
                    <h1 className="text-lg font-semibold mb-3">Share Journal</h1>
                    <input id="share" name="share" type="email" ref={sharedUserRef} className="border border-gray-200 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-400"/>
                    <div className="mt-4">
                        <button onClick={handleShare} className="inline-flex px-3 py-2 rounded-md bg-stone-950 text-white hover:opacity-95 transition">Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
}