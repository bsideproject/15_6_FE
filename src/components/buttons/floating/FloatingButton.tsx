import { ReactComponent as Plus } from '@/assets/img/icn_plus.svg';
interface FloatingButtonProps {
    onClick: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement> | undefined;
}
export const FloatingButton = (props: FloatingButtonProps) => {
    const { onClick } = props;
    return (
        <div
            className="floating fixed right-[20px] bottom-[76px] w-[52px] h-[52px] flex justify-center items-center rounded-full bg-black"
            onClick={onClick}
        >
            <Plus />
        </div>
    );
};
