import Image from 'next/image'
import { useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
// import  Currency  from 'react-currency-formatter'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../redux/StateProvider'


const MAX_RATING = 5
const MIN_RATING = 1

function Product({
    id, title, price, description, category, image
        }) 
{
    //states
    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
    )
    const [hasPrime] = useState(Math.random() < 0.5 )

    //redux
    const [{}, dispatch] = useStateValue()
    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                price: price,
                description: description,
                category: category,
                image: image,
                hasPrime: hasPrime,
                rating: rating,
            }
        })
    }
    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
            <p className='absolute top-2 right-2 text-sm italic text-gray-400'>{category}</p>
            <Image 
                src={image}
                height={200}
                width={200}
                objectFit='contain'
            />
            <h4 className='my-3' >{title}</h4> 
            <div className="flex">
                {Array(rating).fill().map(() => (
                    <StarIcon className='h-6 text-yellow-500' />
                ))}
            </div>
            <p className='text-xs my-2 line-clamp-2'>{description}</p>
            <div className='mb-3'>
                <CurrencyFormat
                    thousandSeparator={true}
                    prefix={'$'}
                    value={price}
                    displayType='text'
                />
            </div>
            {hasPrime && (
                <div className='flex items-center space-x-2 -mt-3'>
                    <img className='object-contain h-12' src="https://links.papareact.com/fdw" alt="" />
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            )}
            <button onClick={addToBasket} className='mt-auto button'>Add to basket</button>
        </div>
    )
}

export default Product
