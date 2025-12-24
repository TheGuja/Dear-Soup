'use server'

import { createClient } from '@/utils/supabase/server'
import { getCurrentUser } from '@/utils/utils';
// import { SupabaseClient } from '@supabase/supabase-js';

// export async function shareJournal(formData: FormData) {
//     const supabase = await createClient();

//     const text = formData.get('journal-text');
//     const sharedUser = formData.get('share');
//     const title = formData.get('title');

//     if (typeof text !== 'string' || typeof sharedUser !== 'string' || typeof title !== 'string') {
//         throw new Error("Expected string form values");
//     }

//     const retrievedData: { text: string; sharedUser : string; title: string} = {
//         text, sharedUser, title
//     }

//     console.log("Starting fetch")
//     const [currentUserID, sharedUserID] = await Promise.all([getCurrentUser(supabase), supabase.from("users").select("id").eq("email", retrievedData.sharedUser).single()]);
//     console.log("Completed")

//     if (sharedUserID.error) {
//         console.error("Failed to find the user: ", sharedUserID.error);
//         throw sharedUserID.error;
//     } else {
//         // console.log('Retrieved user:', sharedUserID.data.id);
//         // console.log('Owner id:', currentUserID)
//         const { error } = await supabase.from('journals').insert({ content: retrievedData.text, owner_id: currentUserID, other_id: sharedUserID.data.id, title: retrievedData.title})
        
//         if (error) {
//             throw error;
//         }
//     };
// };

// export async function shareJournal(sharedUser: string, title: string, content: string): Promise<void> {
//     // Check handling of empty string for sharedUser, title, and content
//     const supabase = await createClient()
//     const [currentUserID, sharedUserID] = await Promise.all([getCurrentUser(supabase), supabase.from("users").select("id").eq("email", sharedUser).single()]);

//     if (sharedUserID.error) {
//         console.error("Failed to find the user: ", sharedUserID.error);
//         throw sharedUserID.error;
//     } else {
//         const { error } = await supabase.from('journals').insert({ content: content, owner_id: currentUserID, other_id: sharedUserID.data.id, title: title});

//         if (error) {
//             throw error;
//         };
//     };
// }