import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BottomButton } from '@/components/buttons/BottomButton';
import { Input } from '@/components/common/input/Input';
import { DatePicker } from '@/components/datepicker/Datepicker';
import { diffDay, formatDateToString } from '@/utils/datepicker';
import { Toast } from '@/components/toast/Toast';

export default function NotTodoCreatePage() {
    const router = useNavigate();
    const params = useParams();
    const endDateRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState<string>('');
    const [goal, setGoal] = useState<string>('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [inputStartDate, setInputStartDate] = useState<string>('');
    const [inputEndDate, setInputEndDate] = useState<string>('');
    const [message1, setMessage1] = useState<string>('');
    const [message2, setMessage2] = useState<string>('');
    const [message3, setMessage3] = useState<string>('');
    const [isStartOpen, setIsStartOpen] = useState<boolean>(false);
    const [isEndOpen, setIsEndOpen] = useState<boolean>(false);
    const [isEditPage, setIsEditPage] = useState<boolean>(false);
    const [phase, setPhase] = useState<number>(0);

    const [titleHelpText, setTitleHelpText] = useState<string>('');
    const [dateHelpText, setDateHelpText] = useState<string>('');

    useEffect(() => {
        if (params && params.id) {
            setIsEditPage(true);
        }
    }, []);

    useEffect(() => {
        setInputStartDate(formatDateToString(startDate));
        if (isStartOpen && endDateRef && endDateRef.current) {
            endDateRef.current.focus();
        }
        setIsStartOpen(false);
        if (dateHelpText !== '') {
            setDateHelpText('');
        }
    }, [startDate]);

    useEffect(() => {
        setInputEndDate(formatDateToString(endDate));
        setIsEndOpen(false);
        if (dateHelpText !== '') {
            setDateHelpText('');
        }
    }, [endDate]);

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        if (e.target.value.length < 4) {
            if (e.target.value === '') {
                setTitleHelpText('낫투두를 입력해 주세요');
            } else {
                setTitleHelpText('4자 이상 작성해 주세요');
            }
        } else if (titleHelpText !== '') {
            setTitleHelpText('');
        }
    };

    const handleTitleValidation = () => {
        // 빈값 체크
        if (title === '') {
            setTitleHelpText('낫투두를 입력해 주세요');
            return false;
        }
        // 제목 4글자 이상
        if (title.length < 4) {
            return false;
        }

        return true;
    };
    const handleDateValidation = () => {
        // 빈값 체크
        if (inputStartDate === '' || inputEndDate === '') {
            setDateHelpText('도전 기간을 선택해 주세요');
            return false;
        }

        // 시작일, 종료일 계산
        const startTime = startDate.getTime();
        const endTime = endDate.getTime();
        if (startTime > endTime) {
            setDateHelpText('시작일이 종료일보다 늦을 수 없습니다');
            return false;
        }

        // 100일 초과 여부 검사
        const diff = endTime - startTime;
        const dayTime = 1000 * 60 * 60 * 24;
        if (diff > dayTime * 100) {
            setDateHelpText('100일 이상은 등록하실 수 없습니다');
            return false;
        }

        return true;
    };

    const handleFocus = (type: 'start' | 'end') => {
        if (type === 'start') {
            if (isEndOpen) {
                setIsEndOpen(false);
            }
            setIsStartOpen(true);
        } else {
            if (isStartOpen) {
                setIsStartOpen(false);
            }
            setIsEndOpen(true);
        }
    };

    const handlePhase = () => {
        if (phase === 0) {
            // input 유효성 검사
            const titleResult = handleTitleValidation();
            const dateReulst = handleDateValidation();
            if (titleResult && dateReulst) {
                setPhase(1);
            }
        } else if (phase === 1) {
            // TODO 등록 api 실행
            const payload = {
                title,
                startDate,
                endDate,
                goal,
                message1,
                message2,
                message3,
            };
            console.log('payload', payload);
            // TODO api 성공 후 리스트 페이지로 이동 및 토스트 띄우기
            router('/nottodo');
            Toast(
                <>
                    <span className="text-center">낫투두 등록 완료!</span>
                    <span>메인 홈에서 성공 여부를 기록해보세요.✍️</span>
                </>,
            );
        }
    };

    const handleEdit = () => {
        const titleResult = handleTitleValidation();
        const dateReulst = handleDateValidation();
        if (titleResult && dateReulst) {
            // TODO 수정 api 실행
            const payload = {
                title,
                startDate,
                endDate,
                goal,
                message1,
                message2,
                message3,
            };
            console.log('payload', payload);
            // TODO api 성공 후 리스트 페이지로 이동 및 토스트 띄우기
            router('/nottodo');
            Toast(<span className="text-center">수정이 완료되었습니다.</span>);
        }
    };

    const renderButton = (isEdit: boolean) => {
        if (isEdit) {
            return (
                <BottomButton variant="secondary" clickHandler={handleEdit}>
                    수정 완료
                </BottomButton>
            );
        } else {
            return (
                <BottomButton variant={phase === 0 ? 'secondary' : 'primary'} clickHandler={handlePhase}>
                    {phase === 0 ? '다음' : '완료'}
                </BottomButton>
            );
        }
    };

    return (
        <div className="flex flex-col px-5 mt-10">
            {/* phase1 */}
            <div className={`flex flex-col ${phase === 0 ? 'block' : 'hidden'}`}>
                <div className="flex items-center mb-3">
                    <div className="w-[37px] h-[21px] flex justify-center items-center bg-primary rounded-xl caption1">
                        필수
                    </div>
                    <div className="title1 ml-2">무엇을 절제할 건가요?</div>
                </div>
                <Input
                    type="text"
                    value={title}
                    setValue={setTitle}
                    isWarning={!!titleHelpText}
                    helperText={titleHelpText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitle(e)}
                    placeHolder="ex. 저녁 먹은 후 야식 참기"
                />
                <div className="h-[60px] w-full" />
                <div className="flex items-center mb-3">
                    <div className="w-[37px] h-[21px] flex justify-center items-center bg-primary rounded-xl caption1">
                        필수
                    </div>
                    <div className="title1 ml-2">언제까지 도전하시나요?</div>
                    <div className="title2 text-accent ml-auto">총 {diffDay(startDate, endDate)}일</div>
                </div>
                <div className="w-full flex items-center">
                    <Input
                        type="text"
                        value={inputStartDate}
                        setValue={setInputStartDate}
                        isWarning={!!dateHelpText}
                        isInputModeNone
                        onFocus={() => handleFocus('start')}
                        onChange={() => null}
                        placeHolder="시작일 입력"
                    />
                    <div className="mx-3 body1 text-gray-500">~</div>
                    <Input
                        textRef={endDateRef}
                        type="text"
                        value={inputEndDate}
                        setValue={setInputEndDate}
                        isWarning={!!dateHelpText}
                        isInputModeNone
                        onFocus={() => handleFocus('end')}
                        onChange={() => null}
                        placeHolder="종료일 입력"
                    />
                </div>
                {dateHelpText ? <div className="mt-1 title3 text-negative">{dateHelpText}</div> : null}
                <div
                    className={`body2 text-gray-500 flex flex-col mt-2 mb-24 ${
                        isStartOpen || isEndOpen ? 'hidden' : 'block'
                    }`}
                >
                    <span>도전 기간은 짧을 때 성공 확률이 높아요!</span>
                    <span>권장 기간은 30일 이에요!</span>
                </div>
                <div className={`w-full bg-white pt-2 mb-24 ${isStartOpen ? 'block' : 'hidden'}`}>
                    <DatePicker selected={startDate} startDate={startDate} endDate={endDate} onChange={setStartDate} />
                </div>
                <div className={`w-full bg-white pt-2 mb-24 ${isEndOpen ? 'block' : 'hidden'}`}>
                    <DatePicker selected={endDate} startDate={startDate} endDate={endDate} onChange={setEndDate} />
                </div>
            </div>

            {/* phase2 */}
            <div className={`w-full flex flex-col ${phase === 1 || isEditPage ? 'block' : 'hidden'}`}>
                <div className="w-full title1 mb-3">달성하려는 목표는 무엇인가요?</div>
                <Input
                    type="text"
                    value={goal}
                    setValue={setGoal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeHolder="ex. 3kg 감량하기"
                />
                <div className="body2 text-gray-600 mt-2">목표가 명확할수록 성공 확률이 높아져요!</div>
                <div className="h-[60px] w-full" />
                <div className="w-full title1">나를 위한 응원메시지를 남겨볼까요?</div>
                <div className="title1 mb-5">
                    메시지는 랜덤으로 노출됩니다. <span className="body2 text-gray-600">(최대 3개)</span>
                </div>
                <div className="flex flex-col gap-5">
                    <Input
                        type="textarea"
                        value={message1}
                        setValue={setMessage1}
                        label="응원메시지 1"
                        onChange={(e) => setMessage1(e.target.value)}
                        placeHolder="절제할 나를 응원할 메시지를 입력해주세요."
                        rows={1}
                        maxLength={100}
                    />
                    <Input
                        type="textarea"
                        value={message2}
                        setValue={setMessage2}
                        label="응원메시지 2"
                        onChange={(e) => setMessage2(e.target.value)}
                        placeHolder="절제할 나를 응원할 메시지를 입력해주세요."
                        rows={1}
                        maxLength={100}
                    />
                    <Input
                        type="textarea"
                        value={message3}
                        setValue={setMessage3}
                        label="응원메시지 3"
                        onChange={(e) => setMessage3(e.target.value)}
                        placeHolder="절제할 나를 응원할 메시지를 입력해주세요."
                        rows={1}
                        maxLength={100}
                    />
                </div>
                <div className="w-full mb-24"></div>
            </div>

            {/* next button */}
            <div className="fixed bottom-0 left-0 w-full h-[88px] border-t border-t-gray bg-white">
                {renderButton(isEditPage)}
            </div>
        </div>
    );
}
