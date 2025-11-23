"use client";
import grainImage from "@/assets/images/grain.jpg";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export const CardSpotlight = ({
    children,
    className = "",
    color = "rgb(167, 139, 250)", // Default accent color
}: PropsWithChildren<{ className?: string; color?: string }>) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={twMerge(
                "group relative border border-white/5 bg-zinc-900/50 backdrop-blur-sm overflow-hidden rounded-3xl",
                className
            )}
            onMouseMove={handleMouseMove}
        >
            <div
                className="absolute inset-0 -z-10 opacity-[0.03]"
                style={{
                    backgroundImage: `url(${grainImage.src})`,
                }}></div>
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${color}15,
              transparent 80%
            )
          `,
                }}
            />
            {children}
        </div>
    );
};
