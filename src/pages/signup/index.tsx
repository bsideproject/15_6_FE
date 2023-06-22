import { useState } from 'react';
import Terms from './components/Terms';

const SignUpPage = () => {
    const titleList = ['낫투두클럽', '이용 약관에', '동의해 주세요'];

    const [isAllAgreed, setIsAllAgreed] = useState<boolean>(false);

    return (
        <div>
            <div className="font-bold text-2xl ml-5 mt-10">
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
                        termsUrl="http://localhost:3001/login"
                    />
                    <Terms.TermsItem
                        title="[필수] 개인정보 수집 및 이용동의"
                        id="개인정보"
                        required
                        termsUrl="http://localhost:3001/login"
                    />
                </Terms>
            </div>
            {isAllAgreed && <button>다음</button>}
        </div>
    );
};

export default SignUpPage;
