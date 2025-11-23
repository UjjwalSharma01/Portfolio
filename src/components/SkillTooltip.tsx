"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface SkillTooltipProps {
    children: ReactNode;
    title: string;
    isVisible: boolean;
}

export const SkillTooltip = ({ children, title, isVisible }: SkillTooltipProps) => {
    return (
        <div className="relative inline-block">
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-800 border border-white/10 rounded-lg shadow-xl z-50 pointer-events-none whitespace-nowrap"
                    >
                        {/* Tooltip Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                            <div className="border-4 border-transparent border-t-zinc-800" />
                        </div>

                        {/* Tooltip Content */}
                        <div className="text-xs font-medium text-white mb-2">{title}</div>

                        {/* Animated Progress Bar */}
                        <div className="w-32 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "85%" }}
                                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-accent to-violet-400 rounded-full"
                            />
                        </div>

                        {/* Skill Level Label */}
                        <div className="text-[10px] text-zinc-400 mt-1.5 text-center font-medium">
                            Proficient
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
