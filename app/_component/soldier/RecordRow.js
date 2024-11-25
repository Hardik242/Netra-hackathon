"use client";

import {ChevronRightIcon} from "@heroicons/react/24/solid";
import {Button, Chip, useDisclosure} from "@nextui-org/react";
import {useState} from "react";
import {getSoldierTransaction} from "../../_services/dataFunctions";
// import DetailModal from "./DetailRecordModal";
import dynamic from "next/dynamic";
import {formatDateTime} from "@/app/_services/helpers";

const DetailModal = dynamic(() => import("./DetailRecordModal"));

export default function RecordRow({record, name}) {
    const {isOpen, onOpenChange, onOpen} = useDisclosure();
    const [data, setData] = useState(null);

    async function handleOpenModal(id) {
        onOpen();
        const data1 = await getSoldierTransaction(id);
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
                <Chip
                    size="sm"
                    color={type === "issue" ? "success" : "danger"}
                    variant="flat">
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
