"use client";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import Image from "next/image";
import bookImage from "@/assets/images/srimad-bhagavad-gita-cover.webp";
import mapImage from "@/assets/images/map.png";
// import smileMemoji from "@/assets/images/memoji-smile.png";
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItemsRow } from "@/components/ToolboxItemsRow";
import { motion } from "framer-motion";
import { useRef } from "react";
import { hobbies, toolBoxItems } from "../../profile.config";

export const AboutSection = ({ id }: { id: string }) => {
    const constraintRef = useRef(null);

    return (
        <div className="py-20 md:py-14 lg:py-20 lg:mt-3">
            <section className="container" id={id}>
                <SectionHeader
                    heading1="About Me"
                    heading2="Building Solutions That Matter"
                    paragraph="Final-year CS student passionate about creating technology that solves real-world problems and makes a meaningful impact."
                />
                <div className="mt-20 flex flex-col gap-8">
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-5 lg:grid-cols-3">
                        <Card className="h-[370px] md:col-span-2 lg:col-span-1">
                            <CardHeader
                                heading="Key Achievements"
                                description="Top 0.3% in NCAT • 2nd rank in blockchain assessment • Leading 45+ member team"
                                className="md:py-2.5 md:px-4 lg:px-4 lg:py-1.5"
                            />
                            <div className="flex flex-col gap-4 mt-6 px-6">
                                <div className="space-y-1">
                                    <div className="text-white font-bold text-base">🏆 Top 0.3% in NCAT</div>
                                    <div className="text-white/70 text-xs">Ranked 1323/450,000+ candidates</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-white font-bold text-base">🥈 Technical Excellence</div>
                                    <div className="text-white/70 text-xs">2nd rank among 1000+ developers</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-white font-bold text-base">👨‍💼 Team Leadership</div>
                                    <div className="text-white/70 text-xs">Secretary, E-Cell (45+ members)</div>
                                </div>
                            </div>
                        </Card>
                        <Card className="h-[370px] p-0 md:col-span-3 lg:col-span-2">
                            <CardHeader
                                heading="My Technical Journey"
                                description="Full-stack developer with team leadership experience and active open-source contributions."
                                className="p-6 pb-0 lg:-mt-0.5"
                            />
                            <ToolboxItemsRow
                                items={toolBoxItems}
                                className="mt-4 md:mt-6"
                                itemsWrapperClassName="animate-scroll-left [animation-duration:30s]"
                            />
                            <ToolboxItemsRow
                                items={toolBoxItems}
                                className="mt-6"
                                itemsWrapperClassName="animate-scroll-right [animation-duration:15s]"
                            />
                        </Card>
                    </div>
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-5 lg:grid-cols-6">
                        <Card className="h-[370px] p-0 flex flex-col md:col-span-3 lg:col-span-4 lg:-mt-0.5">
                            <CardHeader
                                heading="Beyond the Code"
                                description="CS student (8.7 CGPA) exploring emerging tech and contributing to communities."
                                className="p-6 md:pb-8"
                            />
                            <div className="relative z-0 flex-1 lg:-mt-1" ref={constraintRef}>
                                {hobbies.map((hobby) => (
                                    <motion.div
                                        key={hobby.title}
                                        className="inline-flex items-center gap-1.5 px-6 py-1.5 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full absolute"
                                        style={{
                                            left: hobby.left,
                                            top: hobby.top,
                                            zIndex: hobby.zIndex,
                                        }}
                                        drag
                                        dragConstraints={constraintRef}>
                                        <span className="font-semibold text-gray-950">{hobby.title}</span>
                                        <span>{hobby.emoji}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </Card>
                        <Card className="h-[370px] p-0 relative md:col-span-2 lg:col-span-2">
                            <Image
                                src={mapImage}
                                alt="Map Image"
                                className="h-full w-full object-cover object-left-top"
                                loading="lazy"
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
                                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full animate-ping [animation-duration:2s]"></div>
                                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full"></div>
                                <Image 
                                    src="/images/pic.jpg"
                                    alt="Ujjwal Sharma profile photo"
                                    width={80}
                                    height={80}
                                    className="size-20 object-cover rounded-full"
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
};
