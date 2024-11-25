import {getSoldierWeapons} from "@/app/_services/dataFunctions";
import {createClient} from "@/utils/supabase/server";
import dynamic from "next/dynamic";

const WeaponCardSoldier = dynamic(() => import("./WeaponCardSoldier"));

export async function WeaponsList() {
    const supabase = await createClient();
    const {
        data: {
            user: {id},
        },
    } = await supabase.auth.getUser();

    const weapons = await getSoldierWeapons(id);

    return (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 py-3 px-2">
            {weapons.map((weapon) => (
                <WeaponCardSoldier key={weapon.id} weapon={weapon} />
            ))}
        </div>
    );
}
