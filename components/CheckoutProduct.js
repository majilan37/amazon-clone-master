import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../redux/StateProvider'

function CheckoutProduct({item}) {
    const {id, title, description, price, image, category, hasPrime, rating} = item
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
    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }
    return (
        <div className="grid lg:grid-cols-5 grid-cols-3 mb-8 p-3 shadow-md">
            <Image 
                src={image}
                height={200}
                width={200}
                objectFit='contain'
            />
            <div className="col-span-3 mx-5" >
                <p>{title}</p>
                <div className="flex">
                    {Array(rating).fill().map((_, index) => (
                        <StarIcon key={index} className='h-6 text-yellow-500' />
                    ))}
                </div>
                <p className="text-sm line-clamp-3 my-2">{description}</p>
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
                        <img loading='lazy' className='object-contain h-12' src="https://links.papareact.com/fdw" alt="" />
                        <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                    </div>
                )}
            </div>
            <div className='flex-grow w-full flex items-center justify-center flex-col space-y-2'>
                <button className='button w-full' onClick={addToBasket}>Add to basket</button>
                <button className='button w-full' onClick={removeFromBasket}>Remove from basket</button> 
            </div>
        </div>
    )
}

export default CheckoutProduct
