type sizeType = 'sm' | 'md' | 'lg';
export interface TextToggleButtonProps {
    size: sizeType;
    isToggle: boolean;
    onClick: React.MouseEventHandler<HTMLDivElement>;
    activeMsg: string;
    inactiveMsg: string;
}

export const TextToggleButton = (props: TextToggleButtonProps) => {
    const { size, isToggle, onClick, activeMsg, inactiveMsg } = props;

    const sizeClass = (size: sizeType) => {
        // if (size === 'sm') return 'w-[46px] h-[26px]';
        if (size === 'md') return 'min-w-[69px] h-[32px]';
        // if (size === 'lg') return 'w-[66px] h-[36px]';
    };

    const ballSizeClass = (size: sizeType) => {
        // if (size === 'sm') return 'w-[22px] h-[22px]';
        if (size === 'md') return 'w-[24px] h-[24px]';
        // if (size === 'lg') return 'w-[32px] h-[32px]';
    };

    const moveBallWidth = (size: sizeType) => {
        // if (size === 'sm') return 'left-[calc(100%-0.125rem-24px)]';
        if (size === 'md') return 'left-[calc(100%-0.25rem-24px)]';
        // if (size === 'lg') return 'left-[calc(100%-0.125rem-24px)]';
    };

    return (
        <div
            className={`wrapper rounded-full px-1 inline-flex gap-0.5 items-center relative bg-gray-300 ${sizeClass(
                size,
            )}`}
            onClick={onClick}
        >
            <div
                className={`ball transition-all flex bg-white rounded-full absolute top-1/2 -translate-y-1/2 ${
                    isToggle ? moveBallWidth(size) : 'left-1'
                } ${ballSizeClass(size)}`}
            ></div>
            <span className={`${isToggle ? '' : 'opacity-0'} title3 pl-1 text-white`}>{activeMsg}</span>
            <span className={`${isToggle ? 'opacity-0' : ''} title3 pr-1 text-white`}>{inactiveMsg}</span>
        </div>
    );
};

TextToggleButton.defaultProps = {
    size: 'md' as sizeType,
};
