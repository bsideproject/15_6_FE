import { ReactComponent as Logo } from '@/assets/img/icn_logo_medium.svg';
interface HeaderChildProps {
    children: React.ReactNode;
}

export interface HeaderProps extends HeaderChildProps {
    height: number;
    title?: string;
    isTitleImg?: boolean;
}

export const Header = (props: HeaderProps) => {
    const { children, title, height, isTitleImg } = props;
    return (
        <>
            <div
                className={`header-wrapper relative top-0 left-0 w-full px-[20px] bg-white flex justify-between`}
                style={{ height: height }}
            >
                <div className="absolute w-1/2 top-1/2 left-1/2 flex justify-center items-center -translate-x-1/2 -translate-y-1/2 truncate title1">
                    {isTitleImg ? <Logo className="w-[94px] h-[38px] px-1" /> : null}
                    <span className="px-1">{title}</span>
                </div>
                {children}
            </div>
        </>
    );
};

const Leading = (props: HeaderChildProps) => {
    const { children } = props;
    return <div className="leading flex items-center">{children}</div>;
};

const Actions = (props: HeaderChildProps) => {
    const { children } = props;
    return <div className="actions flex items-center gap-2">{children}</div>;
};

Header.Leading = Leading;
Header.Actions = Actions;
