const BadgeCount = ({ count }: { count: number }) => {
    return <div className="absolute bottom-0 right-0 bg-gray-900 text-primary px-2 py-0.5 rounded-full">×{count}</div>;
};

export default BadgeCount;
