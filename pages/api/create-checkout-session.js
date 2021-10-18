const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
    const { basket, email } = req.body;
    
    const transformItems = basket?.map((item) => ({
        description: item.description,
        quantity: 1,
        price_data: {
            currency: 'usd',
            unit_amount: item.price * 100 ,
            product_data : {
                name: item.title,
                images: [item.image]
            },
        }
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types : ['card'],
        shipping_rates: ['shr_1JkEvtH2MDO0OCdZQhJmPVVY'],
        shipping_address_collection : {
            allowed_countries: ['GB', 'US', 'CA'],
        },
        line_items: transformItems,
        mode:'payment',
        success_url:`${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(basket?.map((item) => item.image))
        }
    })

    res.status(200).json({id: session.id})
}