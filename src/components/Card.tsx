import grainImage from "@/assets/images/grain.jpg";
import { ComponentPropsWithoutRef, useRef, useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { motion, useMotionTemplate, useMotionValue, HTMLMotionProps } from "framer-motion";

export const Card = ({ children, className, style, ...other }: HTMLMotionProps<"div"> & { children?: React.ReactNode }) => {
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
                `bg-card-bg rounded-3xl z-0 overflow-hidden relative 
                after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-3xl after:outline-white/10 after:pointer-events-none 
                p-6 group`,
                className
            )}
            style={style}
            onMouseMove={handleMouseMove}
            {...other}>
            <div
                className="absolute inset-0 -z-10 opacity-5"
                style={{
                    backgroundImage: `url(${grainImage.src})`,
                }}></div>

            {/* Spotlight Effect */}
            <motion.div
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(167, 139, 250, 0.15), transparent 80%)`,
                }}
            />

            {children}
        </motion.div>
    );
};
