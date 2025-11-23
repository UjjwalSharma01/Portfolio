"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ArrowUpIcon = () => (
    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
);

export const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const toggleVisibility = () => {
            // Clear any pending timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Throttle the state update
            timeoutRef.current = setTimeout(() => {
                const scrollY = window.scrollY;

                // Hysteresis: different thresholds for showing and hiding
                // This prevents flickering at the boundary
                if (!isVisible && scrollY > 600) {
                    // Show button when scrolling down past 600px
                    setIsVisible(true);
                } else if (isVisible && scrollY < 400) {
                    // Hide button when scrolling up past 400px
                    setIsVisible(false);
                }
            }, 150); // Slightly longer throttle for smoother behavior
        };

        window.addEventListener("scroll", toggleVisibility, { passive: true });

        // Check initial state
        toggleVisibility();

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isVisible]); // Include isVisible in dependencies for hysteresis

    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 30 }}
                    transition={{
                        duration: 0.4,
                        ease: [0.34, 1.56, 0.64, 1], // Custom spring-like easing
                    }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-3 bg-accent hover:bg-accent/90 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg group"
                    aria-label="Scroll back to top"
                >
                    <ArrowUpIcon />
                    <span className="sr-only">Back to top</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};
