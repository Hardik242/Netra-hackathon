"use client";

import {
    Button,
    Card,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import useScreenWidth from "../_hooks/useScreenWidth";
import {BarcodeScanIcon} from "./BarcodeScanner";

export default function WeaponsList({weapons}) {
    const modelMenuItems = [...new Set(weapons.map((weapon) => weapon.model))];
    modelMenuItems.unshift("All");
    const typeMenuItems = [...new Set(weapons.map((weapon) => weapon.type))];
    typeMenuItems.unshift("All");

    return (
        <div className="sm:py-4 sm:px-4 self-center flex flex-col gap-4 sm:border-stone-700 rounded-md w-full max-w-5xl">
            <Card className="px-3 py-3 gap-4">
                <ScanModal />

                <div className="flex gap-1 sm:gap-2 items-center justify-center md:justify-end">
                    <Select
                        size="sm"
                        className="max-w-48"
                        label="Filter by"
                        placeholder="Model">
                        {modelMenuItems.map((item) => (
                            <SelectItem key={item}>{item}</SelectItem>
                        ))}
                    </Select>

                    <Select
                        size="sm"
                        className="max-w-48"
                        label="Filter by"
                        placeholder="Type">
                        {typeMenuItems.map((item) => (
                            <SelectItem key={item}>{item}</SelectItem>
                        ))}
                    </Select>
                </div>
            </Card>

            <Table selectionMode="multiple" shadow="md" color="primary">
                <TableHeader className="">
                    <TableColumn minWidth={200} key={1}>
                        Image
                    </TableColumn>
                    <TableColumn key={2}>Serial</TableColumn>
                    <TableColumn key={3}>Model</TableColumn>
                    <TableColumn key={4}>Type</TableColumn>
                    <TableColumn key={5}>Issued on</TableColumn>
                </TableHeader>

                <TableBody>
                    {weapons.map((weapon) => (
                        <TableRow key={weapon.serial}>
                            <TableCell>
                                <Image
                                    src={weapon.image}
                                    width={80}
                                    height={80}
                                    className="aspect-square object-contain"
                                    alt={weapon.model}
                                />
                            </TableCell>
                            <TableCell>{weapon.serialNumber}</TableCell>
                            <TableCell>{weapon.model}</TableCell>
                            <TableCell>{weapon.type}</TableCell>
                            <TableCell>
                                {new Date().toLocaleDateString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Card className="px-3 py-3 gap-3 justify-between flex-row items-center">
                <span className="text-sm text-stone-600">
                    0 of {weapons.length} selected
                </span>
                <ReturnModal />
            </Card>
        </div>
    );
}

function ScanModal() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const screenWidth = useScreenWidth();

    return (
        <>
            <Button variant="shadow" color="primary" onPress={onOpen}>
                <BarcodeScanIcon />{" "}
                <span className="text-sm sm:text-base">Issue new weapon</span>
            </Button>

            <Modal
                placement="center"
                size={screenWidth >= 1024 ? "md" : "full"}
                isOpen={isOpen}
                onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <span className="lg:hidden">
                                    Scan Code to Issue new Weapon
                                </span>
                                <span className="hidden lg:inline">
                                    Enter Code to Issue new Weapon
                                </span>
                            </ModalHeader>

                            {screenWidth >= 1024 && (
                                <ModalBody className="gap-5">
                                    <Input
                                        type="text"
                                        variant="faded"
                                        color="primary"
                                        size="md"
                                        description="Enter the code printed on weapon barcode to issue the weapon"
                                        label="Enter code on weapon"
                                        placeholder="WPN0021"
                                    />
                                </ModalBody>
                            )}
                            {screenWidth < 1024 && (
                                <ModalBody className="gap-5"></ModalBody>
                            )}

                            <ModalFooter>
                                <Button
                                    size="sm"
                                    className="p-1"
                                    color="danger"
                                    variant="faded"
                                    onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    size="sm"
                                    color="primary"
                                    onPress={onClose}>
                                    {screenWidth >= 1024 ? "Enter" : "Scan"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

function ReturnModal() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Button color="danger" onPress={onOpen}>
                Return Weapon
            </Button>

            <Modal
                placement="center"
                isOpen={isOpen}
                onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Return Weapon WPN0011</ModalHeader>
                            <ModalBody className="gap-5">
                                <span className="font-bold text-sm">
                                    Return selected weapons to officer
                                </span>
                                <div>
                                    <Select
                                        size="sm"
                                        label="Reason for return"
                                        placeholder="Select a reason">
                                        <SelectItem>Cleaning</SelectItem>
                                        <SelectItem>Repair</SelectItem>
                                        <SelectItem>Other</SelectItem>
                                    </Select>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    size="sm"
                                    className="p-1"
                                    color="danger"
                                    variant="faded"
                                    onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    size="sm"
                                    color="primary"
                                    onPress={onClose}>
                                    Return
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
