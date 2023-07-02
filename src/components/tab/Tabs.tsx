interface TabsProps {
    children: React.ReactNode;
}
export const Tabs = (props: TabsProps) => {
    const { children } = props;
    return <div className="w-full h-[52px] flex bg-white px-[20px]">{children}</div>;
};
