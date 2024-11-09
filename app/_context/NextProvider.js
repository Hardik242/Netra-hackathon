"use client";

import {NextUIProvider} from "@nextui-org/react";
import {useRouter} from "next/navigation";

export function NextProvider({children}) {
    const router = useRouter();

    return (
        <NextUIProvider className="w-full min-h-full" navigate={router.push}>
            {children}
        </NextUIProvider>
    );
}
