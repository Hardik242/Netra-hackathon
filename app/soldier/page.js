import {redirect} from "next/navigation";

export const metadata = {
    title: "Soldier",
};

export default function Page() {
    redirect("/soldier/weapons", "replace");
}
