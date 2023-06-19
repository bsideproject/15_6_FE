interface ButtonProps {
    children: React.ReactNode;
    handleClick: () => void;
    styleObj: {
        backgroundColor: string;
        color: string;
        border?: string;
    };
}

const BaseLoginButton = ({ handleClick, styleObj, children }: ButtonProps) => {
    return (
        <button
            className="h-12 mx-5 w-[calc(100%-40px)] flex items-center justify-center text-base font-bold rounded-lg mb-2 last:mb-0"
            style={styleObj}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

export default BaseLoginButton;
