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
                    <button onClick={() => setIsOpen(true)} className="fixed top-4 right-4 z-50 px-4 py-2 bg-white text-black rounded hover:bg-stone-200">
                        Share Journal
                    </button>
                )
            }
            <div onClick={() => setIsOpen(false)} className={`flex justify-center items-center fixed inset-0 bg-black/50 transition-opacity ${isOpen ? 'opacity-100 visible' : 'pointer-events-none opacity-0 invisible'}`}>
                <div className="bg-white h-[35%] w-[25%] text-stone" onClick={(e) => e.stopPropagation()}>
                    <h1>Share Journal</h1>
                    <input id="share" name="share" type="email" ref={sharedUserRef} className="border border-stone"/>
                    <br/>
                    <button onClick={handleShare}>
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
}