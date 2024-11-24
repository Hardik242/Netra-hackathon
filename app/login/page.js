"use client";

import loginBG from "@/public/bg-login.png";
import dynamic from "next/dynamic";
import Spinner from "../_component/Spinner";

const Card = dynamic(
    () => import("@nextui-org/react").then((nextui) => nextui.Card),
    {
        loading: () => <Spinner />,
    }
);

const CardHeader = dynamic(() =>
    import("@nextui-org/react").then((nextui) => nextui.CardHeader)
);

const LoginForm = dynamic(
    () => import("../_component/LoginForm").then((nextui) => nextui.LoginForm),
    {
        loading: () => <Spinner />,
    }
);

import {Playfair_Display} from "next/font/google";
import Image from "next/image";
import Logo from "../_component/Logo";
import {Suspense} from "react";

const fontLogin = Playfair_Display({
    subsets: ["latin"],
    display: "swap",
});

// export const metadata = {
//     title: "Login",
// };

export default function Page() {
    return (
        <div className="flex w-full min-h-full justify-center items-center">
            <Image
                src={loginBG}
                fill
                sizes="90vw"
                className="object-cover"
                quality={90}
                alt="bg image"
            />
            <Card className="min-w-72 flex-1 max-w-md my-5 overflow-visible backdrop-blur-sm bg-slate-200/40">
                <CardHeader className="py-5 flex justify-center flex-col gap-4 ">
                    <Logo isLogin />
                    <h1
                        className={`w-full font-bold text-4xl text-center ${fontLogin.className}`}>
                        Login
                    </h1>
                </CardHeader>
                <form>
                    <Suspense fallback={<Spinner />} key={crypto.randomUUID()}>
                        <LoginForm />
                    </Suspense>
                </form>
            </Card>
        </div>
    );
}
