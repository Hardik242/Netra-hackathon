import Image from "next/image";
import icon from "@/public/icon.png";
import localFont from "next/font/local";
import Link from "next/link";
// import {} from "next/font/google";

const fontStyle = localFont({
    src: "../_font/newFont.ttf",
    // subsets: ["latin"],
    display: "swap",
    weight: "400",
});

export default function Logo({size = "12"}) {
    return (
        <Link href="/" className="flex gap-3 justify-center items-center">
            <div
                className={`rounded-full overflow-hidden size-${size} border flex items-center justify-center`}>
                <Image src={icon} quality={100} alt="This is logo" />
            </div>
            <p
                className={`text-blue-500 text-2xl tracking-wider font-bold ${fontStyle.className}`}>
                Netra
            </p>
        </Link>
    );
}
