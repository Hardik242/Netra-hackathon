import {customRedirect} from "./_services/dataFunctions";

export default function Page() {
    // return <CheckLoggedin />;
    customRedirect("login");
}
