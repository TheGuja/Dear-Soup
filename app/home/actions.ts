'use server'

import { createClient } from "@/utils/supabase/server"
import { getCurrentUser } from "@/utils/utils"

export async function getJournalEntries() {
    const supabase = await createClient();

    const currentUserID = await getCurrentUser();
    console.log(currentUserID);

    const { data, error } = await supabase.rpc('get_shared_journal_content', {p_user_id: currentUserID});
    // const { newData,  newError } = await supabase.from("journals")

    console.log(data);
    return data
};