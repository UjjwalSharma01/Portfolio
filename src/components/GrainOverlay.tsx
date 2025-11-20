import grainImage from "@/assets/images/grain.jpg";

export const GrainOverlay = () => {
    return (
        <div
            className="fixed inset-0 z-0 pointer-events-none opacity-5 mix-blend-overlay"
            style={{
                backgroundImage: `url(${grainImage.src})`,
            }}
        ></div>
    );
};
