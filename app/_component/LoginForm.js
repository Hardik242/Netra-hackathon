"use client";

import Link from "next/link";
import {useCallback, useState, useTransition} from "react";
import {login} from "../login/actions";
import dynamic from "next/dynamic";
import {toast} from "react-toastify";

const Button = dynamic(() =>
    import("@nextui-org/react").then((nextui) => nextui.Button)
);
const CardBody = dynamic(() =>
    import("@nextui-org/react").then((nextui) => nextui.CardBody)
);

const CardFooter = dynamic(() =>
    import("@nextui-org/react").then((nextui) => nextui.CardFooter)
);
const Input = dynamic(() =>
    import("@nextui-org/react").then((nextui) => nextui.Input)
);

export function LoginForm() {
    const [isPending, startTransition] = useTransition();
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [message, setMessage] = useState(false);

    const validateEmail = useCallback((email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
        return emailRegex.test(email);
    }, []);

    const validatePassword = useCallback((password) => {
        const passwordRegex = /^[a-zA-Z0-9@_#$!*&]{10,16}$/;
        return passwordRegex.test(password);
    }, []);

    async function handleLogin(formData) {
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        if (!validateEmail(data.email)) {
            setEmailError(true);
            return;
        }
        setEmailError(false);

        //   if (!validatePassword(data.password)) {
        //       setPasswordError(true);
        //       return;
        //   }
        //   setPasswordError(false);

        startTransition(() =>
            toast
                .promise(
                    login(formData),
                    {
                        pending: "Logging In...",
                        success: "Logged In Successfully",
                        error: {
                            render({data: err}) {
                                console.log(err.message);
                                if (err.message === "Invalid login credentials")
                                    return "Invalid Login Credentials";
                                else
                                    return "Something went wrong.\n Try again.";
                            },
                        },
                    },
                    {
                        autoClose: 3000,
                    }
                )
                .then(() => {
                    setMessage(false);
                })
                .catch(() => {
                    setMessage(true);
                })
        );
    }

    return (
        <>
            <CardBody className="flex gap-6 py-6 overflow-visible">
                <Input
                    type="email"
                    label="Email"
                    variant="faded"
                    radius="full"
                    name="email"
                    defaultValue="soldier7@example.com"
                    labelPlacement="outside"
                    placeholder="m@example.com"
                    errorMessage="Please enter valid email"
                    isRequired
                    isClearable
                    autoComplete="email"
                    isDisabled={isPending}
                    isInvalid={emailError}
                />
                <Input
                    type="password"
                    label="Password"
                    variant="faded"
                    radius="full"
                    //   defaultValue="test01234"
                    defaultValue="hardikGOEL@242"
                    name="password"
                    labelPlacement="outside"
                    placeholder="Enter your password"
                    errorMessage={
                        <>
                            <p>Incorrect password</p>
                            <div className="p-2 bg-slate-300/30 mt-2 rounded-lg shadow-sm text-red-700">
                                Your password must:
                                <p>
                                    &ensp;&#8226; Be between 10 and 16
                                    characters long.
                                </p>
                                <p>
                                    &ensp;&#8226; Contain at least one lowercase
                                    letter.
                                </p>
                                <p>
                                    &ensp;&#8226; Contain at least one uppercase
                                    letter.
                                </p>
                                <p>
                                    &ensp;&#8226; Contain at least one number.
                                </p>
                                <p>
                                    &ensp;&#8226; Contain at least one special
                                    character from the following: @ _ # $ ! * &
                                    &
                                </p>
                            </div>
                        </>
                    }
                    isRequired
                    isClearable
                    autoComplete="old-password"
                    isDisabled={isPending}
                    isInvalid={passwordError}
                />
                {message && (
                    <div className="bg-white/80 rounded-2xl text-sm text-red-400 px-2 py-3">
                        <span className="mr-2">⚠️</span>
                        Incorrect E-mail or Password. Please verify and try
                        again.
                    </div>
                )}
            </CardBody>
            <CardFooter className="flex flex-col space-y-2 overflow-visible">
                <Button
                    type="submit"
                    formAction={handleLogin}
                    className="w-full bg-black text-white"
                    isDisabled={isPending}
                    radius="full">
                    Login
                </Button>
                <Link
                    href="#"
                    className="text-sm text-center hover:text-sky-600"
                    prefetch={false}>
                    Forgot Password?
                </Link>
            </CardFooter>
        </>
    );
}
