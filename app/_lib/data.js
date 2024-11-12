"use server";

import {faker} from "@faker-js/faker";
import {supabase} from "./supabase";

const supabaseURL =
    "https://owtuzlfrjwlpygwbomcc.supabase.co/storage/v1/object/public/weapons/";

function getSupabaseDateFormat(sDate) {
    // Create a new Date object from the sDate
    const newDate = new Date(sDate);

    // Add a random number of days (0-4)
    newDate.setDate(newDate.getDate() + Math.floor(Math.random() * 4 + 2));

    // Format the date to ISO 8601 format, suitable for Supabase
    const formattedDate = newDate.toISOString();

    return formattedDate;
}

export async function generateAndUploadData() {
    // Replace these with your actual weapon type and model arrays
    const weaponTypes = [
        "Assault Rifle",
        "Battle Rifle",
        "Submachine Gun",
        "Sniper Rifle",
        "Machine Gun",
        "Shotgun",
        "Pistol",
        "Revolver",
        "Grenade Launcher",
        "Rocket Launcher",
        "Carbine",
        "Light Machine Gun",
        "Heavy Machine Gun",
        "Anti-Tank Rifle",
    ];
    const weaponModels = [
        "AK-47",
        "M16A4",
        "M4 Carbine",
        "AR-15",
        "HK416",
        "FN SCAR",
        "M14",
        "G36",
        "Galil",
        "Dragunov SVD",
        "M24 Sniper Rifle",
        "Barrett M82",
        "MP5",
        "UZI",
        "PP-19 Bizon",
        "M249 SAW",
        "PKM",
        "Remington 870",
        "Mossberg 500",
        "Glock 17",
        "SIG Sauer P226",
        "Beretta M9",
        "Colt Python",
        "M203 Grenade Launcher",
        "RPG-7",
        "Carl Gustav",
        "FN FAL",
    ];

    // Fake data variables (adjust quantity as needed)
    const numUsers = 10;
    const numWeapons = 100;
    const numTransactions = 100;

    // Generate random user data
    const usersData = [];
    for (let i = 0; i < numUsers; i++) {
        usersData.push({
            email: `soldier${i + 1}@example.com`,
            password: `password${i + 1}`,
            options: {
                data: {
                    role: [
                        "soldier",
                        "officer",
                        "soldier",
                        "officer",
                        "technician",
                    ][Math.floor(Math.random() * 5)],
                    fullName: `Fake User ${i + 1}`,
                    militaryID: `S${(i + 1).toString().padStart(5, "0")}`,
                },
            },
        });
    }

    console.log("users created...");

    // Insert users and get their IDs
    const userCreationPromises = usersData.map(async function (user) {
        const {data: userId, error} = await supabase.auth.signUp(user);
        if (error) {
            console.error("Error creating users:", error);
            return;
        }
        return userId;
    });

    console.log("users uploaded...");

    const userIds = await Promise.all(userCreationPromises);
    const soldierIds = userIds.filter(
        (user) => user.user.user_metadata.role === "soldier"
    );
    const officerIds = userIds.filter(
        (user) => user.user.user_metadata.role === "officer"
    );
    const technicianIds = userIds.filter(
        (user) => user.user.user_metadata.role === "technician"
    );

    // Generate random weapon data
    const weaponsData = [];
    for (let i = 0; i < numWeapons; i++) {
        const st = ["available", "maintenance", "issued"][
            Math.floor(Math.random() * 3)
        ];
        const wpnName = `WPN${(i + 1).toString().padStart(5, "0")}`;
        const imageURL = `${supabaseURL}${wpnName}.jpg`;

        weaponsData.push({
            serialNumber: `${wpnName}`,
            type: weaponTypes[Math.floor(Math.random() * weaponTypes.length)],
            model: weaponModels[
                Math.floor(Math.random() * weaponModels.length)
            ],
            status: st,
            image: imageURL,
            soldierId:
                st === "issued"
                    ? soldierIds[Math.floor(Math.random() * soldierIds.length)]
                          .user.id
                    : null, // Randomly assign officer
            officerId:
                officerIds[Math.floor(Math.random() * officerIds.length)].user
                    .id, // Randomly assign officer
            technicianId:
                technicianIds[Math.floor(Math.random() * technicianIds.length)]
                    .user.id, // Randomly assign technician
        });
    }

    console.log("weapons created...");

    // Insert weapon data
    const {data: weaponIds, error: weaponError} = await supabase
        .from("weapons")
        .insert(weaponsData)
        .select();

    if (weaponError) {
        console.error("Error creating weapons:", weaponError);
        return;
    }

    console.log("weapons uploaded...");

    // Generate random transaction data
    const transactionsData = [];
    for (let i = 0; i < numTransactions; i++) {
        const randomTransactionType = Math.floor(Math.random() * 4); // 0-3 for issue, allocate, return, maintenance
        const randomWeaponId = Math.floor(Math.random() * weaponIds.length);
        transactionsData.push({
            weaponId: weaponIds[randomWeaponId].serialNumber,
            transactionType:
                randomTransactionType === 0
                    ? "issue"
                    : randomTransactionType === 1
                    ? "allocate" // Assuming "allocate" for officers
                    : randomTransactionType === 2
                    ? "return"
                    : "maintenance",
            userId:
                randomTransactionType === (0 || 2)
                    ? soldierIds[Math.floor(Math.random() * soldierIds.length)]
                          .user.id
                    : officerIds[Math.floor(Math.random() * officerIds.length)]
                          .user.id,
            reason:
                randomTransactionType === 2
                    ? ["Repair", "Cleaning"][Math.floor(Math.random() * 2)]
                    : "", // Reason only for return
        });
    }

    console.log("transactions created...");

    // Insert transaction data
    const {data: transactionIds, error: transactionError} = await supabase
        .from("transactions")
        .insert(transactionsData)
        .select();

    if (transactionError) {
        console.error("Error creating transactions:", transactionError);
        return;
    }

    console.log("transactions uploaded...");

    // Generate fake maintenance data
    const maintenanceData = [];

    for (let i = 0; i < numWeapons / 4; i++) {
        const randomDateType = Math.floor(Math.random() * 3); //0-Completed 1-Ongoing 2-Pending
        const sDate =
            randomDateType === 0
                ? faker.date.recent({days: 20})
                : randomDateType === 1
                ? faker.date.recent({days: 2})
                : faker.date.soon({days: 20});
        const eDate =
            randomDateType === 0 ? getSupabaseDateFormat(sDate) : null;
        // Adjust the number of maintenance records as needed
        maintenanceData.push({
            weaponModel: weaponIds[i].model,
            scheduledDate: sDate,
            completedDate: eDate,
            status:
                randomDateType === 0
                    ? "completed"
                    : randomDateType === 1
                    ? "ongoing"
                    : "pending",
            officerId:
                officerIds[Math.floor(Math.random() * officerIds.length)].user
                    .id, // Randomly assign officer
            technicianId:
                technicianIds[Math.floor(Math.random() * technicianIds.length)]
                    .user.id,
            notes: "Regular maintenance check",
        });
    }

    console.log("maintenance created...");

    // Insert maintenance data
    const {data: maintenanceIds, error: maintenanceError} = await supabase
        .from("maintenance")
        .insert(maintenanceData)
        .select();

    if (maintenanceError) {
        console.error("Error creating maintenance records:", maintenanceError);
        return;
    }

    console.log("maintenance uploaded...");
}
