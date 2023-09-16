import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BottomButton } from '@/components/buttons/BottomButton';
import { Input } from '@/components/common/input/Input';
import { DatePicker } from '@/components/datepicker/Datepicker';
import { diffDay, formatDateToString, dateToyyyymmdd } from '@/utils/datepicker';
import { Toast } from '@/components/toast/Toast';
import { createNottodo, editNottodo } from '@/api/nottodo';
import { useRecoilValue } from 'recoil';
import { currentNottodoState, nottodoProps } from '@/recoil/nottodo/atom';

interface editPayload {
    notToDoText: string;
    startDate: string;
    endDate: string;
    goal: string;
    cheerUpMsg1: string;
    cheerUpMsg2: string;
    cheerUpMsg3: string;
}

export default function NotTodoCreatePage() {
    const router = useNavigate();
    const params = useParams();
    const today = new Date();
    const endDateRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState<string>('');
    const [goal, setGoal] = useState<string>('');
    const [startDate, setStartDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    const [endDate, setEndDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    const [inputStartDate, setInputStartDate] = useState<string>('');
    const [inputEndDate, setInputEndDate] = useState<string>('');
    const [message1, setMessage1] = useState<string>('');
    const [message2, setMessage2] = useState<string>('');
    const [message3, setMessage3] = useState<string>('');
    const [isStartOpen, setIsStartOpen] = useState<boolean>(false);
    const [isEndOpen, setIsEndOpen] = useState<boolean>(false);
    const [isEditPage, setIsEditPage] = useState<boolean>(false);
    const [phase, setPhase] = useState<number>(0);
    const currentNottodo = useRecoilValue(currentNottodoState);

    const [titleHelpText, setTitleHelpText] = useState<string>('');
    const [dateHelpText, setDateHelpText] = useState<string>('');
    const [isComplete, setIsComplete] = useState<boolean>(false);

    useEffect(() => {
        if (params && params.id) {
            setIsEditPage(true);
            if (currentNottodo) {
                setIsComplete(currentNottodo.progressState === 'COMPLETE');
                setTitle(currentNottodo.notToDoText);
                setStartDate(new Date(currentNottodo.startDate));
                setEndDate(new Date(currentNottodo.endDate));
                setGoal(currentNottodo.goal ?? '');
                setMessage1(currentNottodo.cheerUpMessageList[0]?.content ?? '');
                setMessage2(currentNottodo.cheerUpMessageList[1]?.content ?? '');
                setMessage3(currentNottodo.cheerUpMessageList[2]?.content ?? '');
            }
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

        const diff = endTime - startTime;
        const dayTime = 1000 * 60 * 60 * 24;
        // 1일 미만인지 검사
        if (diff < dayTime) {
            setDateHelpText('도전일은 1일 이상이 되어야 합니다.');
            return false;
        }
        // 100일 초과 여부 검사
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
            const payload = {
                notToDoText: title,
                startDate: dateToyyyymmdd(startDate, '-'),
                endDate: dateToyyyymmdd(endDate, '-'),
                goal,
                cheerUpMsg1: message1,
                cheerUpMsg2: message2,
                cheerUpMsg3: message3,
            };
            createNottodo(payload).then(() => {
                router('/nottodo');
                Toast(
                    <>
                        <span className="text-center">낫투두 등록 완료!</span>
                        <span>메인 홈에서 성공 여부를 기록해보세요.✍️</span>
                    </>,
                );
            });
        }
    };

    const handleEdit = () => {
        const titleResult = handleTitleValidation();
        const dateReulst = handleDateValidation();
        if (titleResult && dateReulst && params.id) {
            const payload = {
                notToDoText: title,
                startDate: dateToyyyymmdd(startDate, '-'),
                endDate: dateToyyyymmdd(endDate, '-'),
                goal,
                cheerUpMsg1: message1,
                cheerUpMsg2: message2,
                cheerUpMsg3: message3,
            };
            editNottodo(params.id, payload).then(() => {
                router('/nottodo');
                Toast(<span className="text-center">수정이 완료되었습니다.</span>);
            });
        }
    };

    const isEditing = (origin: nottodoProps | null, edit: editPayload) => {
        if (origin) {
            if (origin.notToDoText !== edit.notToDoText) return true;
            if (origin.startDate !== edit.startDate) return true;
            if (origin.endDate !== edit.endDate) return true;
            if (origin.goal !== edit.goal) return true;
            if (origin.cheerUpMessageList[0].content !== edit.cheerUpMsg1) return true;
            if (origin.cheerUpMessageList[1].content !== edit.cheerUpMsg2) return true;
            if (origin.cheerUpMessageList[2].content !== edit.cheerUpMsg3) return true;
            return false;
        } else {
            return false;
        }
    };

    const renderButton = (isEdit: boolean) => {
        if (isEdit) {
            const payload = {
                notToDoText: title,
                startDate: dateToyyyymmdd(startDate, '-'),
                endDate: dateToyyyymmdd(endDate, '-'),
                goal,
                cheerUpMsg1: message1,
                cheerUpMsg2: message2,
                cheerUpMsg3: message3,
            };
            return (
                <BottomButton
                    variant="secondary"
                    disabled={!isEditing(currentNottodo, payload)}
                    clickHandler={handleEdit}
                >
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
                    readOnly={isComplete}
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
                        onFocus={!isComplete ? () => handleFocus('start') : () => null}
                        onChange={() => null}
                        placeHolder="시작일 입력"
                        readOnly={isComplete}
                    />
                    <div className="mx-3 body1 text-gray-500">~</div>
                    <Input
                        textRef={endDateRef}
                        type="text"
                        value={inputEndDate}
                        setValue={setInputEndDate}
                        isWarning={!!dateHelpText}
                        isInputModeNone
                        onFocus={!isComplete ? () => handleFocus('end') : () => null}
                        onChange={() => null}
                        placeHolder="종료일 입력"
                        readOnly={isComplete}
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
                    <DatePicker
                        selected={startDate}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={setStartDate}
                        isModal
                    />
                </div>
                <div className={`w-full bg-white pt-2 mb-24 ${isEndOpen ? 'block' : 'hidden'}`}>
                    <DatePicker
                        selected={endDate}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={setEndDate}
                        isModal
                    />
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
                    readOnly={isComplete}
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
                        readOnly={isComplete}
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
                        readOnly={isComplete}
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
                        readOnly={isComplete}
                    />
                </div>
                <div className="w-full mb-24"></div>
            </div>

            {/* next button */}
            {!isComplete && (
                <div className="fixed bottom-0 left-0 w-full h-[88px] border-t border-t-gray bg-white">
                    {renderButton(isEditPage)}
                </div>
            )}
        </div>
    );
}
