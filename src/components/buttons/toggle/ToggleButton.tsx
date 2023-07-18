type sizeType = 'sm' | 'md' | 'lg';
export interface ToggleButtonProps {
    size: sizeType;
    isToggle: boolean;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const ToggleButton = (props: ToggleButtonProps) => {
    const { size, isToggle, onClick } = props;

    const sizeClass = (size: sizeType) => {
        if (size === 'sm') return 'w-[46px] h-[26px]';
        if (size === 'md') return 'w-[56px] h-[31px]';
        if (size === 'lg') return 'w-[66px] h-[36px]';
    };

    const ballSizeClass = (size: sizeType) => {
        if (size === 'sm') return 'w-[22px] h-[22px]';
        if (size === 'md') return 'w-[27px] h-[27px]';
        if (size === 'lg') return 'w-[32px] h-[32px]';
    };

    return (
        <div
            className={`wrapper rounded-full px-0.5 inline-flex items-center ${
                isToggle ? 'bg-primary' : 'bg-gray-300'
            } ${sizeClass(size)}`}
            onClick={onClick}
        >
            <div
                className={`ball flex bg-white rounded-full transition-all ${
                    isToggle ? 'translate-x-[calc(100%-0.125rem)]' : ''
                } ${ballSizeClass(size)}`}
            ></div>
        </div>
    );
};

ToggleButton.defaultProps = {
    size: 'md' as sizeType,
};
