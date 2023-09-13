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
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface ILogin {
    isOpen: boolean;
    onOpenChange: () => void;
}

interface ILoginFormProps {
    email: string;
    password: string;
}

interface IForgotPasswordFormProps {
    email: string;
}

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please provide a valid email.")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(32, "Password must be at most 32 characters"),
});

const forgotPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please provide a valid email.")
        .required("Email is required"),
});

export default function Login({ isOpen, onOpenChange }: ILogin) {
    const [page, setPage] = useState<"login" | "forgot-password">("login");

    const handleChangePage = (pageData: "login" | "forgot-password") => {
        setPage(pageData);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
            {page === "login" ? (
                <LoginForm changePage={handleChangePage} />
            ) : (
                <ForgotPasswordForm changePage={handleChangePage} />
            )}
        </Modal>
    );
}

interface ILoginForm {
    changePage: (page: "login" | "forgot-password") => void;
}

const LoginForm = ({ changePage }: ILoginForm) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const {
        register,
        handleSubmit,
        // reset,
        formState: { errors },
    } = useForm<ILoginFormProps>({
        resolver: yupResolver(loginSchema),
    });

    const handleSubmitLogin = (data: ILoginFormProps) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitLogin)}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                        <ModalBody>
                            <Input
                                {...register("email")}
                                autoFocus
                                isClearable
                                label="Email"
                                placeholder="Enter your email"
                                variant="bordered"
                                validationState={errors.email?.message ? "invalid" : "valid"}
                                errorMessage={errors.email?.message}
                            />
                            <Input
                                {...register("password")}
                                endContent={
                                    <button
                                        className="focus:outline-none"
                                        type="button"
                                        onClick={toggleVisibility}
                                    >
                                        {isVisible ? (
                                            <HiEyeOff className="text-xl text-default-500 pointer-events-none" />
                                        ) : (
                                            <HiEye className="text-xl text-default-500 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                label="Password"
                                placeholder="Enter your password"
                                type={isVisible ? "text" : "password"}
                                variant="bordered"
                                validationState={errors.password?.message ? "invalid" : "valid"}
                                errorMessage={errors.password?.message}
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
                                    <Button
                                        color="primary"
                                        variant="light"
                                        size="sm"
                                        onClick={() => changePage("forgot-password")}
                                    >
                                        Forgot password?
                                    </Button>
                                </Tooltip>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" type="submit">
                                Sign in
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </form>
    );
};

const ForgotPasswordForm = ({ changePage }: ILoginForm) => {
    const {
        register,
        handleSubmit,
        // reset,
        formState: { errors },
    } = useForm<IForgotPasswordFormProps>({
        resolver: yupResolver(forgotPasswordSchema),
    });

    const handleSubmitRequestForgotPassword = (
        data: IForgotPasswordFormProps
    ) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitRequestForgotPassword)}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Recover account
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                {...register}
                                autoFocus
                                isClearable
                                label="Email"
                                placeholder="Enter your email"
                                variant="bordered"
                                validationState={errors.email?.message ? "invalid" : "valid"}
                                errorMessage={errors.email?.message}
                                description="Password reset link will be sent via mail"
                            />
                            <div className="flex px-1 justify-between">
                                <Tooltip content="Go back login">
                                    <Button
                                        color="primary"
                                        variant="light"
                                        size="sm"
                                        onClick={() => changePage("login")}
                                    >
                                        go back login
                                    </Button>
                                </Tooltip>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" type="submit">
                                Request
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </form>
    );
};
