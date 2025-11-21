import { Dispatch, MouseEvent, SetStateAction, useEffect, useCallback, useMemo, useRef } from "react";
import { aboutSectionId, contactSectionId, heroSectionId, projectsSectionId } from "./constants";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

export const Header = ({
    activeSectionId,
    setActiveSectionId,
}: {
    activeSectionId: string;
    setActiveSectionId: Dispatch<SetStateAction<string>>;
}) => {
    const yOffset = -100;

    // Ref to track if a navigation link was recently clicked
    const recentlyClicked = useRef(false);
    const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Memoize the section ids array to avoid recreating it on each render
    const sectionIds = useMemo(() => [heroSectionId, projectsSectionId, aboutSectionId, contactSectionId], []);

    const scrollToSection = useCallback(
        (sectionId: string) => {
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                const y = targetSection.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
                setActiveSectionId(sectionId);

                // Set the recently clicked flag to prevent auto-switching
                recentlyClicked.current = true;

                // Clear any existing timeout
                if (clickTimeoutRef.current) {
                    clearTimeout(clickTimeoutRef.current);
                }

                // Reset the flag after a delay (after scroll animation completes)
                clickTimeoutRef.current = setTimeout(() => {
                    recentlyClicked.current = false;
                }, 1000); // 1 second delay should cover most scroll animations
            }
        },
        [setActiveSectionId, yOffset]
    );

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            scrollToSection(hash);
        }

        // Clean up timeout on unmount
        return () => {
            if (clickTimeoutRef.current) {
                clearTimeout(clickTimeoutRef.current);
            }
        };
    }, [scrollToSection]);

    useEffect(() => {
        const handleScroll = () => {
            // Skip scroll detection if a navigation link was recently clicked
            if (recentlyClicked.current) return;

            // Check if we've reached the bottom of the page (for Contact section)
            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
            if (isAtBottom) {
                const lastSectionId = sectionIds[sectionIds.length - 1];
                if (activeSectionId !== lastSectionId) {
                    setActiveSectionId(lastSectionId);
                    window.history.replaceState(null, "", `#${lastSectionId}`);
                }
                return;
            }

            const scrollPosition = window.scrollY + 150;
            const sections = sectionIds
                .map((id) => {
                    const element = document.getElementById(id);
                    if (!element) return null;

                    // Calculate the section's boundaries
                    const top = element.offsetTop;
                    const height = element.offsetHeight;
                    const bottom = top + height;

                    return { id, element, top, bottom };
                })
                .filter(Boolean) as Array<{ id: string; element: HTMLElement; top: number; bottom: number }>;

            // Find the section that the user is currently viewing
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];

                // Check if the scroll position is within this section
                // For the last section (Contact), be more lenient with the boundary check
                const isLastSection = i === sections.length - 1;
                const inSection = isLastSection
                    ? scrollPosition >= section.top - 50 // More forgiving for the last section
                    : scrollPosition >= section.top && scrollPosition < section.bottom;

                if (inSection) {
                    if (section.id !== activeSectionId) {
                        setActiveSectionId(section.id);
                        // Update URL hash without triggering scroll
                        window.history.replaceState(null, "", `#${section.id}`);
                    }
                    break;
                }
            }
        };

        // Use passive listener for better scroll performance
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Set initial active section

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [activeSectionId, sectionIds, setActiveSectionId]);

    const handleClick = useCallback(
        (event: MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            const targetId = event.currentTarget.getAttribute("href")?.substring(1);
            if (targetId) {
                scrollToSection(targetId);
                window.history.pushState(null, "", `#${targetId}`);
            }
        },
        [scrollToSection]
    );

    return (
        <>
            {/* Centered Navigation */}
            <div className="flex justify-center items-center fixed top-3 w-full z-10">
                <nav className="flex gap-2 p-1 border border-white/15 rounded-full bg-white/10 backdrop-blur-md">
                    {sectionIds.map((sectionId) => {
                        const labels: Record<string, string> = {
                            [heroSectionId]: "Home",
                            [projectsSectionId]: "Projects",
                            [aboutSectionId]: "About",
                            [contactSectionId]: "Contact",
                        };

                        return (
                            <a
                                key={sectionId}
                                href={`#${sectionId}`}
                                className={twMerge(
                                    "px-4 py-1.5 rounded-full text-white/70 text-sm font-semibold hover:text-white transition-colors duration-200 relative"
                                )}
                                onClick={handleClick}>
                                {activeSectionId === sectionId && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30,
                                        }}
                                    />
                                )}
                                <span className={twMerge(activeSectionId === sectionId && "text-white")}>
                                    {labels[sectionId]}
                                </span>
                            </a>
                        );
                    })}

                    {/* Resume button - only visible on mobile, inside navbar */}
                    <a
                        href="https://ggl.link/ujjwalresume"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="md:hidden"
                    >
                        <div className="px-4 py-2 rounded-full text-sm font-bold bg-white text-gray-950 hover:bg-white/90 transition-all duration-200">
                            Resume
                        </div>
                    </a>
                </nav>
            </div>

            {/* Resume Button - Desktop only, fixed right */}
            <div className="hidden md:block fixed top-3 right-6 z-10">
                <a
                    href="https://ggl.link/ujjwalresume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-bold bg-white text-gray-950 hover:bg-white/90 transition-all duration-200"
                >
                    Resume
                </a>
            </div>
        </>
    );
};
