'use server'

import { createClient } from "@/utils/supabase/server"
import { getCurrentUser } from "@/utils/utils";
import { SupabaseClient } from "@supabase/supabase-js";

// export async function save(title: FormData, content: string) {
    
// };

// export async function getJournals() {
//     const supabase = await createClient();

//     const userID = getCurrentUser(supabase);
//     console.log(userID);
// }

export async function createJournal(): Promise<void> {
    const supabase = await createClient();
    const currentUserID = await getCurrentUser(supabase);
    const { error } = await supabase.from('journals').insert({ owner_id: currentUserID });

    if (error) {
        throw error;
    }
}