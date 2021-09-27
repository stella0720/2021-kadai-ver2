import '../lib/firebase'
import 'tailwindcss/tailwind.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp

