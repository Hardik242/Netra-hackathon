import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {formatDateTime} from "@/app/_services/helpers";

const ReturnButton = dynamic(() =>
    import("./ReturnModal").then((imp) => imp.ReturnButton)
);

export default function WeaponCardSoldier({weapon}) {
    const {id, serialNumber, type, model, image: imageSrc, created_at} = weapon;
    const {shortDate, shortTime} = formatDateTime(created_at);

    return (
        <>
            <Card className="md:hidden" shadow="lg">
                <CardHeader className="h-44 relative w-full">
                    <Image
                        src={imageSrc}
                        fill
                        sizes="33vw"
                        className="object-cover"
                        alt="Weapon image"
                    />
                </CardHeader>
                <CardBody className="border-t-1">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="uppercase text-lg font-bold text-sky-700">
                                {model}
                            </h1>
                            <p className="text-black text-sm">{serialNumber}</p>
                        </div>
                        <div>
                            <ReturnButton weaponSerial={serialNumber} />
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="grid grid-cols-3">
                    <div>
                        <p className="text-sky-700 text-xs text-center">Type</p>
                        <p className="text-sm text-center">{type}</p>
                    </div>
                    <div>
                        <p className="text-sky-700 text-xs text-center">Date</p>
                        <p className="text-sm text-center">{shortDate}</p>
                    </div>
                    <div>
                        <p className="text-sky-700 text-xs text-center">Time</p>
                        <p className="text-sm text-center">{shortTime}</p>
                    </div>
                </CardFooter>
            </Card>

            <Card className="hidden md:flex">
                <CardBody className="grid grid-cols-2 gap-2">
                    <div className="relative rounded-xl ring-1 ring-black/50 overflow-hidden">
                        <Image
                            src={imageSrc}
                            fill
                            sizes="33vw"
                            className="object-cover"
                            alt="Weapon image"
                        />
                    </div>

                    <div className="pl-1">
                        <div>
                            <h1 className="uppercase text-lg font-bold text-sky-700">
                                {model}
                            </h1>
                            <p className="text-black text-sm">{serialNumber}</p>
                        </div>

                        <div>
                            <div>
                                <p className="text-sky-700 text-xs text-right">
                                    Type
                                </p>
                                <p className="text-sm text-right">{type}</p>
                            </div>

                            <div>
                                <p className="text-sky-700 text-xs text-right">
                                    Date
                                </p>
                                <p className="text-sm text-right">
                                    {shortDate}
                                </p>
                            </div>

                            <div>
                                <p className="text-sky-700 text-xs text-right">
                                    Time
                                </p>
                                <p className="text-sm text-right">
                                    {shortTime}
                                </p>
                            </div>
                        </div>

                        <div className="flex mt-2 w-full justify-end">
                            <ReturnButton weaponSerial={serialNumber} />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}
