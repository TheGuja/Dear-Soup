'use server'

import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "./supabase/server";

export async function getCurrentUser(supabase: SupabaseClient) {
    const { data: {user}, error } = await supabase.auth.getUser();

    if (error) {
        throw error;
    }

    // console.log(user?.id);
    return user?.id;
};

// export async function getCurrentJournalID(supabase: SupabaseClient) {
    
// }

export async function saveJournal(sharedUser: string, title: string, journalID: string): Promise<void> {
    // Check handling of empty string for sharedUser, title, and content
    const supabase = await createClient()
    // const [currentUserID, sharedUserID] = await Promise.all([getCurrentUser(supabase), supabase.from("users").select("id").eq("email", sharedUser).single()]);
    const sharedUserID = await supabase.from('users').select('id').eq('email', sharedUser).single()

    if (sharedUserID.error) {
        console.error("Failed to find the user: ", sharedUserID.error);
        throw sharedUserID.error;
    } else {
        // const { error } = await supabase.from('journals').insert({ content: content, owner_id: currentUserID, other_id: sharedUserID.data.id, title: title});
        const { error } = await supabase.from('journals').update({ other_id: sharedUserID.data.id, title: title}).eq('journal_id', journalID)

        if (error) {
            throw error;
        };
    };
}

// TODO: split share and save functionality apart
export async function savePage(journalID: string, date: Date, content: string): Promise<void> {
    // Check handling of empty string for sharedUser, title, and content
    const supabase = await createClient();
    const currentUserID = await getCurrentUser(supabase);
    // console.log("Fetching");
    // console.log(currentUserID);
    // const [currentUserID, sharedUserID] = await Promise.all([getCurrentUser(supabase), supabase.from("users").select("id").eq("email", sharedUser).single()]);
    // const sharedUserID = await supabase.from('users').select('id').eq('email', sharedUser).single()

    const { error } = await supabase.from('pages').upsert({user_id: currentUserID, journal_id: journalID, created_at: date, page_content: content}, {onConflict: 'journal_id, user_id, created_at'})

    if (error) {
        throw error;
    };
};

export async function loadPage(journalID: string, date: Date): Promise<string> {
    const supabase = await createClient();
    // const currentUserID = await getCurrentUser(supabase);
    const EMPTY_STATE = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

    
    const formattedDate = new Intl.DateTimeFormat('en-US').format(date);
    const res = await supabase.from('pages').select('page_content').match({'journal_id': journalID, 'created_at': formattedDate}).single();

    if (res.error && res.error.code == 'PGRST116') {
        return EMPTY_STATE;
    } else if (res.error) {
        throw res.error;
    } else {
        const content = res.data?.page_content;
        console.log(content);
        return content;
    };
};