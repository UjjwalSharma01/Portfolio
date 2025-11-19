import StarIcon from "@/assets/icons/star.svg";
import { Fragment } from "react";

const words = [
    "Performant",
    "Accessible",
    "Secure",
    "Interactive",
    "Scalable",
    "User Friendly",
    "Responsive",
    "Maintainable",
    "Search Optimized",
    "Usable",
    "Reliable",
];

export const TapeSection = () => {
    return (
        <div className="py-16 lg:py-24 overflow-x-clip">
            <div className="bg-gradient-to-r from-accent/10 to-violet-500/10 -rotate-3 -mx-1 border-y border-white/5 backdrop-blur-sm">
                <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <div className="flex flex-none gap-4 py-3 pr-4 animate-scroll-left [animation-duration:30s]">
                        {[...new Array(2)].fill(0).map((_, idx) => (
                            <Fragment key={idx}>
                                {words.map((word) => (
                                    <div key={word} className="inline-flex gap-4 items-center">
                                        <span className="text-gray-300 uppercase font-bold text-sm tracking-widest">
                                            {word}
                                        </span>
                                        <StarIcon className="size-6 text-accent/30 -rotate-12" />
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
