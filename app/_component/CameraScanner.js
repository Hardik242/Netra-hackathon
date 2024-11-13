"use client";

import {CameraIcon, CheckIcon, XMarkIcon} from "@heroicons/react/24/solid";
import Image from "next/image";
import {Suspense, useCallback, useRef, useState} from "react";
import Webcam from "react-webcam";
import Spinner from "./Spinner";

export default function CameraScanner() {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    // create a capture function
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef]);

    const retake = () => {
        setImgSrc(null);
    };

    return (
        <div className="w-full h-full relative">
            {imgSrc ? (
                <Image
                    src={imgSrc}
                    fill
                    className="object-cover"
                    alt="webcam"
                />
            ) : (
                <Suspense fallback={<Spinner />} key={imgSrc}>
                    <Webcam
                        className="h-full w-full object-cover"
                        mirrored={true}
                        ref={webcamRef}
                    />
                </Suspense>
            )}
            <div></div>
            <div className="absolute py-2 flex justify-center bottom-0 left-0 w-full bg-black">
                {imgSrc ? (
                    <div className="w-full flex justify-evenly">
                        <button
                            onClick={retake}
                            className="rounded-full p-1.5 ring-white ring-1 text-white">
                            <XMarkIcon className="size-8" />
                        </button>
                        <button
                            onClick={retake}
                            className="rounded-full p-1.5 ring-white ring-1 text-white">
                            <CheckIcon className="size-8" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={capture}
                        className="rounded-full p-1.5 ring-white ring-1 text-white">
                        <CameraIcon className="size-8" />
                    </button>
                )}
            </div>
        </div>
    );
}
