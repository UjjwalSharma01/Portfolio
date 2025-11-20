import grainImage from "@/assets/images/grain.jpg";
import { ComponentPropsWithoutRef, useRef, useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { motion, useMotionTemplate, useMotionValue, HTMLMotionProps } from "framer-motion";

export const Card = ({ children, className, style, color, ...other }: HTMLMotionProps<"div"> & { children?: React.ReactNode; color?: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    return (
        <motion.div
            className={twMerge(
                `bg-zinc-900/50 backdrop-blur-sm rounded-3xl z-0 overflow-hidden relative 
                border border-white/5
                p-8 group`,
                className
            )}
            style={style}
            onMouseMove={handleMouseMove}
            {...other}>
            <div
                className="absolute inset-0 -z-10 opacity-[0.03]"
                style={{
                    backgroundImage: `url(${grainImage.src})`,
                }}></div>

            {/* Spotlight Effect - Background */}
            <motion.div
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, ${color || 'rgba(167, 139, 250, 0.08)'}, transparent 80%)`,
                }}
            />

            {/* Spotlight Effect - Border */}
            <motion.div
                className="absolute inset-0 rounded-3xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    maskImage: useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                    WebkitMaskImage: useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                }}
            />

            {/* Top Gradient Border Highlight (Static) */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {children}
        </motion.div>
    );
};
