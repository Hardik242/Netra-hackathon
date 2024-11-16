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

export function ReturnButton() {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    return (
        <>
            <Button color="danger" onPress={onOpen}>
                Return Weapon
            </Button>
            {isOpen && (
                <ReturnModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onClose={onClose}
                />
            )}
        </>
    );
}

function ReturnModal({isOpen, onClose, onOpenChange}) {
    return (
        <>
            <Modal
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                key={"return"}
                placement="center"
                isOpen={isOpen}
                onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
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
