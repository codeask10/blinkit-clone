import React from 'react';
import Card from './Card';
import { useRouter } from 'next/navigation';

const CardItems = ({ data, title, collection }) => {
    const router = useRouter();
    const { product } = collection;
    const handleAllClickButton = () => {
        const category = data.category;
        router.push(`/products?category=${category}`);
    }
    return (
        <>
            <div className="flex justify-between mt-5">
                <h1 className='text-2xl font-base'>{title}</h1>
                <button onClick={() => { handleAllClickButton() }}>See All</button>
            </div>
            <div className="grid gap-2 grid-flow-col md:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] sm:grid-cols-2 xs:grid-cols-3 overflow-x-auto h-96
    max-w-full scrollbar-hidden">
                {
                    product.map((item) => (
                        <Card key={item.id} item={item} />
                    ))
                }
            </div>
        </>
    )
}

export default CardItems;