import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import loginBG from "@/public/loginBG.jpg";
import Logo from "../_component/Logo";

export default function Page() {
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
                    <Logo size={16} />
                    <h1 className="w-full font-bold text-4xl text-center">
                        Login
                    </h1>
                </CardHeader>

                <CardBody className="flex gap-6 py-6 overflow-visible">
                    <Input
                        type="email"
                        label="Email"
                        variant="faded"
                        radius="full"
                        defaultValue="hardikgoel@example.com"
                        labelPlacement="outside"
                        placeholder="m@example.com"
                        required
                    />
                    <Input
                        type="password"
                        label="Password"
                        variant="faded"
                        radius="full"
                        defaultValue="test01234"
                        labelPlacement="outside"
                        placeholder="Enter your password"
                        required
                    />
                </CardBody>
                <CardFooter className="flex flex-col space-y-2 overflow-visible">
                    <Button
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
            </Card>
        </div>
    );
}
