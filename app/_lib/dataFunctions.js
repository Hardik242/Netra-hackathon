import {supabase} from "./supabase";

export async function signup({fullName, email, password}) {
    const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });

    return {data, error};
}
