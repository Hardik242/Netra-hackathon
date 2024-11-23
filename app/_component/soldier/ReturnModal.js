"use client";

import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/modal";
import {Button} from "@nextui-org/button";
import {Select, SelectItem} from "@nextui-org/select";

export function ReturnButton({weaponSerial}) {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    return (
        <>
            <Button
                className="bg-red-500 text-white"
                size="sm"
                radius="full"
                onPress={onOpen}>
                Return
            </Button>
            {isOpen && (
                <ReturnModal
                    weaponSerial={weaponSerial}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onClose={onClose}
                />
            )}
        </>
    );
}

function ReturnModal({isOpen, onClose, onOpenChange, weaponSerial}) {
    return (
        <>
            <Modal
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                key={"return"}
                placement="center"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop="blur">
                <ModalContent className="bg-sky-500">
                    {() => (
                        <>
                            <ModalHeader>
                                Return Weapon {weaponSerial}
                            </ModalHeader>
                            <ModalBody className="gap-5">
                                <span className="font-bold text-sm">
                                    Return selected weapons to officer
                                </span>
                                <div>
                                    <Select
                                        size="sm"
                                        className="return-select"
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
