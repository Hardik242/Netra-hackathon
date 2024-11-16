import loginBG from "@/public/loginBG.jpg";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import Image from "next/image";
import Link from "next/link";
import Logo from "../_component/Logo";
import {login} from "./actions";

export default async function Page() {
    return (
        <div className="flex w-full min-h-full justify-center items-center">
            <Image
                src={loginBG}
                fill
                className="object-cover object-top"
                quality={90}
                alt="bg image"
            />
            <Card className="min-w-72 flex-1 max-w-md my-5 overflow-visible">
                <CardHeader className="py-5 flex justify-center flex-col gap-4 ">
                    <Logo isSize />
                    <h1 className="w-full font-bold text-4xl text-center">
                        Login
                    </h1>
                </CardHeader>
                <form>
                    <CardBody className="flex gap-6 py-6 overflow-visible">
                        <Input
                            type="email"
                            label="Email"
                            variant="faded"
                            radius="full"
                            name="email"
                            defaultValue="soldier1@example.com"
                            labelPlacement="outside"
                            placeholder="m@example.com"
                            errorMessage="Please enter valid email"
                            isRequired
                            isClearable
                        />
                        <Input
                            type="password"
                            label="Password"
                            variant="faded"
                            radius="full"
                            defaultValue="test01234"
                            name="password"
                            labelPlacement="outside"
                            placeholder="Enter your password"
                            errorMessage="Incorrect password"
                            isRequired
                            isClearable
                        />
                    </CardBody>
                    <CardFooter className="flex flex-col space-y-2 overflow-visible">
                        <Button
                            type="submit"
                            formAction={login}
                            className="w-full bg-black text-white"
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
                </form>
            </Card>
        </div>
    );
}
