import React from 'react';
import Card from './Card';
import { useRouter } from 'next/navigation';

const CardItems = ({ data, title, collection }) => {
    const router = useRouter();
    const { product } = collection;
    const handleAllClickButton = () => {

        const queryParams = [];
        if (data.category) {
            queryParams.push(`category=${data.category}`);
        }
        if (data.tag) {
            queryParams.push(`tag=${data.tag}`);
        }
        if (data.layoutType) {
            queryParams.push(`layoutType=${data.layoutType}`);
        }
        if (data.loadMoreType) {
            queryParams.push(`loadMoreType=${data.loadMoreType}`);
        }

        const queryString = queryParams.join('&');
        router.push(`/products?${queryString}`);
    }
    const isScrollerLayout = data.layoutType === "SCROLLER" && data.loadMoreType === "SEEALL";

    return (
        <>
            <div className="flex justify-between mt-5">
                <h1 className='text-2xl font-base'>{title}</h1>
                {isScrollerLayout && (
                    <button onClick={handleAllClickButton}>See All</button>
                )}
            </div>
            <div className={`grid gap-6 ${isScrollerLayout ? "grid-flow-col overflow-x-auto h-96 max-w-full scrollbar-hidden" : "md:grid-cols-[repeat(auto-fill,_minmax(190px,_1fr))] sm:grid-cols-2 xs:grid-cols-3"
                }`}>
                {
                    product?.map((item) => (
                        <Card key={item.id} item={item} />
                    ))
                }
            </div>
        </>
    )
}

export default CardItems;