'use server'

import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

// interface JournalProps {
//     params: { journalID: string};
// }

export default async function Page({ params }: {params: Promise<{ journalID: string }>}) {
    const { journalID } = await params;
    const supabase = await createClient();

    const res = await supabase.from("journals").select("content").eq("journal_id", journalID).single();
    const content = res.data?.content;
    // console.log(content);
    // console.log(data[0].content);

    return (
        <div>
            <h1>Journal ID: {content}</h1>
        </div>
    );
}