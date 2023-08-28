import { useEffect, useState, createContext, useContext, useRef } from 'react';

type CarouselContextType = {
    length: number;
    activeIndex: number;
    addItem: () => void;
    deleteItem: () => void;
    setActiveIndex: (index: number) => void;
    setHalfActiveIndex: (index: number) => void;
};

const CarouselContext = createContext<CarouselContextType | null>(null);

type CarouselProps = {
    children: JSX.Element | JSX.Element[];
    onActive: (index: number) => void;
    onHalfActive: (index: number) => void;
};

const Carousel = ({ children, onActive, onHalfActive }: CarouselProps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [halfActiveIndex, setHalfActiveIndex] = useState<number>(0);
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

    useEffect(() => {
        onHalfActive(halfActiveIndex);
    }, [halfActiveIndex]);

    const contextValue = {
        length,
        addItem,
        deleteItem,
        activeIndex,
        setActiveIndex,
        setHalfActiveIndex,
    };

    return <CarouselContext.Provider value={contextValue}>{children}</CarouselContext.Provider>;
};

type ItemContainerProps = {
    children: JSX.Element[];
};

const ItemContainer = ({ children }: ItemContainerProps) => {
    return <div className="flex overflow-auto w-full snap-mandatory snap-x hide-scroll">{children}</div>;
};

type ItemProps = {
    children: JSX.Element | JSX.Element[];
    index: number;
};

const Item = ({ children, index }: ItemProps) => {
    const { addItem, deleteItem, setActiveIndex, setHalfActiveIndex } = useContext(
        CarouselContext,
    ) as CarouselContextType;
    const targetRef = useRef(null);

    useEffect(() => {
        const fullActiveOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0, // Fully visible
        };

        const halfActiveOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5, // Fully visible
        };

        const fullObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveIndex(index);
                }
            });
        }, fullActiveOptions);

        const halfObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setHalfActiveIndex(index);
                }
            });
        }, halfActiveOptions);

        if (targetRef.current) {
            fullObserver.observe(targetRef.current);
            halfObserver.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                fullObserver.unobserve(targetRef.current);
                halfObserver.unobserve(targetRef.current);
            }
        };
    }, []);

    useEffect(() => {
        addItem();
        return () => {
            deleteItem();
        };
    }, []);

    return (
        <div className="inline-flex items-center justify-center w-full flex-none snap-center" ref={targetRef}>
            {children}
        </div>
    );
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
