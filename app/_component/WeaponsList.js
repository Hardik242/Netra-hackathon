"use client";

import flashlight from "@/public/flashlight.png";
import switchCamera from "@/public/switch-camera.png";
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
import {Suspense, useEffect, useRef, useState} from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import useScreenWidth from "../_hooks/useScreenWidth";
import {BarcodeScanIcon} from "./BarcodeScanner";
import NewWeapon from "./NewWeapon";
import Spinner from "./Spinner";

export default function WeaponsList({weapons}) {
    const modelMenuItems = [...new Set(weapons.map((weapon) => weapon.model))];
    modelMenuItems.unshift("All");
    const typeMenuItems = [...new Set(weapons.map((weapon) => weapon.type))];
    typeMenuItems.unshift("All");

    return (
        <div className="sm:py-4 sm:px-4 self-center flex flex-col gap-4 text-black sm:border-stone-700 rounded-md w-full max-w-5xl">
            <Card key={crypto.randomUUID()} className="px-3 py-3 gap-4">
                <ScanModal />

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
                <ReturnModal />
            </Card>
        </div>
    );
}

function ScanModal() {
    const videoRef = useRef(null);
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [barCode, setBarCode] = useState(null);
    const [isTorch, setIsTorch] = useState(false);
    const [stopStream, setStopStream] = useState(false);
    const [scanError, setScanError] = useState(null);
    const [facingModes, setFacingModes] = useState("environment");

    const screenWidth = useScreenWidth();

    useEffect(() => {
        (function handleVideoPermission() {
            navigator.mediaDevices
                .getUserMedia({video: true})
                .then((stream) => {
                    stream.getTracks().forEach((track) => track.stop());
                    setScanError(null);
                })
                .catch((err) => {
                    if (err.name === "NotAllowedError") {
                        setScanError(err);
                    }
                });
        })();

        if (videoRef.current) {
            videoRef.current.classList.toggle(
                "flip-horizontal",
                facingModes === "user"
            );
        }
    }, [facingModes]);

    function handleTorch() {
        setIsTorch((s) => !s);
    }

    function handleSwitchCamera() {
        setFacingModes((prev) => (prev === "user" ? "environment" : "user"));
    }

    function onHandleClose() {
        setStopStream(true);
        setBarCode(null);
        setTimeout(() => {}, 100);
        onClose();
    }

    return (
        <>
            <Button variant="shadow" color="primary" onPress={onOpen}>
                <BarcodeScanIcon />{" "}
                <span className="text-sm sm:text-base">Issue new weapon</span>
            </Button>

            <Modal
                key={"issue"}
                placement="center"
                size={
                    screenWidth >= 1024
                        ? "md"
                        : barCode || scanError
                        ? "md"
                        : "full"
                }
                isOpen={isOpen}
                hideCloseButton={true}
                onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader>
                                {!barCode && !scanError && (
                                    <span className="text-base lg:hidden">
                                        Scan Code to Issue new Weapon
                                    </span>
                                )}
                                {!barCode && scanError && (
                                    <span className="text-base lg:hidden">
                                        Some unexpected Error occured
                                    </span>
                                )}
                                {barCode && !scanError && (
                                    <span className="text-base lg:hidden">
                                        Issue new Weapon
                                    </span>
                                )}
                                <span className="hidden lg:inline">
                                    Enter Code to Issue new Weapon
                                </span>
                            </ModalHeader>

                            {screenWidth >= 1024 && (
                                <ModalBody key={1} className="gap-5">
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

                            {screenWidth < 1024 && scanError && !barCode && (
                                <ModalBody key={2}>
                                    <p className="text-red-500">
                                        Error message: {scanError.message}
                                    </p>
                                    <p className="font-bold">
                                        {scanError.name === "NotAllowedError" &&
                                            "Camera access is denied. Please go to your browser settings to reset permissions."}
                                    </p>
                                    <p>Refresh page and try again</p>
                                </ModalBody>
                            )}

                            {screenWidth < 1024 && barCode && !scanError && (
                                <ModalBody key={3}>
                                    {barCode}
                                    <Suspense fallback={<Spinner />}>
                                        <NewWeapon />
                                    </Suspense>
                                </ModalBody>
                            )}

                            {screenWidth < 1024 && !scanError && !barCode && (
                                <ModalBody
                                    key={4}
                                    className="px-0 !py-0 overflow-hidden border-y-1">
                                    <div
                                        className="w-full h-full relative video"
                                        ref={videoRef}>
                                        <BarcodeScannerComponent
                                            torch={isTorch}
                                            facingMode={facingModes}
                                            stopStream={stopStream}
                                            onUpdate={(err, result) => {
                                                if (result) {
                                                    setBarCode(result.text);
                                                    setStopStream(true);
                                                }
                                            }}
                                        />

                                        <div className="animate-scan w-full h-20 absolute top-0"></div>
                                    </div>
                                </ModalBody>
                            )}

                            {screenWidth < 1024 && !barCode && !scanError ? (
                                <ModalFooter className="justify-between items-center">
                                    <Button
                                        size="sm"
                                        className="p-1"
                                        color="danger"
                                        variant="faded"
                                        onPress={onHandleClose}>
                                        Cancel
                                    </Button>
                                    <div className="px-3 flex gap-x-4 items-center ">
                                        <Button
                                            color="primary"
                                            variant="flat"
                                            onClick={handleTorch}
                                            className="p-1 ring-black ring-2 rounded-full">
                                            <Image
                                                src={flashlight}
                                                alt="flashlight"
                                                height={20}
                                                width={20}
                                            />
                                        </Button>
                                        <Button
                                            color="primary"
                                            variant="flat"
                                            onClick={handleSwitchCamera}
                                            className="p-1 ring-black ring-2 rounded-full">
                                            <Image
                                                src={switchCamera}
                                                alt="flashlight"
                                                height={20}
                                                width={20}
                                            />
                                        </Button>
                                    </div>
                                </ModalFooter>
                            ) : (
                                <ModalFooter>
                                    <Button
                                        size="sm"
                                        className="p-1"
                                        color="danger"
                                        variant="faded"
                                        onPress={onHandleClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        size="sm"
                                        color="primary"
                                        onPress={() => {
                                            if (scanError)
                                                window.location.reload();
                                            else onHandleClose();
                                        }}>
                                        {screenWidth >= 1024
                                            ? "Issue"
                                            : scanError
                                            ? "Refresh Page"
                                            : barCode && "Issue"}
                                    </Button>
                                </ModalFooter>
                            )}
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
                key={"return"}
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
                                        <SelectItem key={crypto.randomUUID()}>
                                            Cleaning
                                        </SelectItem>
                                        <SelectItem key={crypto.randomUUID()}>
                                            Repair
                                        </SelectItem>
                                        <SelectItem key={crypto.randomUUID()}>
                                            Other
                                        </SelectItem>
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
