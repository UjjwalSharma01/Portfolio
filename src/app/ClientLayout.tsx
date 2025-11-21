"use client";

import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    const handleLoadingFinished = () => {
        setIsLoading(false);
        setTimeout(() => setShowContent(true), 100); // Small delay for smooth transition
    };

    return (
        <>
            {isLoading && <LoadingScreen onFinished={handleLoadingFinished} />}
            <div
                className={`transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"
                    }`}
            >
                {children}
            </div>
        </>
    );
}
