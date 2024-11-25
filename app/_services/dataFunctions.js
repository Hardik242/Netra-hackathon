"use server";

import {createClient} from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function getAuthUser() {
    const supabase = await createClient();
    const {
        data: {
            user: {id},
        },
    } = await supabase.auth.getUser();

    console.log("server : ", id);

    return id;
}

export async function getSoldierWeapons(Id) {
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

export async function getOfficerWeapons(Id, page) {
    const supabase = await createClient();

    let query = supabase
        .from("weapons")
        .select("*", {count: "exact"})
        .eq("officerId", Id);

    const PAGE_SIZE = 5;

    const from = (page - 1) * PAGE_SIZE;

    const to = from + PAGE_SIZE - 1;

    if (page) {
        query = query.range(from, to);
    }

    let {data, error, count} = await query;

    if (error) {
        console.log(error);
        throw new Error("weapons could not be loaded");
    }

    console.log("New api call for weapons page: ", page);
    return {data, count};
}

export async function getUserDetailsById(id) {
    const supabaseAdmin = await createClient(true);
    const {
        data: {user},
        error,
    } = await supabaseAdmin.auth.admin.getUserById(id);

    if (error) {
        console.log(error);
        throw new Error("Soldier could not be loaded");
    }

    return user;
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
