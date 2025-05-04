"use client";

// this file is for the breadcrumbs in the sidebar

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Bc() {
    const [currentPath, setCurrentPath] = useState("");

    const pathname = usePathname();
    const path = pathname.split("/");
    const lastSegment = path[path.length - 1]; // Get the last segment of the path

    useEffect(() => {
        if (lastSegment === "whatsapp") {
            setCurrentPath("WhatsApp");
        } else if (lastSegment === "instagram") {
            setCurrentPath("Instagram");
        } else if (lastSegment === "facebook") {
            setCurrentPath("Facebook");
        } else if (lastSegment === "snapchat") {
            setCurrentPath("Snapchat");
        } else if (lastSegment === "home") {
            setCurrentPath("Home");
        }
    }, [pathname, lastSegment]);

    return currentPath;
}