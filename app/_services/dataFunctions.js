"use server";

import {createClient} from "@/utils/supabase/server";

const supabase = await createClient();

export async function getWeapons(Id) {
    const {data, error} = await supabase
        .from("weapons")
        .select("serialNumber,type,model,status,image,updated_at")
        .eq("soldierId", Id);
    if (error) {
        console.log(error);
        throw new Error("weapons could not be loaded");
    }

    return data;
}

export async function getSoldierTransactions(Id) {
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
