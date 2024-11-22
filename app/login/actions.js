"use server";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import {createClient} from "@/utils/supabase/server";

export async function login(formData) {
    // const validateEmail = (email) => {
    //     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    //     return emailRegex.test(email);
    // };

    // const validatePassword = (password) => {
    //     const passwordRegex = /^[a-zA-Z0-9@_#$!*&]{10,16}$/;
    //     return passwordRegex.test(password);
    // }

    const supabase = await createClient();

    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    // if (!validateEmail(data.email)) {
    //     throw new Error("Invalid Email")
    // }

    //   if (!validatePassword(data.password)) {
    //       throw new Error("Invalid Password")
    //   }

    const {
        error,
        data: {user},
    } = await supabase.auth.signInWithPassword(data);

    if (error) {
        throw error;
    }

    const rolePath = user?.user_metadata?.role || "error";

    revalidatePath("/", "layout");
    redirect(`/${rolePath}`);
}
