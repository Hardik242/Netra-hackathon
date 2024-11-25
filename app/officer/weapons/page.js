import WeaponsTable from "@/app/_component/officer/WeaponsTable";
import Spinner from "@/app/_component/Spinner";
import {Suspense} from "react";

export default function page() {
    return (
        <div className="pb-4 flex flex-col gap-3">
            <h1 className="font-extrabold text-black text-3xl">
                Total weapons allocated
            </h1>

            <Suspense fallback={<Spinner />}>
                <WeaponsTable />
            </Suspense>
        </div>
    );
}
