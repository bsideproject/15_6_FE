import { putAgreement } from '@/api/login';
import { BottomButton } from '@/components/buttons/BottomButton';
import { useUserInfo } from '@/hooks/useUserInfo';
import { userAgreedState } from '@/recoil/user/atom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Terms from './components/Terms';

const AgreementPage = () => {
    const titleList = ['낫투두클럽', '이용 약관에', '동의해 주세요'];
    const [isAllAgreed, setIsAllAgreed] = useState<boolean>(false);
    const userAgreed = useRecoilValue(userAgreedState);
    const navigate = useNavigate();
    const { updateUserInfo } = useUserInfo();

    const onClickNext = () => {
        putAgreement().then(() => {
            updateUserInfo('isAgreed', true);
        });
    };

    useEffect(() => {
        if (userAgreed) {
            navigate('/');
        }
    }, [userAgreed]);

    return (
        <div>
            <div className="font-bold text-2xl ml-5 pt-10">
                {titleList.map((title) => (
                    <p key={title}>{title}</p>
                ))}
            </div>
            <div>
                <Terms onAllCheck={setIsAllAgreed}>
                    <Terms.TermsAllItem />
                    <Terms.TermsSeparator />
                    <Terms.TermsItem
                        title="[필수] 이용약관 동의"
                        id="이용약관"
                        required
                        notionId="065c9c927654445ab25ea78db26341fb"
                    />
                    <Terms.TermsItem
                        title="[필수] 개인정보 수집 및 이용동의"
                        id="개인정보"
                        required
                        notionId="7634fbcfbc324c3fafc8b243e7e70078"
                    />
                </Terms>
            </div>
            {isAllAgreed && (
                <BottomButton variant="secondary" clickHandler={onClickNext}>
                    다음
                </BottomButton>
            )}
        </div>
    );
};

export default AgreementPage;
