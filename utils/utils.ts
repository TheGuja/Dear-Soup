'use server'

import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "./supabase/server";
import { format } from "path";

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

export async function loadPage(journalID: string, date: Date): Promise<string[]> {
    const supabase = await createClient();
    // const currentUserID = await getCurrentUser(supabase);
    const EMPTY_STATE = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
    const formattedDate = new Intl.DateTimeFormat('en-US').format(date);

    const toReturn: string[] = [EMPTY_STATE, EMPTY_STATE];
    const [currentUserID, content] = await Promise.all([getCurrentUser(supabase), supabase.from('pages').select('page_content, user_id').match({ 'journal_id': journalID, 'created_at': formattedDate})])
    // console.log(content);
    // toReturn[0] = "a"
    // console.log(toReturn)

    // if (content.error) {
    //     throw content.error;
    // } else {
    //     if (content.data.length == 0) {
    //         return [EMPTY_STATE, EMPTY_STATE];
    //     }
    // };

    if (content.error) {
        throw content.error;
    } else {
        content.data.forEach((entry) => {
            // console.log(entry.page_content);
            if (entry.user_id == currentUserID) {
                toReturn[0] = entry.page_content;
            } else {
                toReturn[1] = entry.page_content;
            };
        });
    };

    return toReturn;

    // const currentUserID = getCurrentUser(supabase)
    // const getOtherUser = await supabase.from('journals').select('other_id').eq('journal_id', journalID).single()

    // const userIDs = await Promise.all([getCurrentUser(supabase), supabase.from('journals').select('other_id').eq('journal_id', journalID).single()]);
    // if (getOtherUser.error) {
    //     throw getOtherUser.error;
    // } else {
    // const { data, error } = await supabase.from('pages').select('page_content, user_id').match({ 'journal_id': journalID, 'created_at': formattedDate }).in('user_id', userIDs);

    // if (error) {
    //     throw error;
    // };

    // console.log(data);


    // const contentMap = data.reduce((acc, row) => {
    //     acc[row.user_id] = row.page_content;
    //     return acc;
    // }, {});
    
    // let otherUserID = "";
    // if (otherUser.error) {
    //     throw otherUser.error;
    // } else {
    //     otherUserID = otherUser.data.other_id;
    // };

    // };

    // const { data, error } = await supabase.from('pages').select('page_content, user_id').match({ 'journal_id': journalID, 'created_at': formattedDate }).in('user_id', userIDs);
    // const otherUserID = supabase.from('journals').select('other_id')
    // console.log(data);

    // const [currentUserPage, otherUserPage] = await Promise.all([supabase.from('pages').select('page_content').match({ 'journal_id': journalID, 'created_at': formattedDate, 'user_id': currentUserID}).single(), supabase.from('pages').select('page_content').match({ 'journal_id': journalID, 'created_at': formattedDate, 'user_id': otherUserID}).single()]);
    // console.log(currentUserPage);
    // console.log(otherUserPage);
    // await supabase.from('pages').select('page_content').match({ 'journal_id': journalID, 'created_at': formattedDate, 'user_id': currentUserID});
    // await supabase.from('pages').select('page_content').match({ 'journal_id': journalID, 'created_at': formattedDate, 'user_id': otherUserID});


    
    
    // const res = await supabase.from('pages').select('page_content').match({'journal_id': journalID, 'created_at': formattedDate});
    // console.log(res.data?.at(0)?.page_content);
    // if (res.count == null) {
    //     console.log("none")
    // }
    // console.log(res.data?.length)

    // if (res.error) {
    //     throw res.error;
    // } else if (res.data?.length == 0) {
    //     return EMPTY_STATE;
    // } else {
    //     const content = res.data?.at(0)?.page_content;
    //     // console.log(res);
    //     // console.log(content);
    //     return content;
    // };
};