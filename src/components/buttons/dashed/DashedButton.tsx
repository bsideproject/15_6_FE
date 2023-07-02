interface DashedButtonProps {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement> | undefined;
}
export const DashedButton = (props: DashedButtonProps) => {
    const { children, onClick } = props;
    return (
        <div
            className="flex justify-center items-center h-[56px] border border-dashed rounded-xl gap-1 body1 text-gray-600 cursor-pointer"
            onClick={onClick}
        >
            {children}
        </div>
    );
};
