import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Input } from '@/components/common/input/Input';
import { Toast } from '@/components/toast/Toast';

export default function ContactPage() {
    const router = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);
    const description =
        '낫투두클럽 이용 중 오류 제보, 서비스 문의 사항과 더 나은 서비스 경혐을 위한 아이디어 제안을 보내주세요. 보내주신 의견은 운영 개선에 큰 도움이 됩니다.';
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [answerEmail, setAnswerEmail] = useState<string>('');
    const [isTitleWarning, setIsTitleWarning] = useState<boolean>(false);
    const [isMessageWarning, setIsMessageWarning] = useState<boolean>(false);
    const [isEmailWarning, setIsEmailWarning] = useState<boolean>(false);
    const [emailHelperText, setEmailHelperText] = useState<string>('');

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.target.value);
        if (e.target.value.length === 0) {
            setIsTitleWarning(true);
        } else {
            setIsTitleWarning(false);
        }
    };
    const handleMessage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        if (e.target.value.length === 0) {
            setIsMessageWarning(true);
        } else {
            setIsMessageWarning(false);
        }
    };
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const result = emailRegex.test(value);
        setAnswerEmail(value);
        if (result) {
            setIsEmailWarning(false);
            setEmailHelperText('');
        } else {
            setIsEmailWarning(true);
            setEmailHelperText('잘못된 형식의 이메일입니다. 다시 한 번 확인해 주세요.');
        }
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title.length === 0) setIsTitleWarning(true);
        if (message.length === 0) setIsMessageWarning(true);
        if (answerEmail.length === 0) {
            setIsEmailWarning(true);
            setEmailHelperText('잘못된 형식의 이메일입니다. 다시 한 번 확인해 주세요.');
        }

        // TODO send email api
        sendEmail();
    };

    const sendEmail = () => {
        if (formRef.current) {
            const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;
            emailjs.sendForm(serviceId, templateId, formRef.current, publicKey).then(
                () => {
                    router(-1);
                    Toast('✅ 제출이 완료되었습니다. 소중한 의견 감사합니다.');
                },
                (error) => {
                    console.log(error.text);
                },
            );
        }
    };

    return (
        <form ref={formRef} className="w-full px-5 flex flex-col" onSubmit={handleSubmit}>
            <div className="h-[40px]"></div>
            <span className="w-full text-gray-600 body2">{description}</span>
            <div className="h-[40px]"></div>
            <Input
                type="text"
                value={title}
                setValue={setTitle}
                onChange={handleTitle}
                isWarning={isTitleWarning}
                helperText={isTitleWarning ? '제목을 입력해주세요.' : ''}
                placeHolder="제목"
                name="title"
            />
            <div className="h-2"></div>
            <Input
                type="textarea"
                value={message}
                setValue={setMessage}
                onChange={handleMessage}
                isWarning={isMessageWarning}
                helperText={isMessageWarning ? '내용을 입력해주세요.' : ''}
                placeHolder="문의하고 싶거나 건의하고 싶은 내용을 입력해주세요. (최대 3000자)"
                rows={6}
                maxLength={3000}
                name="message"
            />
            <div className="h-[40px]"></div>
            <Input
                type="text"
                value={answerEmail}
                setValue={setAnswerEmail}
                onChange={handleEmail}
                isWarning={isEmailWarning}
                helperText={emailHelperText}
                label="답변 받을 이메일 주소"
                name="user"
            />
            <div className="h-[40px]"></div>
            <input
                type="submit"
                className="w-full h-[48px] flex justify-center items-center bg-primary title2 rounded-lg"
                value={'제출하기'}
            />
            <div className="h-2"></div>
        </form>
    );
}
