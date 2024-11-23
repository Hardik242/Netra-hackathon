import SoldierRecords from "@/app/_component/soldier/SoldierRecords";
import Spinner from "@/app/_component/Spinner";
import {getSoldierTransactions} from "@/app/_services/dataFunctions";
import {createClient} from "@/utils/supabase/server";
import {Suspense} from "react";

export const metadata = {
    title: "Records",
};

export default async function Page() {
    const supabase = await createClient();
    const {
        data: {
            user: {id},
        },
    } = await supabase.auth.getUser();
    const transactions = await getSoldierTransactions(id);

    return (
        <div className="py-2 flex gap-5 flex-col w-full">
            <h1 className="text-black font-extrabold text-xl sm:text-3xl">
                History
            </h1>

            <Suspense fallback={<Spinner />}>
                <SoldierRecords transactions={transactions} />
            </Suspense>
        </div>
    );
}
