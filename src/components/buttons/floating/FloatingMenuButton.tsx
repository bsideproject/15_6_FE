import React, { useContext, createContext } from 'react';

interface childrenProps {
    children?: React.ReactNode;
}
export interface FloatingMenuButtonProps extends childrenProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
}
export interface TriggerProps extends childrenProps {
    className?: string;
}

const FloatingContext = createContext<FloatingMenuButtonProps>({
    isOpen: false,
    setIsOpen: () => null,
});

export const FloatingMenuButton = (props: FloatingMenuButtonProps) => {
    const { children, className, isOpen, setIsOpen } = props;
    return (
        <FloatingContext.Provider value={{ isOpen, setIsOpen }}>
            <div
                className={`${className} ${
                    isOpen ? '' : 'hidden'
                } bg-gray-900/70 w-full h-full fixed left-0 top-0 z-40`}
                onClick={() => setIsOpen(false)}
            />
            <div className="fixed flex flex-col right-[20px] bottom-[76px] z-50">{children}</div>
        </FloatingContext.Provider>
    );
};

const Trigger = (props: TriggerProps) => {
    const { className, children } = props;
    return <div className={`${className} cursor-pointer`}>{children}</div>;
};

const Menu = ({ children }: childrenProps) => {
    const { isOpen } = useContext(FloatingContext);
    return (
        <div
            className={`${
                isOpen ? '' : 'hidden'
            } absolute w-auto bottom-full right-1/2 translate-x-1/2 flex flex-col gap-3`}
        >
            {children}
        </div>
    );
};

FloatingMenuButton.Trigger = Trigger;
FloatingMenuButton.Menu = Menu;

export default FloatingMenuButton;
