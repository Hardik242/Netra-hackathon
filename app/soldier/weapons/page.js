import {ScanButton} from "@/app/_component/ScanModal";
import Spinner from "@/app/_component/Spinner";
import {Card} from "@nextui-org/react";
import {Suspense} from "react";
import dynamic from "next/dynamic";

const WeaponsList = dynamic(() =>
    import("@/app/_component/soldier/WeaponsListSoldier").then(
        (imp) => imp.WeaponsList
    )
);

export const metadata = {
    title: "Weapons",
};

export default async function Page() {
    return (
        <div className="flex gap-5 flex-col w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start">
                <h1 className="text-black font-extrabold text-xl sm:text-3xl">
                    Issued Weapons
                </h1>

                <Card className="w-full sm:w-auto mt-2">
                    <ScanButton />
                </Card>
            </div>

            <Suspense fallback={<Spinner />} key={crypto.randomUUID()}>
                <WeaponsList />
            </Suspense>
        </div>
    );
}
