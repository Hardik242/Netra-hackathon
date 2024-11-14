"use client";

import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@nextui-org/react";
import {useState} from "react";
import Logo from "./Logo";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {
    ArrowLeftStartOnRectangleIcon,
    UserIcon,
} from "@heroicons/react/24/solid";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const path = usePathname();

    if (path.split("/")[1] === "login") return null;
    // console.log(path.split("/")[1]);
    let menuItems = [];

    switch (path.split("/")[1]) {
        case "admin":
            menuItems = ["dashboard", "users", "weapons", "records"];
            break;
        case "officer":
            menuItems = ["dashboard", "weapons", "maintenance", "records"];
            break;
        case "soldier":
            menuItems = ["weapons", "records"];
            break;
        case "technician":
            menuItems = ["schedules", "weapon"];
            break;
    }

    return (
        <Navbar
            className="bg-black h-max mb-4 text-white nav"
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}>
            <NavbarMenuToggle
                icon={
                    isMenuOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    )
                }
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="md:hidden"
            />
            <NavbarContent>
                <NavbarBrand className="!justify-center md:!justify-start">
                    <Logo />
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="center" className="hidden md:flex gap-5">
                {menuItems.map((item) => {
                    return (
                        <NavbarItem
                            className="hover:text-sky-400 cursor-pointer items-center flex h-full relative after:absolute after:bottom-0 after:left-1/2 after:bg-white after:w-0 after:h-[5px] hover:after:w-full hover:after:left-0 after:transition-all after:ease-in-out after:duration-300 tracking-wide hover:font-semibold"
                            key={item}>
                            <Link
                                href={`/${path.split("/")[1]}/${item}`}
                                className={`${
                                    path === "/" + item && "active"
                                } flex items-center h-full `}>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </Link>
                        </NavbarItem>
                    );
                })}
            </NavbarContent>

            <Dropdown>
                <DropdownTrigger>
                    <Avatar className="!ml-5 ring-2 ring-offset-2 ring-sky-400 ring-offset-black cursor-pointer hover:scale-105" />
                </DropdownTrigger>

                <DropdownMenu>
                    <DropdownItem key="profile">
                        <p className="font-extrabold">Signed in as</p>
                        <p className="font-extrabold">
                            hardikgoel242@gmail.com
                        </p>
                    </DropdownItem>
                    <DropdownItem>
                        <Link
                            href={`/${path.split("/")[1]}/account`}
                            startContent={<UserIcon className=" size-4" />}>
                            <span>Account</span>
                        </Link>
                    </DropdownItem>
                    <DropdownItem key="logout" className="!p-0">
                        <Button
                            className="w-full h-full !m-0 px-3 py-2"
                            color="danger">
                            <ArrowLeftStartOnRectangleIcon className="size-4" />
                            <span>Logout</span>
                        </Button>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <NavbarMenu className="bg-slate-900 text-white menu">
                {menuItems.map((item) => {
                    return (
                        <NavbarMenuItem
                            key={item}
                            className={`${
                                path === "/" + item.toLowerCase() && "active"
                            } py-2 text-xl tracking-wide font-normal`}>
                            <Link
                                className={``}
                                href={`/${
                                    path.split("/")[1]
                                }/${item.toLowerCase()}`}>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </Link>
                        </NavbarMenuItem>
                    );
                })}
            </NavbarMenu>
        </Navbar>
    );
}
