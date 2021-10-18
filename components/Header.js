import Image from 'next/image'
import {signIn, signOut, useSession} from 'next-auth/client'
import {
    MenuIcon,
    ShoppingCartIcon,
    SearchIcon,
} from '@heroicons/react/outline'
import { useRouter } from 'next/dist/client/router'
import { useStateValue } from '../redux/StateProvider'

function Header() {
    const [ session, loading ] = useSession()
    const router = useRouter()
    const [{basket}, dispatch] = useStateValue()
    return (
        <header className='sticky top-0 z-50'>
            <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2' >
                <div onClick={() => router.push('/')} className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
                    <Image
                        src='https://links.papareact.com/f90'
                        width={150}
                        height={40}
                        objectFit='contain'
                        className='cursor-pointer'
                    />
                </div>
                <div className="hidden sm:flex items-center flex-grow cursor-pointer h-10 
                    rounded-md bg-yellow-400 hover:bg-yellow-500 transition-all"
                >
                    <input type="text" placeholder="Search..." className="p-2 px-4 h-full flex-grow rounded-l-md outline-none" />
                    <SearchIcon className="h-12 p-4" />
                </div>
                <div className="flex text-white items-center text-xs space-x-6 px-6 whitespace-nowrap">
                    <div className='link' onClick={!session ? signIn : signOut}>
                        <p>{session ? `Hello, ${session.user.name}` : 'Sign in'}</p>
                        <p className="font-extrabold md:text-sm">Account & Lists</p>
                    </div>
                    <div className='link' onClick={() => router.push('/orders')}>
                        <p>Returns</p>
                        <p className="font-extrabold md:text-sm">& Orders</p>
                    </div>
                    <div onClick={() => router.push('/checkout')} className='link flex items-center space-x-1 relative'>
                        <span className="absolute top-0 right-0 md:right-12 h-4 w-4 bg-yellow-400 rounded-full text-center text-black font-bold">{basket.length}</span>
                        <ShoppingCartIcon className="h-10" />
                        <p className="hidden md:inline-flex font-extrabold md:text-sm mt-2">Basket</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center bg-amazon_blue-light text-white p-2 pl-6 space-x-3">
                <p className='link flex items-center'>
                    <MenuIcon className="h-6 mr-1" />
                    All
                </p>
                <p className="link">Prime Video</p>
                <p className="link">Amazon Business</p>
                <p className="link">Today's Deals</p>
                <p className="link hidden lg:inline-flex">Food & Grocery</p>
                <p className="link hidden lg:inline-flex">Prime</p>
                <p className="link hidden lg:inline-flex">Buy Again</p>
                <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
                <p className="link hidden lg:inline-flex">Health & Personal Care</p>
            </div>
        </header>
    )
}

export default Header
