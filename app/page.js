import {redirect} from "next/navigation";

export default function Page() {
    // return <CheckLoggedin />;
    redirect("/login");
}
