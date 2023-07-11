export type BottomButtonProps = {
    children: React.ReactNode;
    variant: 'primary' | 'secondary';
    disabled?: boolean;
    clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const BottomButton = ({ variant, disabled, clickHandler, children }: BottomButtonProps) => {
    const defaultClassName =
        'absolute bottom-0 left-0 mx-2 my-4 w-[calc(100%-16px)] h-14 rounded-md title2 disabled:bg-gray-300 disabled:text-gray-0 ';

    const variantClass = () => {
        return variant === 'primary'
            ? 'bg-primary text-gray-900 active:bg-primary-dark '
            : 'bg-gray-900 text-gray-0 active:bg-gray-600 active:text-gray-0';
    };

    return (
        <div>
            <button onClick={clickHandler} disabled={disabled} className={defaultClassName + variantClass()}>
                {children}
            </button>
            <div className="my-4 w-full h-14"></div>
        </div>
    );
};
