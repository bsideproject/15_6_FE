import { ReactComponent as CheckOff } from '@/assets/img/icn_check_off.svg';
import { ReactComponent as CheckOn } from '@/assets/img/icn_check_on.svg';
import { useEffectAfterMount } from '@/hooks/useEffectAfterMount';
import { createContext, useContext, useEffect, useState } from 'react';

type TermsContextType = {
    terms: Term[];
    addTerm: (term: Term) => void;
    checkTerm: (termId: string, checked: boolean) => void;
    isAllChecked: boolean;
    checkAllTerms: (checked: boolean) => void;
};

const TermsContext = createContext<TermsContextType | null>(null);

type Term = {
    id: string;
    title: string;
    checked: boolean;
    required: boolean;
};

type TermsProps = {
    children: JSX.Element[];
    onAllCheck: (checked: boolean) => void;
};

const Terms = ({ children, onAllCheck }: TermsProps) => {
    const [terms, setTerms] = useState<Term[]>([]);
    const [isAllChecked, setIsAllChecked] = useState(false);

    const addTerm = (term: Term) => {
        setTerms((terms) => [...terms, term]);
    };

    const checkTerm = (termId: string, checked: boolean) => {
        setTerms((terms) =>
            terms.map((term) => {
                if (term.id === termId) {
                    return { ...term, checked };
                }
                return { ...term };
            }),
        );
    };

    const checkAllTerms = (checked: boolean) => {
        terms.forEach((term) => checkTerm(term.id, checked));
    };

    useEffect(() => {
        setIsAllChecked(terms.every((term) => term.checked));
        onAllCheck(terms.every((term) => !term.required || term.checked));
    }, [terms, setIsAllChecked, onAllCheck]);

    const contextValue = { terms, addTerm, checkTerm, checkAllTerms, isAllChecked };

    return (
        <div className="mt-12">
            <TermsContext.Provider value={contextValue}>{children}</TermsContext.Provider>
        </div>
    );
};

type BaseTermItemProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    children: JSX.Element[] | JSX.Element;
};

const BaseTermItem = ({ checked, onChange, children }: BaseTermItemProps) => {
    return (
        <div className="h-11 py-2.5 ml-5">
            <label className="flex">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
                />
                <span className="flex items-center mr-3">{checked ? <CheckOn /> : <CheckOff />}</span>
                {children}
            </label>
        </div>
    );
};

type TermsItemProps = {
    title: string;
    id: string;
    bold?: boolean;
    required?: boolean;
    termsUrl: string;
};

const TermsItem = ({ title, id, required = false }: TermsItemProps) => {
    const { addTerm, checkTerm, terms } = useContext(TermsContext) as TermsContextType;

    const checked = terms.find((term) => term.id === id)?.checked || false;

    useEffectAfterMount(() => {
        addTerm({
            title,
            checked: false,
            required,
            id,
        });
    }, []);

    return (
        <div className="flex justify-between items-center">
            <BaseTermItem checked={checked} onChange={(checked) => checkTerm(id, checked)}>
                <div className="flex justify-between">
                    <span className="text-base leading-6 font-normal text-gray-700">{title}</span>
                </div>
            </BaseTermItem>
            <button className="mr-5 underline">보기</button>
        </div>
    );
};

const TermsAllItem = () => {
    const { isAllChecked, checkAllTerms } = useContext(TermsContext) as TermsContextType;

    return (
        <>
            <BaseTermItem checked={isAllChecked} onChange={checkAllTerms}>
                <span className="text-base leading-6 font-bold">전체 동의</span>
            </BaseTermItem>
        </>
    );
};

const TermsSeparator = () => <div className="w-full h-[1px] bg-gray-300 mb-2.5" />;

Terms.TermsAllItem = TermsAllItem;
Terms.TermsItem = TermsItem;
Terms.TermsSeparator = TermsSeparator;

export default Terms;
