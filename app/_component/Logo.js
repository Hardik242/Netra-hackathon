import Image from "next/image";
import icon from "@/public/logo.png";
import localFont from "next/font/local";
import Link from "next/link";
// import {} from "next/font/google";

const fontStyle = localFont({
    src: "../_font/newFont.ttf",
    // subsets: ["latin"],
    display: "swap",
});

export default function Logo({isLogin = false}) {
    return (
        <Link href="/" className="flex gap-3 justify-center items-center">
            <div
                className={`rounded-full overflow-hidden ${
                    isLogin ? "size-14 sm:size-16" : "size-11 sm:size-12"
                } border flex items-center justify-center`}>
                <Image
                    priority
                    src={icon}
                    width={isLogin ? 64 : 48}
                    height={isLogin ? 64 : 48}
                    quality={100}
                    alt="Netra Logo"
                />
            </div>
            {isLogin ? (
                <p
                    className={`text-sky-900 font-bold text-2xl sm:text-3xl tracking-wider  ${fontStyle.className}`}>
                    Netra
                </p>
            ) : (
                <p
                    className={`text-sky-400 font-bold text-xl sm:text-2xl tracking-wider  ${fontStyle.className}`}>
                    Netra
                </p>
            )}
        </Link>
    );
}
