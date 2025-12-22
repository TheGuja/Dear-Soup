import { createClient } from "@/utils/supabase/server";
// import { notFound } from "next/navigation";
// import { use } from "react"
import getJournalContent from "./actions";
import Journal from "@/app/ui/components/Journal";

// interface JournalProps {
//     params: { journalID: string};
// }

export default async function Page({ params }: {params: Promise<{ journalID: string }>}) {
    const { journalID } = await params;
    // const supabase = await createClient();

    // const content = await getJournalContent(supabase, journalID)

    // const res = await supabase.from("journals").select("content").eq("journal_id", journalID).single();
    // const content = res.data?.content;
    // console.log(content);
    // console.log(data[0].content);

    return (
        <Journal journalID={journalID}/>
    );
}

