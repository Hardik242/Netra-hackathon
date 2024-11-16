import WeaponsList from "@/app/_component/WeaponsList";
import {getWeapons} from "@/app/_services/dataFunctions";
import {createClient} from "@/utils/supabase/server";

export default async function Page() {
    const supabase = await createClient();
    const {
        data: {
            user: {id},
        },
    } = await supabase.auth.getUser();
    console.log(id);

    const weapons = await getWeapons(id);

    return (
        <div className="py-2 flex gap-5 flex-col w-full">
            <h1 className="text-black font-extrabold text-xl sm:text-3xl">
                Issued Weapons
            </h1>

            <WeaponsList weapons={weapons} />
        </div>
    );
}
