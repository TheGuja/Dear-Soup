import Sidebar from "../ui/components/Sidebar";
import { createClient } from "@/utils/supabase/server";
import { getJournalEntries } from "./actions";
import { getCurrentUser } from "@/utils/utils";
import { type } from "os";
import Link from "next/link";

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

    // data.map((journal, index)) => {
    //     console.log(journal_id)
    // })
    // data.map((journal: Journal) => {
    //     console.log(journal.title);
    // });
    // const {journal_id, content, owner_id, other_id, title} = data[0]
    // const newData = JSON.stringify(data);
    // console.log(currentUserID);
    // console.log(data.data);
    // const newData = data.data
    // console.log(data[0])
    // console.log(newData[0].journal_id)

    // console.log(journal_id, content, title)
    
    return (
        <div>
            <Sidebar />
            <ul>
                {data.map((journal: Journal) => (
                    // <li key={index}>
                    //     {journal.title}
                    // </li>
                    <Link key={journal.title} href={`/testjournal/${journal.journal_id}`}>{journal.title}</Link>
                ))}
            </ul>
        </div>
    )
}