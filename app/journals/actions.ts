'use server'

import { createClient } from "@/utils/supabase/server"
import { getCurrentUser } from "@/utils/utils";

export async function save(title: FormData, content: string) {
    
};

export async function getJournals() {
    const supabase = await createClient();

    const userID = getCurrentUser();
    console.log(userID);
}