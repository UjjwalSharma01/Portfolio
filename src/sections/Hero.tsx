import Image from "next/image";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import grainImage from "@/assets/images/grain.jpg";
import { contactSectionId, projectsSectionId } from "./constants";

export const HeroSection = ({ id }: { id: string }) => {
    return (
        <section className="py-32 md:py-48 lg:py-60 relative z-0 overflow-x-clip" id={id}>
            <div className="absolute inset-0 -z-30 opacity-5" style={{ backgroundImage: `url(${grainImage.src})` }}></div>

            {/* Subtle Gradient Glow */}
            <div className="absolute inset-0 overflow-hidden -z-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] animate-pulse-slow"></div>
            </div>

            <div className="container relative z-10">
                <div className="flex flex-col justify-center items-center">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl mb-8">
                        <Image
                            src="/images/pic.jpg"
                            alt="Ujjwal Sharma profile photo"
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                            priority
                        />
                    </div>

                    <div className="bg-white/5 border border-white/10 px-4 py-1.5 inline-flex items-center gap-3 rounded-full mb-6 backdrop-blur-sm">
                        <div className="bg-emerald-500 size-2 rounded-full relative z-0">
                            <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                        </div>
                        <div className="text-sm font-medium text-white/90">Available for new projects</div>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto">
                    <h1 className="font-serif text-4xl md:text-6xl text-center tracking-wide leading-tight">
                        Crafting Digital Solutions with Passion
                    </h1>
                    <p className="mt-6 text-center font-light text-white/60 tracking-wide md:text-lg leading-relaxed">
                        I&apos;m Ujjwal Sharma, a CSE&apos;26 undergrad passionate about Web Development, Blockchain, and Problem Solving.
                        Let&apos;s build something amazing together.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10">
                    <a href={"#" + projectsSectionId}>
                        <button className="inline-flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 px-8 h-12 rounded-full transition-colors duration-200 backdrop-blur-sm">
                            <span className="font-semibold">Explore My Work</span>
                            <ArrowDown className="size-4" />
                        </button>
                    </a>
                    <a href={"#" + contactSectionId}>
                        <button className="inline-flex items-center gap-2 px-8 h-12 bg-white text-gray-950 hover:bg-white/90 rounded-full transition-colors duration-200">
                            <span>👋</span>
                            <span className="font-semibold">Let&apos;s Connect</span>
                        </button>
                    </a>
                </div>
            </div>
        </section>
    );
};
