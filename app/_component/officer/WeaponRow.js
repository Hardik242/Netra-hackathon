import {getUserDetailsById} from "@/app/_services/dataFunctions";
import {formatDateTime} from "@/app/_services/helpers";
import {Avatar, Chip, Spinner, User} from "@nextui-org/react";
import Image from "next/image";
import {useEffect, useState} from "react";
import GunIcon from "../GunIcon";

export default function WeaponRow({weapon, name}) {
    const {
        id,
        created_at,
        serialNumber,
        type,
        model,
        status,
        soldierId,
        technicianId,
        image: imageSrc,
    } = weapon;
    const {shortDate, shortTime} = formatDateTime(created_at);

    const color = {
        available: "success",
        issued: "primary",
        maintenance: "secondary",
    };

    switch (name) {
        case "Image":
            return (
                <div className="size-14 rounded-lg ring-1 ring-sky-200 shadow-sm overflow-hidden md:size-20">
                    <Image
                        src={imageSrc}
                        fill
                        sizes="10vw"
                        className="object-cover"
                        alt="Weapon Image"
                        onError={
                            <Avatar
                                showFallback
                                src="https://images.unsplash.com/broken"
                                fallback={
                                    <GunIcon
                                        className="animate-pulse w-6 h-6 text-default-500"
                                        size={20}
                                    />
                                }
                            />
                        }
                    />
                </div>
            );
        case "Serial Number":
            return <span>{serialNumber}</span>;
        case "Model":
            return <span>{model}</span>;
        case "Type":
            return <span>{type}</span>;
        case "Status":
            return (
                <Chip variant="flat" size="sm" color={color[status]}>
                    {status}
                </Chip>
            );
        case "Soldier deatils":
            return soldierId ? <PersonDetails id={soldierId} /> : "null";
        case "Technician Details":
            return status === "maintenance" ? (
                <PersonDetails id={technicianId} />
            ) : (
                "null"
            );
        case "Allocation Date":
            return <span>{shortDate}</span>;
        case "Allocation Time":
            return <span>{shortTime}</span>;
    }
}

function PersonDetails({id}) {
    const [userDetails, setUserDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const user = await getUserDetailsById(id);
            const {user_metadata} = user;
            const {fullName, militaryID} = user_metadata;

            setUserDetails({fullName, militaryID});
            setIsLoading(false);
        })();
    }, [id]);

    if (isLoading) return <Spinner size="sm" />;

    return (
        <User
            avatarProps={{
                showFallback: true,
                src: "none",
            }}
            description={userDetails ? userDetails.militaryID : "Loading..."}
            name={userDetails ? userDetails.fullName : "Loading..."}
        />
    );
}
