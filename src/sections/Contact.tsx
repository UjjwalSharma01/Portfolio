import { ArrowUpRightIcon } from "@/components/Icons";
import grainImage from "@/assets/images/grain.jpg";
import { Card } from "@/components/Card";
import { SectionReveal } from "@/components/SectionReveal";
import { Magnetic } from "@/components/Magnetic";

const CalendarIcon = () => (
    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export const ContactSection = ({ id }: { id: string }) => {
    return (
        <div className="py-16 pt-12 lg:py-24 lg:pt-20" id={id}>
            <div className="container">
                <SectionReveal width="100%">
                    <Card className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 text-primary-text py-8 px-10 rounded-3xl text-center md:text-left relative overflow-hidden z-0 border border-white/10 backdrop-blur-sm group">
                        <div
                            className="absolute inset-0 opacity-5 -z-10"
                            style={{
                                backgroundImage: `url(${grainImage.src})`,
                            }}></div>

                        {/* Animated Gradient Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center relative z-10">
                            <div className="flex-1">
                                <h2 className="font-serif text-2xl md:text-3xl bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                                    Let&apos;s create something amazing together
                                </h2>
                                <p className="text-sm md:text-base mt-2 text-muted-text max-w-md">
                                    Ready to bring your next project to life? Send me an email or schedule a call to discuss how I can help you achieve your goals.
                                </p>
                                <div className="flex items-center justify-center md:justify-start gap-2 mt-4 text-xs md:text-sm text-white/60">
                                    <div className="flex items-center gap-1.5">
                                        <svg className="size-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                    </div>
                                    <span>Usually responds within 24 hours</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 w-full md:w-auto">
                                <a href="mailto:ujjwalsh2004@gmail.com" className="w-full md:w-auto">
                                    <Magnetic>
                                        <button className="text-white bg-zinc-900 inline-flex items-center justify-center px-6 h-12 rounded-xl gap-2 w-full md:w-auto border border-white/10 hover:bg-zinc-800 transition-all duration-300 relative overflow-hidden group/btn hover:scale-105 hover:shadow-lg hover:shadow-accent/10">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                                            <span className="font-semibold">Contact Me</span>
                                            <ArrowUpRightIcon className="size-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        </button>
                                    </Magnetic>
                                </a>
                                <a href="https://cal.com/ujjwalsharma" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                                    <Magnetic>
                                        <button className="bg-white text-gray-950 inline-flex items-center justify-center px-6 h-12 rounded-xl gap-2 w-full md:w-auto hover:bg-white/90 transition-all duration-300 relative overflow-hidden group/btn hover:scale-105 hover:shadow-lg font-semibold">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent translate-x-[-100%] group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                                            <CalendarIcon />
                                            <span>Schedule a Call</span>
                                        </button>
                                    </Magnetic>
                                </a>
                            </div>
                        </div>
                    </Card>
                </SectionReveal>
            </div>
        </div>
    );
};
