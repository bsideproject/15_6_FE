import Popup from './Popup';

interface BasePopupProps {
    isOpen: boolean;
    message: React.ReactNode;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onClick?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement> | undefined;
}

export const ConfirmPopup = (props: BasePopupProps) => {
    const { isOpen, setIsOpen, onClick, message } = props;

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOnClick = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        if (onClick) onClick(event);
        handleClose();
    };

    return (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen}>
            <Popup.Body>{message}</Popup.Body>
            <Popup.Footer>
                <button className="w-full bg-primary-light" onClick={handleClose}>
                    취소
                </button>
                <button className="w-full bg-gray-900 text-white" onClick={handleOnClick}>
                    확인
                </button>
            </Popup.Footer>
        </Popup>
    );
};

export const AlertPopup = (props: BasePopupProps) => {
    const { isOpen, setIsOpen, message } = props;

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen}>
            <Popup.Body>{message}</Popup.Body>
            <Popup.Footer>
                <button className="w-full bg-primary" onClick={handleClose}>
                    확인
                </button>
            </Popup.Footer>
        </Popup>
    );
};
