import { ArrowUpRightIcon } from "@/components/Icons";
import { Magnetic } from "@/components/Magnetic";

const footerLinks = [
    {
        title: "LinkedIn",
        href: "https://linkedin.com/in/ujjwalsharma01",
    },
    {
        title: "GitHub",
        href: "https://github.com/UjjwalSharma01",
    },
    {
        title: "Twitter",
        href: "https://twitter.com/ujjwalsharma01",
    },
    {
        title: "Instagram",
        href: "https://instagram.com/ujjwalsharma01",
    },
];

export const Footer = () => {
    return (
        <footer className="relative overflow-x-clip">
            <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-accent/10 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10 pointer-events-none"></div>
            <div className="container">
                <div className="border-t border-white/15 py-6 text-sm flex flex-col-reverse md:flex-row md:justify-between items-center gap-6">
                    <div className="text-white/40">&copy; {new Date().getFullYear()} Ujjwal Sharma. All rights reserved.</div>
                    <nav className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                        {footerLinks.map((link) => (
                            <a
                                href={link.href}
                                key={link.title}
                                target="_blank"
                                className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors duration-200 font-medium">
                                <Magnetic>
                                    <span className="font-semibold inline-flex items-center gap-1.5">
                                        {link.title}
                                        <ArrowUpRightIcon className="size-4" />
                                    </span>
                                </Magnetic>
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
};
