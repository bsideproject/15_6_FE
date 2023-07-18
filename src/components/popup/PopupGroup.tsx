import Popup from './Popup';

export interface BasePopupProps {
    isOpen: boolean;
    message: React.ReactNode;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onClick?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement> | undefined;
    confrimString?: string;
}

export interface TitlePopupProps extends BasePopupProps {
    title: string;
}

export const ConfirmPopup = (props: BasePopupProps) => {
    const { isOpen, setIsOpen, onClick, message, confrimString } = props;

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
                <button className="w-full body1 text-gray-500" onClick={handleClose}>
                    취소
                </button>
                <button className="w-full title2 text-negative" onClick={handleOnClick}>
                    {confrimString ?? '확인'}
                </button>
            </Popup.Footer>
        </Popup>
    );
};

export const AlertPopup = (props: BasePopupProps) => {
    const { isOpen, setIsOpen, message, confrimString } = props;

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen}>
            <Popup.Body>{message}</Popup.Body>
            <Popup.Footer>
                <button className="w-full title2 text-negative" onClick={handleClose}>
                    {confrimString ?? '확인'}
                </button>
            </Popup.Footer>
        </Popup>
    );
};

export const DeleteTitlePopup = (props: TitlePopupProps) => {
    const { isOpen, setIsOpen, message, title, onClick, confrimString } = props;

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOnClick = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        if (onClick) onClick(event);
        handleClose();
    };

    return (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen}>
            <Popup.Header>{title}</Popup.Header>
            <Popup.Body>{message}</Popup.Body>
            <Popup.Footer>
                <button className="w-full body1 text-gray-500" onClick={handleClose}>
                    취소
                </button>
                <button className="w-full title2 text-negative" onClick={handleOnClick}>
                    {confrimString ?? '삭제하기'}
                </button>
            </Popup.Footer>
        </Popup>
    );
};
