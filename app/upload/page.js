"use client";

import UploadButton from "../_component/UploadButton";
import {generateFakeData} from "../_lib/data";
import {supabase} from "../_lib/supabase";

export default function Page() {
    //     console.log("hello");
    async function handleUploadUsers() {
        //   "use server";
        try {
            await supabase.auth.signUp(generateFakeData("users"));
            console.log("Users data uploaded successfully!");
        } catch (error) {
            console.error("Error uploading users data:", error);
        }
    }

    async function handleUploadWeapons() {
        try {
            await supabase.from("weapons").insert(generateFakeData("weapons"));
            console.log("Weapons data uploaded successfully!");
        } catch (error) {
            console.error("Error uploading weapons data:", error);
        }
    }

    async function handleUploadTransactions() {
        try {
            await supabase
                .from("transactions")
                .insert(generateFakeData("transactions"));
            console.log("Transactions data uploaded successfully!");
        } catch (error) {
            console.error("Error uploading transactions data:", error);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <UploadButton handleFn={handleUploadUsers}>
                    Upload user
                </UploadButton>
                <br />
                <UploadButton handleFn={handleUploadWeapons}>
                    Upload weapons
                </UploadButton>
                <br />
                <UploadButton handleFn={handleUploadTransactions}>
                    Upload transactions
                </UploadButton>
            </div>
        </div>
    );
}
