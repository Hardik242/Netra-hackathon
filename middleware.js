import {updateSession} from "@/utils/supabase/middleware";
import {NextResponse} from "next/server";

export async function middleware(request) {
    const {supabase} = await updateSession(request);

    const {
        data: {user},
    } = await supabase.auth.getUser();

    //     console.log(role);

    if (!user && !request.nextUrl.pathname.startsWith("/login")) {
        console.log("here");
        return NextResponse.redirect(new URL(`/login`, request.url));
    }

    const {role} = user?.user_metadata || "error";

    if (user && request.nextUrl.pathname.startsWith(`/${role}`)) {
        return NextResponse.next();
    } else if (user && !request.nextUrl.pathname.startsWith(`/${role}`)) {
        return NextResponse.redirect(new URL(`/${role}`, request.url));
    } else if (user) {
        return NextResponse.redirect(new URL(`/${role}`, request.url));
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
