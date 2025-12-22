'use server'

import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "@/utils/utils";
import { createJournal } from "./actions";
import Link from "next/link";
import Sidebar from "../ui/components/Sidebar";
import CreateJournal from "../ui/components/CreateJournal";

type Journal = {
    journal_id: string,
    content: string,
    owner_id: string,
    other_id: string,
    title: string
};

export default async function Page() {
    const supabase = await createClient();
    // const data = await getJournalEntries();
    // TODO: Create view for table later
    const currentUserID = await getCurrentUser(supabase);
    const res = await supabase.from("journals").select("*").or(`owner_id.eq.${currentUserID},other_id.eq.${currentUserID}`);
    const data = res.data;
    // console.log(data);

    if (!data) {
        throw Error;
    }

    return (
        <div>
            <Sidebar />
            <CreateJournal onClick={createJournal} />
            <ul>
                {data.map((journal: Journal) => (
                    // <li key={index}>
                    //     {journal.title}
                    // </li>
                    <Link key={journal.title} href={`/journals/${journal.journal_id}`}>{journal.title}</Link>
                ))}
            </ul>
        </div>
    )
}