import moment from "moment"
import CurrencyFormat from "react-currency-format"

function Order({order}) {
    const {id, amount, amount_shipping, images, items, timestamp} = order 
    return (
        <div className="relative border rounded-md">
            <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                <div>
                    <p className='font-bold text-xs'>ORDER PLACED</p>
                    <p>{moment.unix(timestamp).format('DD MMM YYYY')}</p>
                </div>
                <div>
                    <p className='text-xs font-bold'>TOTAL</p>
                    <p>
                        <CurrencyFormat
                            thousandSeparator={true}
                            prefix={'$'}
                            value={amount}
                            displayType='text'
                        />
                        {' '} Delivery {' '}
                        <CurrencyFormat
                            thousandSeparator={true}
                            prefix={'$'}
                            value={amount_shipping}
                            displayType='text'
                        />
                    </p>
                </div>
                <p className='text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500'>{items.data.length}</p>
                <p className='absolute top-2 right-2 ring-2 w-40 lg:w-72 truncate whitespace-nowrap'>
                    ORDER # {id}
                </p>
            </div>
            <div className="p-5 sm:p-10">
                <div className='flex space-x-6 overflow-x-auto' >
                    {images.map((image) => (
                        <img src={image} className='h-20 object-contain sm:h-32 mx-2' alt="" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Order
