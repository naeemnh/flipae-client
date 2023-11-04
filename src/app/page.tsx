"use client";

import Image from 'next/image'
import styles from './page.module.css'
import EmployeeTree from '@/components/EmployeeTree';
import { Provider } from 'react-redux';
import { store } from '@/store';

export default async function Home() {  
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by importing the&nbsp;
          <a href="/download/inputData" target="_blank" rel="noopener noreferrer">
          <code className={styles.code}>json file</code>
          </a>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/logo.svg"
              alt="FlipAE Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <Provider store={store}>
        <EmployeeTree />
      </Provider>
    </main>
  )
}

