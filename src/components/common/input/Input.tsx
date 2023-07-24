import { useRef, useState } from 'react';
import { ReactComponent as Delete } from '@/assets/img/icn_delete.svg';

export interface InputProps {
    value: string | number | undefined;
    type: 'text' | 'textarea';
    setValue: React.Dispatch<React.SetStateAction<any>>;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
    onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
    textRef?: React.LegacyRef<HTMLInputElement> | undefined;
    name?: string;
    label?: string;
    placeHolder?: string;
    helperText?: string;
    isWarning?: boolean;
    disabled?: boolean;
    icon?: string | React.ReactNode;
    isInputModeNone?: boolean;
    rows?: number;
    maxLength?: number;
    isScroll?: boolean;
}
export const Input = (props: InputProps) => {
    const {
        value,
        setValue,
        onChange,
        label,
        placeHolder,
        helperText,
        isWarning,
        disabled,
        icon,
        onFocus,
        isInputModeNone,
        type,
        textRef,
        rows,
        maxLength,
        name,
        isScroll,
    } = props;
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isWrapperFocus, setIsWrapperFocus] = useState<boolean>(false);

    //TODO size 추가
    const wrapperSizeClass = () => {
        return 'w-full h-auto';
    };
    const sizeClass = () => {
        return type === 'text' ? 'w-full h-[48px]' : 'w-full h-auto';
    };
    const borderColorClass = () => {
        return isWarning ? 'border-negative' : isWrapperFocus ? 'border-gray-900' : 'border-gray-300';
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

    const handleResizeHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(e);
        }
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    };

    const handleDelete = () => {
        setValue('');
        if (type === 'textarea' && textareaRef && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    return (
        <div className={`wrapper inline-flex flex-col ${wrapperSizeClass()}`}>
            {label ? <div className="mb-1 title3 text-gray-600">{label}</div> : null}
            <div
                className={`input-wrapper box-border flex justify-center items-center rounded-lg border px-[16px] py-[12px] ${sizeClass()} ${borderColorClass()} ${disabledClass()}`}
                onFocus={() => setIsWrapperFocus(true)}
                onBlur={() => setIsWrapperFocus(false)}
            >
                {type === 'text' ? (
                    <input
                        ref={textRef}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        disabled={disabled}
                        placeholder={placeHolder}
                        name={name}
                        className="w-full outline-none body1"
                        inputMode={isInputModeNone ? 'none' : 'text'}
                    />
                ) : (
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={isScroll ? onChange : handleResizeHeight}
                        onFocus={onFocus}
                        disabled={disabled}
                        placeholder={placeHolder}
                        name={name}
                        className="w-full outline-none body1 resize-none"
                        rows={rows}
                        maxLength={maxLength}
                        inputMode={isInputModeNone ? 'none' : 'text'}
                    />
                )}
                {value && value.toString().length > 0 && !disabled ? (
                    <div onClick={handleDelete}>
                        <Delete />
                    </div>
                ) : null}
                {Icon(icon)}
            </div>
            {helperText ? <div className={`mt-1 title3 ${isWarning ? 'text-negative' : ''}`}>{helperText}</div> : null}
        </div>
    );
};
