interface AvatarProps {
    size?: 'md' | 'lg';
    src: string | React.ReactNode;
}

export const Avatar = (props: AvatarProps) => {
    const { size, src } = props;
    const sizeClass = (size: 'md' | 'lg') => {
        if (size === 'lg') return 'w-[100px] h-[100px]';
        else return 'w-[64px] h-[64px]';
    };
    return (
        <div className={`${sizeClass(size ?? 'md')} rounded-full flex items-center justify-center`}>
            {typeof src === 'string' ? (
                <img className="w-full h-full rounded-full" src={src} alt="avatar image" />
            ) : (
                src
            )}
        </div>
    );
};
