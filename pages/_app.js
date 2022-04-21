// import '/styles/reset.css'
import Head from 'next/head'
import Footer from '../components/Footer'
import '/styles/global.css'
export default function App({ Component, pageProps }) {
  return <>
    <Head>
      <title>Coin Info</title>
    </Head>
    <Component {...pageProps} />
    <Footer />
  </>
}