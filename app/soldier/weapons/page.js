import WeaponsList from "@/app/_component/WeaponsList";
import {getWeapons} from "@/app/_services/dataFunctions";

export const validate = 0;

export default async function Page() {
    const weapons = await getWeapons("482d1b70-ae83-4628-ad14-61fdda18cca2");

    return (
        <div className="py-2 flex gap-5 flex-col w-full">
            <h1 className="text-black font-extrabold text-xl sm:text-3xl">
                Issued Weapons
            </h1>

            <WeaponsList weapons={weapons} />
        </div>
    );
}
