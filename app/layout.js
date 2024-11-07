import "@/app/_styles/globals.css";
import {Roboto_Slab} from "next/font/google";
import {NextProvider} from "./_context/NextProvider";

const poppins = Roboto_Slab({
    subsets: ["latin"],
    display: "swap",
    weight: "400",
});

export const metadata = {
    title: {
        template: "%s | Netra - E-Kote System",
        default: "Netra - E-Kote System",
    },
    description:
        "Netra is a comprehensive web application designed to revolutionize weapon management. By leveraging cutting-edge technologies, Netra offers a user-friendly and efficient solution to address the challenges faced by the Indian Defence Force Services.",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body className={`${poppins.className} `}>
                <NextProvider>{children}</NextProvider>
            </body>
        </html>
    );
}
