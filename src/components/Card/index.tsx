"use client";

import { FaCircleUser, FaTrashCan } from 'react-icons/fa6';
import styles from './card.module.css';

export default function Card({ name }: { name: string}) {
  return (
    <div className={styles.card}>
      <button onClick={() => {}} className={styles.close}>
        <FaTrashCan  />
      </button>
        <FaCircleUser size={'3rem'} />
        <h2 className={styles.title}>
          {name}
        </h2>
    </div>
  );
}
