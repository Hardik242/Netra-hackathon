"use client";

import {usePathname} from "next/navigation";
import {supabase} from "../_lib/supabase";
import {customRedirect} from "../_services/dataFunctions";
import {useState} from "react";

export default function CheckLoggedin({children}) {
    //     const [isAuthenticated, setIsAuth] = useState(false);
    //     let pathname = usePathname();
    //     pathname = String(pathname.split("/")[1]);
    //     (async function () {
    //         console.log("enter");
    //         const session = JSON.parse(
    //             localStorage.getItem("sb-owtuzlfrjwlpygwbomcc-auth-token")
    //         );
    //         console.log(session);
    //         if (session === null) {
    //             console.log("inside");
    //             customRedirect("login");
    //             return;
    //         }
    //         const {
    //             data: {user},
    //             error,
    //         } = await supabase.auth.getUser();
    //         console.log(user);
    //         if (error) throw new Error(error.message);
    //         if (!pathname) customRedirect(session.user.user_metadata.role);
    //         if (pathname === String(session.user.user_metadata.role))
    //             setIsAuth(true);
    //         else customRedirect(pathname);
    //     })();
    //     return isAuthenticated ? children : null;
}
