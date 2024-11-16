"use server";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import {createClient} from "@/utils/supabase/server";

export async function login(formData) {
    const supabase = await createClient();

    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const {
        error,
        data: {user},
    } = await supabase.auth.signInWithPassword(data);

    if (error) {
        console.log(error);
        throw new Error("unknown error occured can't login");
    }

    const rolePath = user?.user_metadata?.role || "error";

    revalidatePath("/", "layout");
    redirect(`/${rolePath}`);
}
