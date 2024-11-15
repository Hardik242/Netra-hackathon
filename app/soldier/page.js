import {customRedirect} from "../_services/dataFunctions";

export const metadata = {
    title: "Soldier",
};

export default function Page() {
    customRedirect("/soldier/weapons");
}
