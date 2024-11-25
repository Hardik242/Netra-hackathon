"use client";

import flashlight from "@/public/flashlight.png";
import switchCamera from "@/public/switch-camera.png";
import {Suspense, useEffect, useRef, useState} from "react";
import {useDisclosure} from "@nextui-org/modal";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import NewWeapon from "./NewWeapon";
import Image from "next/image";
import {BarcodeScanIcon} from "./BarcodeScanner";
import useScreenWidth from "@/app/_hooks/useScreenWidth";
import dynamic from "next/dynamic";
import {Spinner} from "@nextui-org/react";

const BarcodeScannerComponent = dynamic(() =>
    import("react-qr-barcode-scanner")
);

const Modal = dynamic(
    () => import("@nextui-org/react").then((nextui) => nextui.Modal),
    {
        loading: () => <Spinner />,
    }
);

const ModalBody = dynamic(
    () => import("@nextui-org/react").then((nextui) => nextui.ModalBody),
    {
        loading: () => <Spinner />,
    }
);

const ModalContent = dynamic(
    () => import("@nextui-org/react").then((nextui) => nextui.ModalContent),
    {
        loading: () => <Spinner />,
    }
);

const ModalFooter = dynamic(
    () => import("@nextui-org/react").then((nextui) => nextui.ModalFooter),
    {
        loading: () => <Spinner />,
    }
);

const ModalHeader = dynamic(
    () => import("@nextui-org/react").then((nextui) => nextui.ModalHeader),
    {
        loading: () => <Spinner />,
    }
);

export function ScanButton() {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    return (
        <>
            <Button variant="shadow" color="primary" onPress={onOpen}>
                <BarcodeScanIcon />{" "}
                <span className="text-sm sm:text-base">Issue new weapon</span>
            </Button>

            {isOpen && (
                <ScanModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onClose={onClose}
                />
            )}
        </>
    );
}

function ScanModal({isOpen, onClose, onOpenChange}) {
    const videoRef = useRef(null);
    const [barCode, setBarCode] = useState(null);
    const [isTorch, setIsTorch] = useState(false);
    const [stopStream, setStopStream] = useState(false);
    const [scanError, setScanError] = useState(null);
    const [facingModes, setFacingModes] = useState("environment");

    const screenWidth = useScreenWidth();

    useEffect(() => {
        if (screenWidth === 0 || screenWidth >= 1024) return;
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
    }, [facingModes, screenWidth]);

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
            <Modal
                isDismissable={false}
                isKeyboardDismissDisabled={true}
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
                onOpenChange={onOpenChange}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.4,
                                ease: "easeInOut",
                            },
                        },
                    },
                }}>
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

                            {screenWidth < 1024 &&
                                screenWidth !== 0 &&
                                !scanError &&
                                !barCode && (
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
