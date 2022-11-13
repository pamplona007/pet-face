import 'styles/styles.scss'
import type { AppProps } from 'next/app'
import AuthenticationStorage from '../contexts/Authentication'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthenticationStorage>
      <Component {...pageProps} />
    </AuthenticationStorage>
  )
}
