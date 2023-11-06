"use client";

import { FaUserXmark, FaXmark } from 'react-icons/fa6';
import styles from './forms.module.css';
import classNames from 'classnames';
import { FormEvent, useState } from 'react';
import { fetchEmployeeList, fetchEmployeeTree, useDeleteEmployeeMutation } from '@/store';
import toast from 'react-hot-toast';

export default function DeleteEmployee() {
  const wrapperClassNames = classNames([styles.formWrapper, styles.deleteEmployeeWrapper])

  const [open, setOpen] = useState<Boolean>(false);
  const toggleOpen = () => setOpen(!open);
  const formClassNames = classNames({[styles.form]: true, [styles.open]: open});

  const [deleteEmployee] = useDeleteEmployeeMutation();
  const {data, refetch} = fetchEmployeeList();
  const { refetch: refetchTree } = fetchEmployeeTree();
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      employee: {value: string}
    }
    const name = target.employee.value;
    console.log(name);
    deleteEmployee({name})
      .then(() => {
        // window.location.reload();
        refetch();
        refetchTree();    
        toast.success('Employee deleted successfully');
      })
      .catch((res) => console.log(res))
    e.currentTarget.reset();
    setOpen(false);
  }

  return (
    <div className={wrapperClassNames}>
      <FaUserXmark onClick={toggleOpen} cursor={'pointer'} size={24} />
      <form onSubmit={handleSubmit} className={formClassNames} >
        <FaXmark onClick={() => setOpen(false)} cursor={'pointer'} size={24} className={styles.close}/>
        <select name="employee" id="deleteEmployee">
          <option value="">Select Employee</option>
          {data?.map((employee: any) => <option key={employee.name} value={employee.name}>{employee.name}</option>)}
        </select>
        <button type="submit">Delete</button>
      </form>
    </div>
  )
}