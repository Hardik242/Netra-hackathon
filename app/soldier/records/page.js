import SoldierRecords from "@/app/_component/SoldierRecords";
import Spinner from "@/app/_component/Spinner";
import {getSoldierTransactions} from "@/app/_services/dataFunctions";
import {Suspense} from "react";

export const validate = 0;

export default async function Page() {
    const transactions = await getSoldierTransactions(
        "482d1b70-ae83-4628-ad14-61fdda18cca2"
    );

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
