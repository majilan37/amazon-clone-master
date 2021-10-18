import { collection, query, orderBy, getDocs } from "firebase/firestore"
import moment from "moment"
import { getSession, useSession } from "next-auth/client"
import Header from "../components/Header"
import Order from "../components/Order"
import {db} from '../firebase'

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
function Orders({orders}) {
    const [ session, loading ] = useSession()
    return (
        <div>
            <Header />
            <main className='max-w-screen-lg mx-auto' >
                <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Your Orders</h1>
                {session ? <h2 className='text-2xl text-center'>{orders?.length} orders</h2>
                        : <h2>Please sign in to see your order</h2> }
                {!orders?.length ? (
                    <h2  className='text-2xl text-center'>You have no orders yet</h2>
                ) : (
                    <div className='mt-5 space-y-4'>
                        {orders?.map((order) =>(
                            <Order order={order} key={order.id} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}

export default Orders


export async function getServerSideProps(context){
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    const session = await getSession(context)
    
    if (!session) {
        return {
            props:{}
        }
    }

    // Firebase db
    const collectionRef = collection(db,'users', `${session.user.email}`, 'orders')
    const querySnap = query(collectionRef, orderBy('timestamp', 'desc'))
    const querySnapshot = await getDocs(querySnap);
    const dataArr = new Array()

    querySnapshot.forEach((doc) => {
        dataArr.push(doc.data())
    });
    
    // Stripe API
    const orders = await Promise.all(
        dataArr.map( async (order) =>({
            id: order.id,
            amount: order.amount,
            amountShipping: order.amount_shipping,
            images: order.images,
            timestamp: moment(order.timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100
                })
            )
        }))
    )
        // console.log(orders)
    return {
        props: {
            orders,
        }
    }
}

