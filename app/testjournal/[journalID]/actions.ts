import { createClient } from "@/utils/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js";

export default async function getJournalContent(supabase: SupabaseClient,journalID: string) {
    const res = await supabase.from("journals").select("content").eq("journal_id", journalID).single();
    const content = res.data?.content;

    return content
}