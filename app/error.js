"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Error({error}) {
    let path = usePathname();
    path = "/" + (path.split("/")[1] ?? "soldier");
    return (
        <main className="flex justify-center items-center text-wrap break-all flex-col gap-6 w-full">
            <h1 className="sm:text-3xl text-2xl font-semibold">
                Something went wrong!
            </h1>
            <p className="text-lg">ERROR! {error.message}</p>

            <Link
                href={path}
                className="inline-block bg-slate-500 rounded-3xl hover:bg-slate-700 text-white sm:px-6 sm:py-3 px-4 py-2 text-lg">
                Go to HomePage
            </Link>
        </main>
    );
}
