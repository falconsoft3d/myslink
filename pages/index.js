import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import theme from "./theme"

export default function Home() {
  return ( 
    <>
    <div className={styles.container}>

      <Head>
        <title>myslink: url shortener</title>
        <meta name="description" content="url shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
        <h1>Url Shortener</h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
         
          <span className={styles.logo}>
            MARLON FALCON / falconsoft3d
          </span>

        </a>
      </footer>
    </div>
    </>
    )
}
