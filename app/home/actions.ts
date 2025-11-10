'use server'

import { createClient } from "@/utils/supabase/server"

export async function getJournalEntries() {
    const supabase =   await createClient()

    const { data, error } = await supabase.rpc('get_shared_journal_content');

    console.log(data);
};