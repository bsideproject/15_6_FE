import { ToggleButton } from '@/components/buttons/toggle/ToggleButton';
import { ScrollablePicker } from '@/components/scrollable-picker/ScrollablePicker';
import { useState } from 'react';

export default function AlarmPage() {
    // TODO 유저가 알람 설정해놨으면 그걸로 세팅
    const [isAlarm, setIsAlarm] = useState<boolean>(false);
    const [isTime, setIsTime] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<string>('오전 1시 0분');
    const [prevTime, setPrevTime] = useState<string>('오전 1시 0분');

    const handleAlarm = () => {
        setIsAlarm(!isAlarm);
        // TODO 알림 설정 관련 api
        // TODO 사용자가 설정한 시간 가져오기
        setCurrentTime(currentTime);
    };

    const handleTime = () => {
        setIsTime(!isTime);
    };

    const handleClose = () => {
        setIsTime(false);
    };

    const handleSaveTime = () => {
        // TODO save time api
        // 성공적으로 저장되면 close
        setIsTime(false);
        setPrevTime(currentTime);
    };

    return (
        <div className="w-full px-5">
            <div className="w-full flex justify-between items-center mt-5">
                <span className="title2 text-gray-900">서비스 알림</span>
                <ToggleButton isToggle={isAlarm} onClick={handleAlarm} />
            </div>
            <div className="h-3"></div>
            <span className="body2 text-gray-600">서비스 이용에 필요한 안내 사항을 Push 알림으로 보내드립니다.</span>
            <div className="h-5"></div>
            {isAlarm ? (
                <>
                    <div className="w-full h-[1px] bg-gray-50"></div>
                    <div className="h-5"></div>
                    <div className="w-full flex justify-between items-cetner">
                        <span className="title2 text-gray-900">알림 시간</span>
                        <div
                            className={`flex item-center ${isTime ? 'text-accent' : 'text-gray-900'}`}
                            onClick={handleTime}
                        >
                            {prevTime}
                        </div>
                    </div>
                    <div className={`w-full mt-5 ${isTime ? 'block' : 'hidden'}`}>
                        <ScrollablePicker time={currentTime} setTime={setCurrentTime} />
                    </div>
                    <div className="h-5"></div>
                    <div className={`w-full flex gap-2 ${isTime ? 'block' : 'hidden'}`}>
                        <div
                            className="flex justify-center items-center w-full h-12 bg-gray-50 text-gray-900 rounded-lg pointer"
                            onClick={handleClose}
                        >
                            취소
                        </div>
                        <div
                            className="flex justify-center items-center w-full h-12 bg-gray-900 text-white rounded-lg pointer"
                            onClick={handleSaveTime}
                        >
                            저장
                        </div>
                    </div>
                    <div className="h-5"></div>
                    <span className="body2 text-gray-600">‘설정’에서 낫투두클럽 앱의 알람 받기를 켜주세요.</span>
                </>
            ) : null}
        </div>
    );
}
