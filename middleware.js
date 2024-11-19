import {updateSession} from "@/utils/supabase/middleware";
import {NextResponse} from "next/server";

export async function middleware(request) {
    const {supabase} = await updateSession(request);

    const {
        data: {user},
        error,
    } = await supabase.auth.getUser();

    if (error) {
        console.log(error);
    }

    //If user is not logged in and accessing protected routes, then redirect user to /login
    if (!user && request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.next();
    } else if (!user && !request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL(`/login`, request.url));
    }

    const {role} = user?.user_metadata || "error";

    //If user is logged in and accessing same role route, then give access to the route
    if (user && request.nextUrl.pathname.startsWith(`/${role}`)) {
        return NextResponse.next();
    }
    //If user is logged in and accessing any random route other than same role, then redirect to same role route
    else if (user) {
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
