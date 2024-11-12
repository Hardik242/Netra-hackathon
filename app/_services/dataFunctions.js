"use server";

import {supabase} from "../_lib/supabase";

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
