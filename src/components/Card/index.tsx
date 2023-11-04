"use client";

import { FaCircleUser, FaTrashCan } from 'react-icons/fa6';
import styles from './card.module.css';
import { useDeleteEmployeeMutation, fetchEmployeeTree } from '@/store';
import toast from 'react-hot-toast';

export default function Card({ name }: { name: string}) {
  const [deleteEmployee, results] = useDeleteEmployeeMutation();
  const { refetch } = fetchEmployeeTree();
  function handleDelete() {
    deleteEmployee({name}).then(() => {
      refetch();
      toast.success('Employee deleted successfully');
    }).catch((res) => {
      toast.error(res.data.error);
    });
  }
  return (
    <div className={styles.card}>
      <button onClick={handleDelete} className={styles.close}>
        <FaTrashCan  />
      </button>
        <FaCircleUser size={48} />
        <h2 className={styles.title}>
          {name}
        </h2>
    </div>
  );
}
