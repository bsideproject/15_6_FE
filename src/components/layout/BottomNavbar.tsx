export interface BottomNavbarProps {
    children: React.ReactNode;
    className?: string;
    height: number;
}
export const BottomNavbar = (props: BottomNavbarProps) => {
    const { children, height, className } = props;
    return (
        <>
            <div
                className={`navbar-wrapper w-full fixed left-0 bottom-0 bg-white px-[20px] border-t-gray border-t ${className}`}
                style={{ height: height }}
            >
                <div className="navbar h-full flex items-center caption2">{children}</div>
            </div>
            <div style={{ height: height }}></div>
        </>
    );
};
