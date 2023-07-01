import { ReactComponent as Delete } from '@/assets/img/icn_delete.svg';

export interface InputProps {
    value: string | number;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    label?: string;
    placeHolder?: string;
    helperText?: string;
    isWarning?: boolean;
    disabled?: boolean;
    icon?: string | React.ReactNode;
}
export const Input = (props: InputProps) => {
    const { value, setValue, onChange, label, placeHolder, helperText, isWarning, disabled, icon } = props;

    //TODO size 추가
    const wrapperSizeClass = () => {
        return 'w-[320px]';
    };
    const sizeClass = () => {
        return 'w-[320px] h-[48px]';
    };
    const borderColorClass = () => {
        return isWarning ? 'border-negative' : 'border-gray-300';
    };
    const disabledClass = () => {
        return disabled ? 'text-gray-500 bg-gray-100' : '';
    };

    const Icon = (icon: string | React.ReactNode) => {
        if (typeof icon === 'string' && icon.length > 0) {
            return <img className="w-[18px] h-[18px] ml-1" src={icon} alt="input-icon" />;
        } else if (typeof icon === 'object') {
            return <div className="w-[18px] h-[18px] ml-1">{icon}</div>;
        } else {
            null;
        }
    };

    return (
        <div className={`wrapper inline-flex flex-col ${wrapperSizeClass()}`}>
            {label ? <div className="mb-1 title3 text-gray-600">{label}</div> : null}
            <div
                className={`input-wrapper flex justify-center items-center rounded-lg border px-[16px] py-[12px] ${sizeClass()} ${borderColorClass()} ${disabledClass()}`}
            >
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={placeHolder}
                    className="w-full h-full outline-none body1"
                />
                {value.toString().length > 0 ? (
                    <div onClick={() => setValue('')}>
                        <Delete />
                    </div>
                ) : null}
                {Icon(icon)}
            </div>
            {helperText ? <div className={`mt-1 title3 ${isWarning ? 'text-negative' : ''}`}>{helperText}</div> : null}
        </div>
    );
};
