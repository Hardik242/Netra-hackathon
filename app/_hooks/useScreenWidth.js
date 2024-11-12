"use client";
import {useState, useEffect} from "react";

const useScreenWidth = () => {
    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => setScreenWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    return screenWidth;
};

export default useScreenWidth;
