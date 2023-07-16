import { useRef } from 'react';

interface childProps {
    children?: React.ReactNode;
}
export interface BottomPopupProps extends childProps {
    title?: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    // isRadio: boolean;
}

export const BottomPopup = (props: BottomPopupProps) => {
    const { title, isOpen, setIsOpen, children } = props;

    const wrapperRef = useRef<HTMLDivElement>(null);
    const handleWrapperClose = (event: React.MouseEvent<HTMLDivElement>) => {
        if (wrapperRef.current === event.target) setIsOpen(false);
    };

    return (
        <>
            <div
                className={`b-popup-wrapper w-full h-full fixed top-0 left-0 bg-gray-600/50 z-40 ${
                    isOpen ? 'block' : 'hidden'
                }`}
                ref={wrapperRef}
                onClick={handleWrapperClose}
            ></div>
            <div
                className={`b-popup title2 fixed transition-all duration-300 bottom-0 flex flex-col w-full z-50 h-auto py-[40px] px-[24px] bg-white rounded-t-xl ${
                    isOpen ? 'translate-y-0' : 'translate-y-full'
                }`}
            >
                {title ? <div className="mb-7">{title}</div> : null}
                {children}
            </div>
        </>
    );
};
