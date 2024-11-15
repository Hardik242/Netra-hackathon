"use client";

import {ChevronRightIcon} from "@heroicons/react/24/solid";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import {useEffect, useState} from "react";
import {getSoldierTransaction} from "../_services/dataFunctions";

function formatDateTime(dateTimeString) {
    // Parse the input string into a Date object
    const date = new Date(dateTimeString);

    // Get the year, month, day, hours, minutes, and seconds
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    // Pad month with leading zero if needed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const shortDateFormat = `${day}-${month}-${year}`;
    const shortTimeFormat = `${hours}:${minutes}:${seconds}`;
    const combinedFormat = `${shortDateFormat} ${shortTimeFormat}`;

    return {
        shortDate: shortDateFormat,
        shortTime: shortTimeFormat,
        combined: combinedFormat,
    };
}

const columns = [
    "Id",
    "Weapon Serial",
    "Transaction Type",
    "Date",
    "Time",
    "Details",
];

export default function SoldierRecords({transactions}) {
    const {isOpen, onClose, onOpenChange, onOpen} = useDisclosure();
    const [data, setData] = useState(null);

    async function handleOpenModal(id) {
        onOpen();
        const data1 = await getSoldierTransaction(id);
        setData(data1);
    }

    return (
        <div className="sm:py-4 sm:px-4 self-center flex flex-col gap-4 sm:border-stone-700 rounded-md w-full max-w-5xl">
            <Table>
                <TableHeader>
                    {columns.map((column) => (
                        <TableColumn align="center" key={column}>
                            {column}
                        </TableColumn>
                    ))}
                </TableHeader>

                <TableBody emptyContent="No transaction to display">
                    {transactions.map((record) => {
                        const {
                            id,
                            created_at,
                            transactionType: type,
                            weaponId,
                        } = record;
                        const {shortDate, shortTime} =
                            formatDateTime(created_at);

                        return (
                            <TableRow key={id}>
                                <TableCell key={id}>{id}</TableCell>
                                <TableCell key={weaponId}>{weaponId}</TableCell>
                                <TableCell>
                                    <Chip
                                        size="sm"
                                        color={
                                            type === "issue"
                                                ? "success"
                                                : "danger"
                                        }
                                        variant="flat">
                                        {type}
                                    </Chip>
                                </TableCell>
                                <TableCell className="text-nowrap">
                                    {shortDate}
                                </TableCell>
                                <TableCell>{shortTime}</TableCell>
                                <TableCell>
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
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

function DetailModal({isOpen, onOpenChange, data, setData}) {
    useEffect(() => {
        return () => setData(null);
    }, [setData]);

    const {
        id = "",
        created_at = "",
        weaponId: weaponSerial = "",
        userId = "",
        transactionType = "",
        reason = "",
        weapons: {
            id: weaponId = "",
            type = "",
            model = "",
            image: imagesrc = "",
            officerId = "",
        } = {},
    } = data?.[0] || {};

    const {shortDate = "", shortTime = ""} = created_at
        ? formatDateTime(created_at)
        : {};

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="md"
            isDismissable={false}>
            <ModalContent className="max-h-[80%]">
                {data ? (
                    <>
                        <ModalHeader className="gap-x-5 items-center">
                            <p className="text-xl block">
                                Transaction
                                <span className="font-bold"> #{id}</span>
                            </p>
                            <Chip
                                className=""
                                size="sm"
                                color={
                                    transactionType === "issue"
                                        ? "success"
                                        : "danger"
                                }
                                variant="flat">
                                {transactionType}
                            </Chip>{" "}
                        </ModalHeader>

                        <ModalBody className="gap-y-4 overflow-y-auto">
                            <Card className="overflow-visible">
                                <CardHeader>
                                    <h2 className="font-bold flex items-center">
                                        <svg
                                            className="size-4 inline mr-3"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 576 512">
                                            <path d="M265.2 192c25.4 0 49.8 7.1 70.8 19.9L336 512l-192 0 0-174.3L90.4 428.3c-11.2 19-35.8 25.3-54.8 14.1s-25.3-35.8-14.1-54.8L97.7 258.8c24.5-41.4 69-66.8 117.1-66.8l50.4 0zM160 80a80 80 0 1 1 160 0A80 80 0 1 1 160 80zM448 0c8.8 0 16 7.2 16 16l0 116.3c9.6 5.5 16 15.9 16 27.7l0 109.3 16-5.3 0-56c0-8.8 7.2-16 16-16l16 0c8.8 0 16 7.2 16 16l0 84.5c0 6.9-4.4 13-10.9 15.2L480 325.3l0 26.7 48 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-44 0 23 92.1c2.5 10.1-5.1 19.9-15.5 19.9L432 512c-8.8 0-16-7.2-16-16l0-96-16 0c-17.7 0-32-14.3-32-32l0-144c0-17.7 14.3-32 32-32l0-32c0-11.8 6.4-22.2 16-27.7L416 32c-8.8 0-16-7.2-16-16s7.2-16 16-16l16 0 16 0z" />
                                        </svg>
                                        Weapon Details
                                    </h2>
                                </CardHeader>
                                <CardBody className="gap-y-2 border-t-1">
                                    <div className="w-full overflow-hidden rounded-2xl relative h-48 sm:h-56 shadow-md">
                                        <Image
                                            src={imagesrc}
                                            quality={60}
                                            fill
                                            className="object-cover"
                                            alt="Weapon image"
                                        />
                                    </div>
                                    <div className="text-xl font-black text-center w-full">
                                        {model}
                                    </div>
                                    <div>
                                        <span>Serial : </span>
                                        <span>{weaponSerial}</span>
                                    </div>
                                    <div>
                                        <span>Type : </span>
                                        <span>{type}</span>
                                    </div>
                                </CardBody>
                            </Card>

                            <Card className="overflow-visible">
                                <CardHeader>
                                    <h2 className="font-bold flex items-center">
                                        <svg
                                            className="size-4 inline mr-3"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512">
                                            <path d="M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z" />
                                        </svg>
                                        Transaction Details
                                    </h2>
                                </CardHeader>
                                <CardBody className="gap-y-2 border-t-1">
                                    <div>
                                        <span>Id : </span>
                                        <span>{id}</span>
                                    </div>
                                    <div>
                                        <span>Transaction Type : </span>
                                        <span>{transactionType}</span>
                                    </div>
                                    <div>
                                        <span>Type : </span>
                                        <span>{type}</span>
                                    </div>
                                    {reason && (
                                        <div>
                                            <span>Reason : </span>
                                            <span>{reason}</span>
                                        </div>
                                    )}
                                    <div>
                                        <span>Date : </span>
                                        <span>{shortDate}</span>
                                    </div>
                                    <div>
                                        <span>Time : </span>
                                        <span>{shortTime}</span>
                                    </div>
                                </CardBody>
                            </Card>
                        </ModalBody>
                    </>
                ) : (
                    <>
                        <ModalHeader>
                            <p>Details Loading</p>
                        </ModalHeader>

                        <ModalBody className="w-full h-72 flex flex-col items-start justify-center gap-y-3">
                            <Skeleton className="h-36 w-full rounded-xl" />
                            <Skeleton className="h-4 w-[50%] rounded-lg" />
                            <Skeleton className="h-4 w-[70%] rounded-lg" />
                            <Skeleton className="h-4 w-[63%] rounded-lg" />
                            <Skeleton className="h-4 w-[40%] rounded-lg" />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
