"use client";

import {Card} from "@nextui-org/card";
import {Select, SelectItem} from "@nextui-org/select";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/table";
import Image from "next/image";

import {ReturnButton} from "./ReturnModal";
import {ScanButton} from "./ScanModal";

export default function WeaponsList({weapons}) {
    const modelMenuItems = [...new Set(weapons.map((weapon) => weapon.model))];
    modelMenuItems.unshift("All");
    const typeMenuItems = [...new Set(weapons.map((weapon) => weapon.type))];
    typeMenuItems.unshift("All");

    return (
        <div className="sm:py-4 sm:px-4 self-center flex flex-col gap-4 sm:border-stone-700 rounded-md w-full max-w-5xl">
            <Card key={crypto.randomUUID()} className="px-3 py-3 gap-4">
                <ScanButton />

                <div className="flex gap-1 sm:gap-2 items-center justify-center md:justify-end">
                    <Select
                        size="sm"
                        className="max-w-48"
                        label="Filter by"
                        placeholder="Model">
                        {modelMenuItems.map((item) => (
                            <SelectItem key={crypto.randomUUID()}>
                                {item}
                            </SelectItem>
                        ))}
                    </Select>

                    <Select
                        size="sm"
                        className="max-w-48"
                        label="Filter by"
                        placeholder="Type">
                        {typeMenuItems.map((item) => (
                            <SelectItem key={crypto.randomUUID()}>
                                {item}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </Card>

            <Table
                key={crypto.randomUUID()}
                selectionMode="multiple"
                shadow="md"
                color="primary">
                <TableHeader className="bg-slate-500">
                    <TableColumn key={1}>Image</TableColumn>
                    <TableColumn key={2}>Serial</TableColumn>
                    <TableColumn key={3}>Model</TableColumn>
                    <TableColumn key={4}>Type</TableColumn>
                    <TableColumn key={5}>Issued on</TableColumn>
                </TableHeader>

                <TableBody>
                    {weapons.map((weapon) => (
                        <TableRow key={weapon.serial}>
                            <TableCell key={crypto.randomUUID()}>
                                <Image
                                    src={weapon.image}
                                    width={80}
                                    height={80}
                                    className="aspect-square object-contain"
                                    alt={weapon.model}
                                />
                            </TableCell>

                            <TableCell key={crypto.randomUUID()}>
                                {weapon.serialNumber}
                            </TableCell>

                            <TableCell key={crypto.randomUUID()}>
                                {weapon.model}
                            </TableCell>

                            <TableCell key={crypto.randomUUID()}>
                                {weapon.type}
                            </TableCell>

                            <TableCell key={crypto.randomUUID()}>
                                {new Date().toLocaleDateString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Card
                key={crypto.randomUUID()}
                className="px-3 py-3 gap-3 justify-between flex-row items-center">
                <span className="text-sm text-stone-600">
                    0 of {weapons.length} selected
                </span>
                <ReturnButton />
            </Card>
        </div>
    );
}
