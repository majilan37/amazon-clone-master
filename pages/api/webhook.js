import {buffer} from 'micro'
import * as admin from 'firebase-admin'
import {getFirestore, serverTimestamp, setDoc, doc} from 'firebase/firestore'

const serviceAccount = require('../../premissions.json')

const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://clone-master-8a6b8-default-rtdb.firebaseio.com/'
}) : admin.app()


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_SIGNING_SECRET

const fulfillOrder = (session) => {

    return (  
            app
            .firestore()
            .collection('users')
            .doc(session.metadata.email)
            .collection('orders')
            .doc(session.id)
            .set({
                id: session.id,
                amount: session.amount_total / 100,
                amount_shipping: session.total_details.amount_shipping / 100,
                images: JSON.parse(session.metadata.images),
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            })
            .then(() => console.log('SUCCESS: Order', session.id, 'has been added to DB'))
    )
}

export default async (req, res) => {
    if (req.method === 'POST'){
        const requestBuffer = await buffer(req)
        const payload = requestBuffer.toString()
        const sig = req.headers['stripe-signature'] 

        let event;

        try{
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
        } catch (err){
            console.log('ERROR', err.message);
            return res.status(400).send(`webhook error ${err.message}`)
        }

        if (event.type === 'checkout.session.completed'){
            const session = event.data.object

            return fulfillOrder(session).then(() => res.status(200)
                                        .catch(err => err.status.send(`Webhook Error: ${err.message}`)))
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    }
}