import WeaponsList from "@/app/_component/WeaponsList";
import {getWeapons} from "@/app/_services/dataFunctions";

export default async function Page() {
    const weapons = await getWeapons("b0cc1483-4f14-4b5c-b82c-46689f00a0f3");

    return (
        <div className="py-2 flex gap-5 flex-col w-full">
            <h1 className="text-black font-extrabold text-xl sm:text-3xl">
                Issued Weapons
            </h1>

            <WeaponsList weapons={weapons} />
        </div>
    );
}
