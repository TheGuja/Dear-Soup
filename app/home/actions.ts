'use server'

import { createClient } from "@/utils/supabase/server"
import { getCurrentUser } from "@/utils/utils"
import { SupabaseClient } from "@supabase/supabase-js";

// export async function getJournalEntries(supabase: SupabaseClient) {
//     const currentUserID = await getCurrentUser(supabase);
//     console.log(currentUserID);

//     const { data, error } = await supabase.rpc('get_shared_journal_content', {p_user_id: currentUserID});
//     // const { newData,  newError } = await supabase.from("journals")

//     console.log(data);
//     return data
// };