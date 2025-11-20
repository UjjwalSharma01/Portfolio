"use client";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import Image from "next/image";
import mapImage from "@/assets/images/map.png";
// import smileMemoji from "@/assets/images/memoji-smile.png";
import { CardHeader } from "@/components/CardHeader";
import { useRef, useState, useEffect } from "react";
import { hobbies, toolBoxItems } from "../../profile.config";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";

export const AboutSection = ({ id }: { id: string }) => {
    const constraintRef = useRef(null);
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="py-20 md:py-28 lg:py-32">
            <section className="container" id={id}>
                <SectionHeader
                    heading1="About Me"
                    heading2="Building Solutions That Matter"
                    paragraph="Final-year CS student passionate about creating technology that solves real-world problems and makes a meaningful impact."
                />
                <SectionReveal width="100%">
                    <div className="mt-20 flex flex-col gap-8">
                        <div className="grid gap-8 grid-cols-1 md:grid-cols-5 lg:grid-cols-2">
                            {/* Key Achievements */}
                            <Card className="h-auto md:col-span-2 lg:col-span-1 p-8 flex flex-col">
                                <CardHeader
                                    heading="Key Achievements"
                                    description="Recognized for technical excellence and leadership."
                                    className="p-0 mb-8"
                                />
                                <div className="flex flex-col gap-4 flex-1 justify-center">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="p-4 bg-zinc-800/30 rounded-xl border border-white/5 hover:bg-zinc-800/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-2xl">🏆</span>
                                            <div className="font-bold text-white text-lg">
                                                <span className="bg-gradient-to-r from-accent to-violet-400 bg-clip-text text-transparent">Top 0.3%</span> in NCAT
                                            </div>
                                        </div>
                                        <div className="text-zinc-400 text-sm pl-10">Ranked 1323/450,000+ candidates</div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="p-4 bg-zinc-800/30 rounded-xl border border-white/5 hover:bg-zinc-800/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-2xl">🥈</span>
                                            <div className="font-bold text-white text-lg">
                                                <span className="bg-gradient-to-r from-accent to-violet-400 bg-clip-text text-transparent">Technical Excellence</span>
                                            </div>
                                        </div>
                                        <div className="text-zinc-400 text-sm pl-10">2nd rank among 1000+ developers</div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="p-4 bg-zinc-800/30 rounded-xl border border-white/5 hover:bg-zinc-800/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-2xl">👨‍💼</span>
                                            <div className="font-bold text-white text-lg">
                                                <span className="bg-gradient-to-r from-accent to-violet-400 bg-clip-text text-transparent">Team Leadership</span>
                                            </div>
                                        </div>
                                        <div className="text-zinc-400 text-sm pl-10">Secretary, E-Cell (45+ members)</div>
                                    </motion.div>
                                </div>
                            </Card>

                            {/* Technical Journey */}
                            <Card className="h-auto p-8 md:col-span-3 lg:col-span-1 flex flex-col" color="rgba(56, 189, 248, 0.15)">
                                <CardHeader
                                    heading="My Technical Journey"
                                    description="Full-stack developer with team leadership experience and active open-source contributions."
                                    className="p-0 mb-8"
                                />
                                <div className="flex flex-wrap gap-3">
                                    {toolBoxItems.map((item, index) => (
                                        <motion.div
                                            key={item.title}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="inline-flex items-center gap-3 px-4 py-3 bg-zinc-800/30 border border-white/5 rounded-xl hover:bg-zinc-800/50 transition-colors group"
                                        >
                                            <div className="size-8 relative grayscale group-hover:grayscale-0 transition-all duration-300">
                                                <item.iconType className="w-full h-full" />
                                            </div>
                                            <span className="font-medium text-zinc-400 group-hover:text-white transition-colors">{item.title}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        <div className="grid gap-8 grid-cols-1 md:grid-cols-5 lg:grid-cols-6">
                            {/* Beyond the Code */}
                            <Card className="h-auto p-8 flex flex-col md:col-span-3 lg:col-span-4">
                                <CardHeader
                                    heading="Beyond the Code"
                                    description="CS student (8.7 CGPA) exploring emerging tech and contributing to communities."
                                    className="p-0 mb-8"
                                />
                                <div className="flex flex-wrap gap-3 content-start h-[200px] relative" ref={constraintRef}>
                                    {hobbies.map((hobby, index) => (
                                        <motion.div
                                            key={hobby.title}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800/30 border border-white/5 rounded-full hover:bg-zinc-800/60 hover:border-white/10 transition-all duration-300 cursor-grab active:cursor-grabbing absolute"
                                            style={{
                                                left: hobby.left,
                                                top: hobby.top,
                                            }}
                                            drag
                                            dragConstraints={constraintRef}
                                            dragElastic={0.1}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 + index * 0.1 }}
                                        >
                                            <span className="text-xl">{hobby.emoji}</span>
                                            <span className="font-medium text-zinc-300">{hobby.title}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>

                            {/* Map */}
                            <Card className="h-[320px] md:h-auto p-0 relative md:col-span-2 lg:col-span-2 overflow-hidden min-h-[320px]">
                                <Image
                                    src={mapImage}
                                    alt="Map Image"
                                    className="h-full w-full object-cover object-left-top grayscale hover:grayscale-0 transition-all duration-700"
                                    loading="lazy"
                                />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-accent to-violet-400 rounded-full animate-ping [animation-duration:3s] opacity-20"></div>
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-accent to-violet-400 rounded-full"></div>
                                    <Image
                                        src="/images/pic.jpg"
                                        alt="Ujjwal Sharma profile photo"
                                        width={80}
                                        height={80}
                                        className="size-20 object-cover rounded-full border-2 border-white/10"
                                    />
                                </div>
                                <div className="absolute bottom-6 left-6 bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                                    <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-xs font-medium text-white">New Delhi • {time}</span>
                                </div>
                            </Card>
                        </div>
                    </div>
                </SectionReveal>
            </section>
        </div>
    );
};
