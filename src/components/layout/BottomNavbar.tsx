export interface BottomNavbarProps {
    children: React.ReactNode;
    height: number;
}
export const BottomNavbar = (props: BottomNavbarProps) => {
    const { children, height } = props;
    return (
        <>
            <div
                className="navbar-wrapper w-full fixed left-0 bottom-0 bg-white px-[20px] border-t-gray border-t"
                style={{ height: height }}
            >
                <div className="navbar h-full flex items-center caption2">{children}</div>
            </div>
            <div style={{ height: height }}></div>
        </>
    );
};
