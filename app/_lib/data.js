import {faker} from "@faker-js/faker";

function generateRandomFullName() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return `${firstName} ${lastName}`;
}

function generateMilitaryID() {
    const prefix = faker.string.alphanumeric(2).toUpperCase();
    const number = faker.number.int({min: 100000, max: 999999});
    const suffix = faker.string.alphanumeric(2).toUpperCase();

    return `${prefix}-${number}-${suffix}`;
}

export function generateFakeData(tableName /* , numRows */) {
    //     const data = {};

    //     for (let i = 0; i < numRows; i++) {
    switch (tableName) {
        case "users":
            return {
                email: faker.internet.email(),
                password: "test01234",
                options: {
                    data: {
                        role: faker.helpers.arrayElement([
                            "soldier",
                            "technician",
                            "officer",
                            "admin",
                        ]),
                        fullName: generateRandomFullName(),
                        militaryID: generateMilitaryID(),
                    },
                },
            };
            break;
        case "weapons":
            return {
                serialNumber: faker.string.alphanumeric(10),
                type: faker.helpers.arrayElement([
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
                ]),
                model: faker.helpers.arrayElement([
                    "AK-47",
                    "M16A4",
                    "M4 Carbine",
                    "AR-15",
                    "HK416",
                    "SCAR-L",
                    "FN FAL",
                    "G36",
                    "M14",
                    "SVD Dragunov",
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
                ]),
                status: faker.helpers.arrayElement([
                    "available",
                    "issued",
                    "maintenance",
                ]),
                created_at: faker.date.past(),
                updated_at: faker.date.past(),
            };
            break;
        case "transactions":
            return {
                //     weaponSerial: faker.number.int({min: 1, max: 100}),
                //     userID: faker.number.int({min: 1, max: 100}),
                transactionType: faker.helpers.arrayElement([
                    "issue",
                    "return",
                    "maintenance",
                ]),
                reason: faker.lorem.sentence(),
                created_at: faker.date.past(),
            };
            break;
    }
    //     }

    //     return data;
}
