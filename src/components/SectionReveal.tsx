import { motion } from "framer-motion";
import { ReactNode } from "react";

export const SectionReveal = ({ children, width = "100%" }: { children: ReactNode; width?: "100%" | "fit-content" }) => {
    return (
        <div style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5, delay: 0.25 }}
                viewport={{ once: true }}
            >
                {children}
            </motion.div>
        </div>
    );
};
