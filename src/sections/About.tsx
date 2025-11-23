"use client";
import { Card } from "@/components/Card";
import { CardSpotlight } from "@/components/CardSpotlight";
import { SectionHeader } from "@/components/SectionHeader";
import Image from "next/image";
import { CardHeader } from "@/components/CardHeader";
import { useState, useEffect } from "react";
import { experience, toolBoxItems } from "../../profile.config";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";

export const AboutSection = ({ id }: { id: string }) => {

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
                            <CardSpotlight className="h-auto md:col-span-2 lg:col-span-1 p-8 flex flex-col">
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
                            </CardSpotlight>

                            {/* Technical Journey */}
                            <CardSpotlight className="h-auto p-8 md:col-span-3 lg:col-span-1 flex flex-col" color="rgba(56, 189, 248, 0.15)">
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
                                            whileHover={{ y: -5 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="inline-flex items-center gap-3 px-4 py-3 bg-zinc-800/30 border border-white/5 rounded-xl hover:bg-zinc-800/50 transition-colors group cursor-default"
                                        >
                                            <div className="size-8 relative flex items-center justify-center transition-all duration-300 [&>svg]:w-full [&>svg]:h-full [&>svg]:grayscale group-hover:[&>svg]:grayscale-0">
                                                <item.iconType />
                                            </div>
                                            <span className="font-medium text-zinc-400 group-hover:text-white transition-colors">{item.title}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardSpotlight>
                        </div>

                        <div className="grid gap-8 grid-cols-1 md:grid-cols-5 lg:grid-cols-6">
                            {/* Experience */}
                            <Card className="h-auto p-8 flex flex-col md:col-span-3 lg:col-span-4">
                                <CardHeader
                                    heading="Experience"
                                    description="My professional journey and leadership roles."
                                    className="p-0 mb-8"
                                />
                                <div className="flex flex-col gap-8">
                                    {experience.map((role, index) => (
                                        <motion.div
                                            key={role.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + index * 0.1 }}
                                            className="flex gap-6"
                                        >
                                            {/* Structural Timeline */}
                                            <div className="flex flex-col items-center">
                                                <div className="size-3 rounded-full bg-zinc-700 border border-zinc-500" />
                                                <div className="w-px flex-1 bg-zinc-800 my-2" />
                                            </div>

                                            {/* Content */}
                                            <div className="pb-8 flex-1">
                                                <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-white leading-tight">{role.title}</h3>
                                                        <div className="text-zinc-400 text-sm font-medium mt-1">{role.company}</div>
                                                    </div>
                                                    <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                                                        {role.date}
                                                    </span>
                                                </div>

                                                <p className="text-zinc-400 text-sm leading-relaxed mb-4 max-w-xl">
                                                    {role.description}
                                                </p>

                                                {/* Structural Badges */}
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wider border border-zinc-700 text-zinc-400">
                                                    {role.category}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>

                            {/* Map */}
                            <Card className="h-[320px] md:h-auto p-0 relative md:col-span-2 lg:col-span-2 overflow-hidden min-h-[320px] group">
                                <iframe
                                    src="https://maps.google.com/maps?q=Karol+Bagh,New+Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="h-full w-full grayscale invert-[1] contrast-[1.2] opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                ></iframe>
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
        </div >
    );
};
