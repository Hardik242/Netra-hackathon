"use client";

import useOfficerWeapons from "@/app/_hooks/useOfficerWeapons";
import {
    Pagination,
    Select,
    SelectItem,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import WeaponRow from "./WeaponRow";

const PAGE_SIZE = 5;

export default function WeaponsTable({officerId}) {
    const {
        isLoading,
        weapons = [],
        count = 1,
        page = 1,
    } = useOfficerWeapons(officerId);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    async function handlePagination(value) {
        const params = new URLSearchParams(searchParams);
        params.set("page", value);
        const path = `${pathname}?${params}`;
        router.push(path, {scroll: false});
    }

    const columns = [
        "Image",
        "Serial Number",
        "Model",
        "Type",
        "Status",
        "Soldier deatils",
        "Technician Details",
        "Allocation Date",
        "Allocation Time",
    ];

    const modelMenuItems = weapons
        ? [...new Set(weapons.map((weapon) => weapon.model))]
        : ["All"];
    modelMenuItems.unshift("All");

    const typeMenuItems = weapons
        ? [...new Set(weapons.map((weapon) => weapon.type))]
        : ["All"];
    typeMenuItems.unshift("All");

    // if (isLoading) return <Spinner size="lg" />;

    return (
        <Table
            selectionMode="multiple"
            color="primary"
            isHeaderSticky={true}
            fullWidth={false}
            classNames={{
                base: "md:h-full overflow-none",
                table: "min-h-[500px] overflow-auto",
            }}
            topContent={
                <div className="flex p-1 gap-1 sm:gap-2 items-center justify-center md:justify-end">
                    <Select
                        size="sm"
                        color="primary"
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
                        color="primary"
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
            }
            bottomContent={
                <div className="py-3 px-2 sm:py-4 sm:px-4 overflow-auto rounded-lg flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-start md:items-center bg-slate-200">
                    <Pagination
                        showControls
                        className="text-xs"
                        color="primary"
                        size="sm"
                        page={page}
                        total={Math.ceil(count / PAGE_SIZE)}
                        variant="faded"
                        onChange={handlePagination}
                    />
                    <span className="text-small text-default-400">
                        {`${0} of ${count} selected`}
                    </span>
                </div>
            }
            topContentPlacement="outside"
            bottomContentPlacement="outside">
            <TableHeader>
                {columns.map((column) => (
                    <TableColumn
                        align={
                            column === "Model" || column === "Type"
                                ? "start"
                                : "center"
                        }
                        key={column}>
                        {column}
                    </TableColumn>
                ))}
            </TableHeader>
            <TableBody
                isLoading={isLoading}
                loadingContent={
                    <Spinner size="lg" label="Loading Weapons..." />
                }
                emptyContent="No weapons to display"
                items={weapons}>
                {(weapon) => (
                    <TableRow key={weapon.id}>
                        {(columnKey) => {
                            return (
                                <TableCell className="text-nowrap">
                                    <WeaponRow
                                        weapon={weapon}
                                        name={columnKey}
                                    />
                                </TableCell>
                            );
                        }}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
