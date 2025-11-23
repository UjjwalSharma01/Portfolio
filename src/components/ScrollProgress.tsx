"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollPx = document.documentElement.scrollTop;
            const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollPx / winHeightPx) * 100;
            setScrollProgress(scrolled);
        };

        window.addEventListener("scroll", updateScrollProgress, { passive: true });
        updateScrollProgress();

        return () => window.removeEventListener("scroll", updateScrollProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-900/30 z-[60] overflow-hidden">
            <motion.div
                className="h-full relative"
                style={{ scaleX: scrollProgress / 100 }}
                initial={{ scaleX: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 30 }}
                aria-hidden="true"
            >
                {/* Base metallic gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-violet-400 to-accent" />

                {/* Chrome/metallic shine effect - top highlight */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent h-1/2" />

                {/* Bottom shadow for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 top-1/2" />

                {/* Animated shimmer sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_3s_infinite]" />

                {/* Outer glow */}
                <div className="absolute inset-0 shadow-[0_0_10px_rgba(167,139,250,0.6)]" />
            </motion.div>
        </div>
    );
};

