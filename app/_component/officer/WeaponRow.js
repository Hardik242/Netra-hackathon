import {getUserDetailsById} from "@/app/_services/dataFunctions";
import {formatDateTime} from "@/app/_services/helpers";
import {Avatar, Chip, Spinner, User} from "@nextui-org/react";
import Image from "next/image";
import {useEffect, useState} from "react";
import GunIcon from "../GunIcon";
import {useQuery} from "@tanstack/react-query";

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
            return soldierId ? (
                <PersonDetails id={soldierId} />
            ) : (
                <span>&mdash;</span>
            );
        case "Technician Details":
            return status === "maintenance" ? (
                <PersonDetails id={technicianId} />
            ) : (
                <span>&mdash;</span>
            );
        case "Allocation Date":
            return <span>{shortDate}</span>;
        case "Allocation Time":
            return <span>{shortTime}</span>;
    }
}

function PersonDetails({id}) {
    const {data, isLoading} = useQuery({
        queryFn: async () => {
            return await getUserDetailsById(id);
        },
        queryKey: ["user", id],
        staleTime: Infinity,
    });

    let militaryID = "";
    let fullName = "";

    if (!isLoading) {
        militaryID = data.user_metadata.militaryID;
        fullName = data.user_metadata.fullName;
    }

    return (
        <User
            avatarProps={{
                showFallback: true,
                src: "none",
            }}
            description={!isLoading ? militaryID : "Loading..."}
            name={!isLoading ? fullName : "Loading..."}
        />
    );
}
