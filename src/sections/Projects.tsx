"use client";
import Image from "next/image";
import CheckIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { portfolioProjects } from "../../profile.config";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

interface ProjectCardProps {
    project: typeof portfolioProjects[0];
    index: number;
    totalProjects: number;
    scrollYProgress: MotionValue<number>;
}

const ProjectCard = ({ project, index, totalProjects, scrollYProgress }: ProjectCardProps) => {
    const targetScale = 1 - (totalProjects - index) * 0.05;
    const scale = useTransform(scrollYProgress, [index * 0.25, 1], [1, targetScale]);

    return (
        <motion.div
            style={{
                scale,
                top: `calc(64px + ${index * 40}px)`,
            }}
        >
            <Card
                className={twMerge(
                    "px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:px-20 lg:pt-16 sticky top-16 md:top-20",
                    index > 0 && "bg-zinc-900 backdrop-blur-none"
                )}>
                <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                    <div className="lg:pb-8">
                        <div className="inline-flex gap-2 uppercase font-bold text-accent tracking-widest md:tracking-normal text-sm md:text-base">
                            <span>{project.company}</span>
                            <span>&bull;</span>
                            <span>{project.year}</span>
                        </div>
                        <h3 className="font-serif text-2xl md:text-4xl lg:max-w-sm mt-2 md:mt-5 text-primary-text">
                            {project.title}
                        </h3>
                        <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                        <ul className="mt-4 md:mt-5 flex flex-col gap-4">
                            {project.results.map((result) => (
                                <li
                                    key={result.title}
                                    className="inline-flex gap-2 text-muted-text font-light text-sm md:text-base">
                                    <CheckIcon className="size-5 md:size-6 text-accent/50" />
                                    <span>{result.title}</span>
                                </li>
                            ))}
                        </ul>
                        <a href={project.link} target="_blank">
                            <button className="bg-white text-gray-950 h-12 rounded-xl w-full md:w-auto md:px-6 my-8 font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/90 transition-colors duration-200">
                                <span>{project.linkText}</span>
                                <ArrowUpRightIcon className="size-4" />
                            </button>
                        </a>
                    </div>
                    <div className="relative">
                        <Image
                            src={project.image}
                            alt={project.title}
                            className="-mb-4 md:-mb-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none border-2 border-white/5 rounded-t-xl shadow-lg"
                        />
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export const ProjectsSection = ({ id }: { id: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section className="pb-16 lg:py-24" id={id}>
            <div className="container" ref={containerRef}>
                <SectionHeader
                    heading1="Real-world Results"
                    heading2="Featured Projects"
                    paragraph="See how I transformed concepts into engaging digital experiences."
                />
                <div className="flex flex-col mt-10 md:mt-20 gap-20">
                    {portfolioProjects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={index}
                            totalProjects={portfolioProjects.length}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
                <div className="flex justify-center mt-12">
                    <a
                        href="https://github.com/UjjwalSharma01"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full md:w-auto">
                        <button
                            className="bg-white text-gray-950 font-bold rounded-xl px-8 py-3 shadow-lg hover:bg-white/90 transition-colors duration-200 text-lg md:text-xl"
                            style={{ minWidth: 200 }}>
                            View All Projects
                        </button>
                    </a>
                </div>
            </div>
        </section>
    );
};
