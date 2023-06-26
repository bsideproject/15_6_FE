import { useEffect } from 'react';
import { BottomButton } from '../buttons/BottomButton';

export type BottomModalProps = {
    show: boolean;
    children: React.ReactNode;
    onClose: () => void;
};

export const BottomModal = ({ show, children, onClose }: BottomModalProps) => {
    useEffect(() => {
        console.log(show);
    }, [show]);

    if (show) {
        return (
            <div className="fixed top-0 bottom-0 right-0 left-0 z-10 bg-gray-600/50">
                <div className="absolute bottom-0 h-4/5 w-full bg-gray-0 rounded-t-[20px] flex flex-col">
                    <div className="mt-2 flex justify-center">
                        <span className="w-20 h-1.5 bg-gray-300 rounded-[14px]"></span>
                    </div>
                    <div className="mt-7 mx-5 overflow-scroll h-100">{children}</div>
                    <BottomButton variant="secondary" clickHandler={onClose}>
                        확인
                    </BottomButton>
                </div>
            </div>
        );
    } else {
        return null;
    }
};
