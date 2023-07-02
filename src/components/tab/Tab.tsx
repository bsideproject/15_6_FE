interface TabProps {
    active: number;
    currentIdx: number;
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement> | undefined;
}
export const Tab = (props: TabProps) => {
    const { active, currentIdx, children, onClick } = props;
    const activeClass = () => {
        return active === currentIdx ? 'border-b-2 text-black' : 'body2 text-gray-600';
    };
    return (
        <div className={`w-full h-full flex justify-center items-center title3 ${activeClass()}`} onClick={onClick}>
            {children}
        </div>
    );
};
