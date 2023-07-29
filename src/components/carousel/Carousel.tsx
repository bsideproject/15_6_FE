import { useEffect, useState, useRef, createContext, useContext, TouchEvent } from 'react';

type CarouselContextType = {
    length: number;
    activeIndex: number;
    addItem: () => void;
    deleteItem: () => void;
    setActiveIndex: (index: number) => void;
};

const CarouselContext = createContext<CarouselContextType | null>(null);

type CarouselProps = {
    children: JSX.Element | JSX.Element[];
    onActive: (index: number) => void;
};

const Carousel = ({ children, onActive }: CarouselProps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [length, setLength] = useState<number>(0);

    const addItem = () => {
        setLength((length) => length + 1);
    };

    const deleteItem = () => {
        setLength((length) => length - 1);
    };

    useEffect(() => {
        onActive(activeIndex);
    }, [activeIndex]);

    const contextValue = {
        length,
        addItem,
        deleteItem,
        activeIndex,
        setActiveIndex,
    };

    return <CarouselContext.Provider value={contextValue}>{children}</CarouselContext.Provider>;
};

type ItemContainerProps = {
    children: JSX.Element[];
};

const ItemContainer = ({ children }: ItemContainerProps) => {
    const { length, setActiveIndex } = useContext(CarouselContext) as CarouselContextType;
    const [touchStartX, setTouchStartX] = useState<number>(0);
    const [isDragging, setIsDragging] = useState(false);
    const [xOffset, setXOffset] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [maxWidth, setMaxWidth] = useState(0);
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (container.current) {
            setContainerWidth(container.current.clientWidth);
            setMaxWidth(container.current.clientWidth * (length - 1));
        }
    }, [container, length]);

    const touchStartHandler = (e: TouchEvent<HTMLDivElement>) => {
        setIsDragging(true);

        const xStart = e.touches[0].clientX;
        setTouchStartX(xStart);
    };

    const touchMoveHandler = (e: TouchEvent<HTMLDivElement>) => {
        if (!isDragging) return;

        const x = e.touches[0].clientX;
        const deltaX = touchStartX - x;
        const newOffset = xOffset - deltaX;
        if (newOffset > 0) return;
        if (newOffset < -maxWidth) return;

        setXOffset(newOffset);
        setTouchStartX(x);
    };

    const touchEndHandler = () => {
        setIsDragging(false);
        const positiveXOffset = -xOffset;
        const half = containerWidth / 2;
        const newIndex = Math.ceil((positiveXOffset - containerWidth + half) / containerWidth);
        setXOffset(newIndex * -1 * containerWidth);
        setActiveIndex(newIndex);
    };

    return (
        <div className="overflow-hidden" ref={container}>
            <div
                className="whitespace-nowrap"
                style={{
                    transition: 'transform 0.3s',
                    transform: `translateX(${xOffset}px)`,
                }}
                onTouchStart={touchStartHandler}
                onTouchMove={touchMoveHandler}
                onTouchEnd={touchEndHandler}
            >
                {children}
            </div>
        </div>
    );
};

type ItemProps = {
    children: JSX.Element | JSX.Element[];
};

const Item = ({ children }: ItemProps) => {
    const { addItem, deleteItem } = useContext(CarouselContext) as CarouselContextType;
    useEffect(() => {
        addItem();
        return () => {
            deleteItem();
        };
    }, []);

    return <div className="inline-flex items-center justify-center w-full">{children}</div>;
};

type PaginationProps = {
    wrapperClass: string;
    bulletClass: string;
    activeBulletClass: string;
};

const Pagination = ({ wrapperClass, bulletClass, activeBulletClass }: PaginationProps) => {
    const { activeIndex, length } = useContext(CarouselContext) as CarouselContextType;

    const getBulletClass = (index: number) => (index === activeIndex ? activeBulletClass : bulletClass);

    return (
        <div className={wrapperClass}>
            {Array.from({ length }).map((_, index) => {
                return <span key={index} className={getBulletClass(index)}></span>;
            })}
        </div>
    );
};

Carousel.ItemContainer = ItemContainer;
Carousel.Item = Item;
Carousel.Pagination = Pagination;

export default Carousel;
