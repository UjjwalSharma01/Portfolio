export const ToolIcon = ({ component }: { component: React.ElementType }) => {
    const Component = component as any;
    return (
        <div className="">
            <Component />
            <svg className="size-0 absolute" aria-hidden="true">
                <linearGradient id="tech-icon-gradient">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
            </svg>
        </div>
    );
};
