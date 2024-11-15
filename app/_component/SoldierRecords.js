"use client";

import {ChevronRightIcon} from "@heroicons/react/24/solid";
import {
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import {useState} from "react";

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
                            reason,
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
                                        variant="faded"
                                        radius="md"
                                        size="sm">
                                        <ChevronRightIcon className="size-4 sm:size-5" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
