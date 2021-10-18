import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import {Provider as AuthProvider} from 'next-auth/client'
import StateProvider from '../redux/StateProvider'
import reducer, { initialState } from '../redux/reducer'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <StateProvider initialState={initialState} reducer={reducer} {...pageProps}>
        <Component {...pageProps} />
      </StateProvider>
    </AuthProvider>
  )
}

export default MyApp
