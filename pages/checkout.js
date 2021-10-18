import { doc, setDoc } from 'firebase/firestore'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useSession } from 'next-auth/client'
import Image from 'next/image'
import CurrencyFormat from 'react-currency-format'
import CheckoutProduct from '../components/CheckoutProduct'
import Header from "../components/Header"
import { db } from '../firebase'
import { getBasketTotal } from '../redux/reducer'
import { useStateValue } from '../redux/StateProvider'

const stripePromise = loadStripe(process.env.stripe_public_key)

function Checkout() {
    const [{basket}, dispatch] = useStateValue()
    const [session] = useSession()

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;
        const checkoutSession = await axios.post('/api/create-checkout-session', {
            basket,
            email: session.user.email
        })

        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })
        
        if(result.error) alert(result.error.message)

        return result
    }

    return (
        <div className='bg-gray-100' >
            <Header />
            <main className='lg:flex max-w-screen-2xl mx-auto' >
                <div className='flex-grow m-5 shadow-sm'>
                    <Image 
                        src='https://links.papareact.com/ikj'
                        width={1020}
                        height={250}
                        objectFit='contain'
                    />
           
                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        {basket.length ? (
                            <h2 className='text-3xl border-b pb-4'>Shopping Basket</h2>
                        ):(
                            <h2 className='text-3xl border-b pb-4'>Your Amazon Basket is Empty</h2>
                        )}
                        <div>
                            {basket.map((item) => (
                                <CheckoutProduct key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
                {basket.length > 0 && (
                    <div className="flex flex-col p-10 shadow-md">
                        <h2 className="whitespace-nowrap">Subtotal ({basket.length} items) </h2>
                        <span className="font-bold">
                            <CurrencyFormat 
                                thousandSeparator={true}
                                prefix={'$'}
                                value={getBasketTotal(basket)}
                                displayType='text'
                            />
                        </span>
                        <button 
                            disabled={!session} 
                            role='link' 
                            className={`button mt-2 whitespace-nowrap ${!session && 'from-gray-300 to-gray-500 cursor-not-allowed border border-gray-400 ring-0 active:from-gray-300'}`}
                            onClick={createCheckoutSession}    
                        >
                            {!session ? 'Sign in to checkout': 'Proceed to checkout'}
                        </button>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Checkout
