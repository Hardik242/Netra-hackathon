"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import RecordRow from "./RecordRow";

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

                <TableBody
                    emptyContent="No transaction to display"
                    items={transactions}>
                    {(record) => (
                        <TableRow key={record.id}>
                            {(columnKey) => {
                                return (
                                    <TableCell className="text-nowrap">
                                        <RecordRow
                                            key={record.id}
                                            record={record}
                                            name={columnKey}
                                        />
                                    </TableCell>
                                );
                            }}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
