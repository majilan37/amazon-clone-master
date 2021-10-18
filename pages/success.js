import Header from "../components/Header"
import {CheckCircleIcon} from '@heroicons/react/solid'
import { useRouter } from "next/dist/client/router"
import { useSession } from "next-auth/client"

function Success() {
    const router = useRouter()
    const [ session, loading ] = useSession()
    return (
        <div className="bg-gray-100 h-screen" >
            <Header />
            <main className="max-w-screen-lg mx-auto">
                <div className="flex flex-col p-10 bg-white" >
                    <div className='flex items-center space-x-2 mb-5' >
                        <CheckCircleIcon className="text-green-500 h-10" />
                        <h1>Thank you {session?.user.name}, you order has been confirmed .</h1>
                    </div>
                    <p>
                        Thank for shopping with us, We'll send a confirmation once your item(s) has shipped,
                        if you would like to check the status of your order(s) please press the link below. 
                    </p>
                    <button onClick={() => router.push('/orders') } class="button mt-8">Go to my orders</button>
                </div>
            </main>
        </div>
    )
}

export default Success
