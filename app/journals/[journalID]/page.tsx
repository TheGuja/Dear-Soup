// import { createClient } from "@/utils/supabase/server";
// import { notFound } from "next/navigation";
// import { use } from "react"
// import getJournalContent from "./actions";
import ShareDialogue from "@/app/ui/components/ShareDialogue";
import Journal from "@/app/ui/components/Journal";

// interface JournalProps {
//     params: { journalID: string};
// }

export default async function Page({ params }: {params: Promise<{ journalID: string }>}) {
    const { journalID } = await params;

    return (
        <div>
            <ShareDialogue journalID={journalID}/>
            <Journal journalID={journalID}/>
        </div>
    );
}

