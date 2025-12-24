'use client'

import { useEffect, useState } from "react";
import { createJournal } from "@/utils/utils";
import { getJournalEntries } from "@/utils/utils";
import Link from "next/link";


type Journal = {
    journal_id: string,
    content: string,
    owner_id: string,
    other_id: string,
    title: string
};

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
        <div>
            <button onClick={async () => {
                await createJournal();
            }}>
                Create new Journal
            </button>
            <ul>
                {journalEntries.map((journal: Journal) => (
                    <Link key={journal.title} href={`/journals/${journal.journal_id}`}>{journal.title}</Link>
                ))}
            </ul>
        </div>
    )
}