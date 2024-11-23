"use server";

import {createClient} from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function getWeapons(Id) {
    const supabase = await createClient();
    const {data, error} = await supabase
        .from("weapons")
        .select("*")
        .eq("soldierId", Id);
    if (error) {
        console.log(error);
        throw new Error("weapons could not be loaded");
    }

    return data;
}

export async function getSoldierTransactions(Id) {
    const supabase = await createClient();
    const {data, error} = await supabase
        .from("transactions")
        .select("*")
        .eq("userId", Id);
    if (error) {
        console.log(error);
        throw new Error("transactions could not be loaded");
    }
    return data;
}

export async function userLoginWithEmail({email, password}) {
    const supabase = await createClient();
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        console.log(error);
        throw new Error("transactions could not be loaded");
    }
    return {data, error};
}

export async function getSoldierTransaction(id) {
    const supabase = await createClient();
    const {data, error} = await supabase
        .from("transactions")
        .select("*,weapons(*)")
        .eq("id", id);
    if (error) {
        console.log(error);
        throw new Error("transactions could not be loaded");
    }
    return data;
}

export async function useLogoutUser() {
    const supabase = await createClient();

    const {error} = await supabase.auth.signOut();

    if (error) {
        console.log(error);
        throw new Error("Error logging out");
    }

    revalidatePath("/");
    redirect("/login");
}
