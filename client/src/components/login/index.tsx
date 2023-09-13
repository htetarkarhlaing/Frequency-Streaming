import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Checkbox,
    Input,
    Tooltip,
} from "@nextui-org/react";
import { useState } from "react";
import { HiMail, HiLockClosed } from "react-icons/hi";

interface ILogin {
    isOpen: boolean;
    onOpenChange: () => void;
}

export default function Login({ isOpen, onOpenChange }: ILogin) {

    const [page, setPage] = useState<"login" | "forgot-password">("login")

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{page === "login" ? "Log in" : "Recover account"}</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                endContent={
                                    <HiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Email"
                                placeholder="Enter your email"
                                variant="bordered"
                            />
                            <Input
                                endContent={
                                    <HiLockClosed className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                variant="bordered"
                            />
                            <div className="flex py-2 px-1 justify-between">
                                <Checkbox
                                    classNames={{
                                        label: "text-small",
                                    }}
                                >
                                    Remember me
                                </Checkbox>
                                <Tooltip content="Recover your account">
                                    <Button color="primary" variant="light" size="sm" onClick={() => setPage("forgot-password")}>
                                        Forgot password?
                                    </Button>
                                </Tooltip>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Sign in
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
