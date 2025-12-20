import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "./supabase/server";

export async function getCurrentUser(supabase: SupabaseClient) {
    const { data: {user}, error } = await supabase.auth.getUser();

    if (error) {
        throw error;
    }

    return user?.id;
};

export async function save(supabase: SupabaseClient) {
    // get current journal id
}