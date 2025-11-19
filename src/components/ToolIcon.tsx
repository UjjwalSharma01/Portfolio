export const ToolIcon = ({ component }: { component: React.ElementType }) => {
    const Component = component;
    return (
        <div className="">
            <Component className="size-10 fill-[url('#tech-icon-gradient')]" />
            <svg className="size-0 absolute">
                <linearGradient id="tech-icon-gradient">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
            </svg>
        </div>
    );
};
