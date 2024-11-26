import WeaponsTable from "@/app/_component/officer/WeaponsTable";
import Spinner from "@/app/_component/Spinner";
import {getAuthUser} from "@/app/_services/dataFunctions";
import {Suspense} from "react";

export default async function page() {
    const officerId = await getAuthUser();

    return (
        <div className="pb-4 flex flex-col gap-3">
            <h1 className="font-extrabold text-black text-3xl">
                Total weapons allocated
            </h1>

            <Suspense fallback={<Spinner />}>
                <WeaponsTable officerId={officerId} />
            </Suspense>
        </div>
    );
}
