import { ReactComponent as Eyes } from '@/assets/img/icn_eyes.svg';
import Carousel from '@/components/carousel/Carousel';
import { useState, MouseEventHandler } from 'react';

type BannerItemProps = {
    isOddIndex: boolean;
    info: {
        title: string;
        description: string;
        totalDate: number;
        success: number;
    };
    clickHandler: MouseEventHandler<HTMLDivElement>;
};

export const BannerItem = ({ isOddIndex, info, clickHandler }: BannerItemProps) => {
    return (
        <div
            className={`flex flex-col items-center w-full ${isOddIndex ? 'bg-gray-900' : 'bg-primary'}`}
            onClick={clickHandler}
        >
            <div className={`flex flex-col items-center mt-20  ${isOddIndex ? 'text-gray-0' : 'text-gray-900'}`}>
                <p className="text-2xl font-bold">{info.title}</p>
                <p className="text-base">{info.description}</p>
            </div>
            <div
                className={`rounded border-[1px] border-gray-900 relative px-3 py-1 mt-10 mb-[60px] ${
                    isOddIndex ? 'bg-primary' : 'bg-gray-0'
                }`}
            >
                <p>
                    <span className="font-bold">총 {info.success}일 성공 </span>
                    <span>| 도전 {info.totalDate}일 차</span>
                </p>
                <Eyes className="absolute -top-2 -right-3" />
            </div>
        </div>
    );
};

type MainBannerProps = {
    onChange: (index: number) => void;
    banners: Array<Object>;
};

export const MainBanner = ({ banners, onChange }: MainBannerProps) => {
    const [bulletColor, setBulletColor] = useState('');
    const [activeBulletColor, setActiveBulletColor] = useState('');

    const setPaginationBulletStyle = (index: number) => {
        if (index % 2 === 0) {
            setBulletColor('bg-gray-900/30');
            setActiveBulletColor('bg-gray-900');
        } else {
            setBulletColor('bg-[#FFD12B]/30');
            setActiveBulletColor('bg-[#FFD12B]');
        }
    };

    const onActiveItemChange = (index: number) => {
        setPaginationBulletStyle(index);
        onChange(index);
    };

    const onClickBanner = (index: number) => {
        console.log(banners[index], index);
    };

    const defaultBulletClass = 'mx-1 inline-block w-2 h-2 rounded-full ';

    return (
        <Carousel onActive={onActiveItemChange}>
            <Carousel.ItemContainer>
                {banners.map((info, index) => (
                    <Carousel.Item key={info.id}>
                        <BannerItem
                            info={info}
                            isOddIndex={index % 2 !== 0}
                            clickHandler={() => onClickBanner(index)}
                        />
                    </Carousel.Item>
                ))}
            </Carousel.ItemContainer>
            <Carousel.Pagination
                wrapperClass="w-full inline-flex absolute top-5 justify-center"
                bulletClass={defaultBulletClass + bulletColor}
                activeBulletClass={defaultBulletClass + activeBulletColor}
            />
        </Carousel>
    );
};
