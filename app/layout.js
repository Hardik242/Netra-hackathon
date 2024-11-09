import "@/app/_styles/globals.css";
import {Montserrat} from "next/font/google";
import Header from "./_component/Header";
import {NextProvider} from "./_context/NextProvider";

const poppins = Montserrat({
    subsets: ["latin"],
    display: "swap",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
            <body
                className={`${poppins.className} bg-slate-100 flex relative min-h-screen w-screen overflow-x-hidden antialiased`}>
                {
                    <>
                        <Header />

                        <main className="min-h-full flex-1 flex px-4">
                            <NextProvider>{children}</NextProvider>
                        </main>
                    </>
                }
            </body>
        </html>
    );
}
