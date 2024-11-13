"use client";

import {NextUIProvider} from "@nextui-org/react";
import {useRouter} from "next/navigation";

export function NextProvider({children}) {
    const router = useRouter();
    const originalWarn = console.warn;

    console.warn = (...args) => {
        const [firstArg] = args;
        if (
            typeof firstArg === "string" &&
            firstArg.includes(
                "An aria-label or aria-labelledby prop is required for accessibility."
            )
        ) {
            return;
        }

        originalWarn(...args);
    };

    return (
        <NextUIProvider className="w-full min-h-full" navigate={router.push}>
            {children}
        </NextUIProvider>
    );
}
