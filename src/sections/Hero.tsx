import Image from "next/image";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import grainImage from "@/assets/images/grain.jpg";
import { contactSectionId, projectsSectionId } from "./constants";
import { Magnetic } from "@/components/Magnetic";
import { motion } from "framer-motion";

export const HeroSection = ({ id }: { id: string }) => {
    return (
        <section className="py-32 md:py-48 lg:py-60 relative z-0 overflow-x-clip" id={id}>
            <div className="absolute inset-0 -z-30 opacity-5" style={{ backgroundImage: `url(${grainImage.src})` }}></div>

            {/* Aurora Background Effect */}
            <div className="absolute inset-0 overflow-hidden -z-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-[pulse_4s_ease-in-out_infinite]"></div>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>
            </div>

            <div className="container relative z-10">
                <div className="flex flex-col justify-center items-center">
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        style={{
                            perspective: 1000,
                        }}
                    >
                        <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl mb-8 group">
                            <Image
                                src="/images/pic.jpg"
                                alt="Ujjwal Sharma profile photo"
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                                priority
                                className="group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-zinc-900 border border-white/10 px-4 py-2 inline-flex items-center gap-3 rounded-full mb-8 shadow-lg backdrop-blur-md hover:border-white/20 transition-colors cursor-default"
                    >
                        <div className="bg-emerald-500 size-2.5 rounded-full relative z-0">
                            <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                        </div>
                        <div className="text-sm font-medium text-zinc-200">Available for new projects</div>
                    </motion.div>
                </div>

                <div className="max-w-3xl mx-auto">
                    <h1 className="font-serif text-5xl md:text-7xl text-center tracking-tight leading-[1.1] bg-gradient-to-b from-white via-white/90 to-white/60 text-transparent bg-clip-text pb-4">
                        Crafting Digital Solutions with Passion
                    </h1>
                    <p className="mt-6 text-center font-light text-white/70 tracking-wide md:text-xl leading-relaxed max-w-2xl mx-auto">
                        I&apos;m Ujjwal Sharma, a CSE&apos;26 undergrad passionate about Web Development, Blockchain, and Problem Solving.
                        Let&apos;s build something amazing together.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12">
                    <a href={"#" + projectsSectionId}>
                        <Magnetic>
                            <button className="inline-flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 px-8 h-14 rounded-full transition-all duration-300 backdrop-blur-sm group hover:border-white/20">
                                <span className="font-semibold text-white group-hover:text-accent transition-colors">Explore My Work</span>
                                <ArrowDown className="size-4 group-hover:translate-y-1 transition-transform" />
                            </button>
                        </Magnetic>
                    </a>
                    <a href={"#" + contactSectionId}>
                        <Magnetic>
                            <button className="relative inline-flex items-center gap-2 px-8 h-14 bg-white text-gray-950 hover:bg-zinc-200 rounded-full transition-all duration-300 overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                <span className="relative z-10">👋</span>
                                <span className="font-bold relative z-10">Let&apos;s Connect</span>
                            </button>
                        </Magnetic>
                    </a>
                </div>
            </div>
        </section>
    );
};
