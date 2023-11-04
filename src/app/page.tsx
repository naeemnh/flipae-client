// "use client";

import Image from 'next/image';

import styles from './page.module.css';
import EmployeeTree from '@/components/EmployeeTree';
import NewEmployee from '@/components/NewEmployee';
import Store from '@/providers/Store';
import Flash from '@/providers/Flash';

export default async function Home() {

  return (
    <>
      <Flash />
      <Store>
        <main className={styles.main}>
            <div className={styles.description}>
              <div className={styles.actions}>
                <NewEmployee />
              </div>
              <p>
                Get started by importing the&nbsp;
                <a href="/download/inputData" target="_blank" rel="noopener noreferrer">
                <code className={styles.code}>json file</code>
                </a>
              </p>
              <div>
                  <Image
                    src="/logo.svg"
                    alt="FlipAE Logo"
                    className={styles.vercelLogo}
                    width={100}
                    height={24}
                    priority
                  />
              </div>
            </div>
            <EmployeeTree />
        </main>
      </Store>
    </>
  )
}

