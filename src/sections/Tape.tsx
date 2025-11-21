import StarIcon from "@/assets/icons/star.svg";
import { Fragment } from "react";

const words = [
    "Scalable",
    "Secure",
    "Reliable",
    "Performant",
    "Maintainable",
    "Accessible",
    "Responsive",
    "Interactive",
    "Fault Tolerant",
    "Type Safe",
    "Robust",
];

export const TapeSection = () => {
    return (
        <div className="py-12 lg:py-24 overflow-x-clip">
            <div className="bg-gradient-to-r from-accent/10 to-violet-500/10 -rotate-3 -mx-20 border-y border-white/5 backdrop-blur-sm">
                <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <div className="flex flex-none gap-4 py-3 pr-4 animate-scroll-left [animation-duration:30s] hover:[animation-play-state:paused] select-none">
                        {[...new Array(4)].fill(0).map((_, idx) => (
                            <Fragment key={idx}>
                                {words.map((word) => (
                                    <div key={`${word}-${idx}`} className="inline-flex gap-4 items-center">
                                        <span className="text-gray-100 uppercase font-bold text-sm md:text-base tracking-widest cursor-default hover:text-accent transition-colors duration-300">
                                            {word}
                                        </span>
                                        <StarIcon className="size-6 text-accent/50 -rotate-12" aria-hidden="true" />
                                    </div>
                                ))}
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
