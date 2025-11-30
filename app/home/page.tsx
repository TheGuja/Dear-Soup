import Navbar from "../ui/home/Navbar";
import { createClient } from "@/utils/supabase/server";
import { getJournalEntries } from "./actions";
import { getCurrentUser } from "@/utils/utils";

export default async function Page() {
    const supabase = await createClient();
    // const data = await getJournalEntries();
    // TODO: Create view for table later
    const currentUserID = await getCurrentUser();
    const res = await supabase.from("journals").select("*").or(`owner_id.eq.${currentUserID},other_id.eq.${currentUserID}`);
    const data = res.data

    if (!data) {
        throw Error;
    }

    const {journal_id, content, owner_id, other_id, title} = data[0]
    // const newData = JSON.stringify(data);
    // console.log(currentUserID);
    // console.log(data.data);
    // const newData = data.data
    // console.log(data[0])
    // console.log(newData[0].journal_id)

    // console.log(journal_id, content, title)
    
    return (
        <div>
            {/* <h1>Dear Soup Home Page</h1> */}
            <Navbar/>
            <button className="border border-black">
                Create New Journal
            </button>
        </div>
    )
}