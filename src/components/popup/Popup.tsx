import React, { useRef, useEffect } from 'react';

interface ChildrenProps {
    children: React.ReactNode;
}

export interface PopupProps extends ChildrenProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Popup = (props: PopupProps) => {
    const { children, isOpen, setIsOpen } = props;
    const wrapperRef = useRef<HTMLDivElement>(null);

    // 팝업창 오픈 시 배경화면 스크롤 히든 처리
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [isOpen]);

    // 팝업 바깥 클릭 시 팝업 닫힘
    const handleWrapperClose = (event: React.MouseEvent<HTMLDivElement>) => {
        if (wrapperRef.current === event.target) setIsOpen(false);
    };

    return (
        <div
            ref={wrapperRef}
            onClick={handleWrapperClose}
            className={`wrapper w-full h-screen fixed top-0 left-0 bg-gray-600/50 z-50 ${isOpen ? 'block' : 'hidden'}`}
        >
            <div className="popup fixed w-[288px] min-h-fit h-auto inset-1/2 -translate-y-1/2 -translate-x-1/2 rounded-xl bg-gray-0 z-50 pt-[36px]">
                {children}
            </div>
        </div>
    );
};

const Header = ({ children }: ChildrenProps) => {
    return <div className="popup-header popup-title1 px-[24px] mb-[12px]">{children}</div>;
};

const Body = ({ children }: ChildrenProps) => {
    return (
        <div className={`popup-body flex flex-col jusitfy-center w-full min-h-fit px-[24px] pb-[28px]`}>{children}</div>
    );
};

const Footer = ({ children }: ChildrenProps) => {
    const childElements = React.Children.toArray(children).map((child, index, arr) => {
        if (React.isValidElement<{ className?: string }>(child)) {
            const firstClass = index === 0 ? 'first:rounded-bl-xl' : '';
            const lastClass = index === arr.length - 1 ? 'last:rounded-br-xl' : '';
            return React.cloneElement(child, {
                className: `${child.props.className} ${firstClass} ${lastClass}`,
            });
        }
        return child;
    });

    return <div className="popup-footer w-full min-h-[64px] flex justify-stretch title2">{childElements}</div>;
};

Popup.Header = Header;
Popup.Body = Body;
Popup.Footer = Footer;

export default Popup;
