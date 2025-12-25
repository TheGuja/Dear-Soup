'use server'

import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";

export async function getCurrentUser(supabase: SupabaseClient) {
    const { data: {user}, error } = await supabase.auth.getUser();

    if (error) {
        throw error;
    }

    return user?.id;
};

export async function shareJournal(journalID: string, sharedUser: string): Promise<void> {
    // Check handling of empty string for sharedUser, title, and content
    const supabase = await createClient()
    const sharedUserID = await supabase.from("users").select("id").eq("email", sharedUser).single();

    if (sharedUserID.error) {
        console.error("Failed to find the user: ", sharedUserID.error);
        throw sharedUserID.error;
    } else {
        const { error } = await supabase.from('journals').update({ other_id: sharedUserID.data.id }).eq("journal_id", journalID);

        if (error) {
            throw error;
        };
    };
}

export async function savePage(journalID: string, date: Date, content: string): Promise<void> {
    // Check handling of empty string for sharedUser, title, and content
    const supabase = await createClient();
    const currentUserID = await getCurrentUser(supabase);
    const { error } = await supabase.from('pages').upsert({user_id: currentUserID, journal_id: journalID, created_at: date, page_content: content}, {onConflict: 'journal_id, user_id, created_at'})

    if (error) {
        throw error;
    };
};

export async function saveTitle(journalID: string, title: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from('journals').update({title: title}).eq("journal_id", journalID);

    if (error) {
        throw error;
    };
};

export async function loadPage(journalID: string, date: Date): Promise<string[]> {
    const supabase = await createClient();
    const EMPTY_STATE = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
    const formattedDate = new Intl.DateTimeFormat('en-US').format(date);

    const toReturn: string[] = [EMPTY_STATE, EMPTY_STATE];
    const [currentUserID, content] = await Promise.all([getCurrentUser(supabase), supabase.from('pages').select('page_content, user_id').match({ 'journal_id': journalID, 'created_at': formattedDate})]);

    if (content.error) {
        throw content.error;
    } else {
        content.data.forEach((entry) => {
            if (entry.user_id == currentUserID) {
                toReturn[0] = entry.page_content;
            } else {
                toReturn[1] = entry.page_content;
            };
        });
    };

    return toReturn;
};

export async function getTitle(journalID: string): Promise<string> {
    const supabase = await createClient();
    const title = await supabase.from('journals').select('title').eq('journal_id', journalID).single()

    if (title.error) {
        throw title.error;
    };

    return title.data.title;
};


type Journal = {
    journal_id: string,
    content: string,
    owner_id: string,
    other_id: string,
    title: string
};

export async function createJournal(): Promise<void> {
    const supabase = await createClient();
    const currentUserID = await getCurrentUser(supabase);
    const res = await supabase.from('journals').insert({ owner_id: currentUserID }).select();

    if (res.error) {
        throw res.error;
    }

    const journalID = res.data[0].journal_id
    redirect(`/journals/${journalID}`);

};

export async function getJournalEntries(): Promise<Journal[]> {
    const supabase = await createClient();
    const currentUserID = await getCurrentUser(supabase);
    const res = await supabase.from("journals").select("*").or(`owner_id.eq.${currentUserID},other_id.eq.${currentUserID}`);

    if (res.error) {
        throw res.error;
    }

    const data = res.data;

    return data;

}