"use client";

import { FaCircleUser, FaTrashCan } from 'react-icons/fa6';
import styles from './card.module.css';
import { useDeleteEmployeeMutation, fetchEmployeeTree, fetchEmployeeList, useFetchUserQuery } from '@/store';
import toast from 'react-hot-toast';

export default function Card({ name }: { name: string}) {
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const { refetch: refetchTree } = fetchEmployeeTree();
  const { refetch: refetchList } = fetchEmployeeList();
  const { data } = useFetchUserQuery();

  function handleDelete() {
    deleteEmployee({name}).then(() => {
      refetchTree();
      refetchList();
      toast.success('Employee deleted successfully');
    }).catch((res) => {
      toast.error(res.data.error);
    });
  }
  
  return (
    <div className={styles.card}>
      {data && (
          <button onClick={handleDelete} className={styles.close}>
            <FaTrashCan  />
          </button>
      )}
      <FaCircleUser size={48} />
      <h2 className={styles.title}>
        {name}
      </h2>
    </div>
  );
}
