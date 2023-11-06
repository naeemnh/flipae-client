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

  const {data, refetch} = fetchEmployeeList();
  const { refetch: refetchTree } = fetchEmployeeTree();
  const [deleteEmployee, results] = useDeleteEmployeeMutation();
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      employee: {value: string}
    }
    const employee = target.employee.value;
    deleteEmployee({employee})
      .unwrap()
      .then(() => {
        refetchTree();
        refetch();
        toast.success('Employee deleted successfully');
      })
      .catch((res) => console.log(res))

  }

  return (
    <div className={wrapperClassNames}>
      <FaUserXmark onClick={toggleOpen} cursor={'pointer'} size={24} />
      <form onSubmit={handleSubmit} className={formClassNames} >
        <FaXmark onClick={() => setOpen(false)} cursor={'pointer'} size={24} className={styles.close}/>
        <select name="employee" id="deleteEmployee">
          <option value="">Select Employee</option>
          {data?.map((employee: any) => <option value={employee.name}>{employee.name}</option>)}
        </select>
        <button type="submit">Delete</button>
      </form>
    </div>
  )
}