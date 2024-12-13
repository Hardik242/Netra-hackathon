"use client";

import {ChevronRightIcon} from "@heroicons/react/24/solid";
import {Button, Chip, useDisclosure} from "@nextui-org/react";
import {useState} from "react";
import {getTransaction} from "../../_services/dataFunctions";
// import DetailModal from "./DetailRecordModal";
import dynamic from "next/dynamic";
import {formatDateTime} from "@/app/_services/helpers";

const DetailModal = dynamic(() => import("./DetailRecordModal"));

const statusColor = {
    maintenance: "primary",
    allocate: "success",
    issue: "success",
    return: "danger",
};

export default function RecordRow({record, name}) {
    const {isOpen, onOpenChange, onOpen} = useDisclosure();
    const [data, setData] = useState(null);

    async function handleOpenModal(id) {
        onOpen();
        const data1 = await getTransaction(id);
        setData(data1);
    }

    const {id, created_at, transactionType: type, weaponId} = record;
    const {shortDate, shortTime} = formatDateTime(created_at);

    switch (name) {
        case "Id":
            return id;
        case "Weapon Serial":
            return weaponId;
        case "Transaction Type":
            return (
                <Chip size="sm" color={statusColor[type]} variant="flat">
                    {type}
                </Chip>
            );
        case "Date":
            return shortDate;
        case "Time":
            return shortTime;
        case "Details":
            return (
                <>
                    <Button
                        isIconOnly
                        onClick={() => handleOpenModal(id)}
                        variant="faded"
                        radius="md"
                        size="sm">
                        <ChevronRightIcon className="size-4 sm:size-5" />
                    </Button>
                    {isOpen && (
                        <DetailModal
                            isOpen={isOpen}
                            data={data}
                            setData={setData}
                            onOpenChange={onOpenChange}
                        />
                    )}
                </>
            );
    }
}
