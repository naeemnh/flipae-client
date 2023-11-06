"use client";

import { FormEvent } from "react";
import classNames from "classnames";
import toast from "react-hot-toast";
import { FaUserPlus, FaXmark } from "react-icons/fa6";
import { Tooltip } from 'react-tooltip';

import { FormProps } from "@/types";
import styles from './forms.module.css';
import { fetchEmployeeList, fetchEmployeeTree, useAddEmployeeMutation } from "@/store";

export default function NewEmployee({open, handleClose, handleToggle}: FormProps) {

  // Icon Interaction
  function handleFormToggle() {
    handleClose();
    handleToggle();
  }
  const formClassNames = classNames({[styles.form]: true, [styles.open]: open});

  // Form Interaction
  const { refetch: refetchTree } = fetchEmployeeTree();
  const { refetch: refetchList } = fetchEmployeeList();
  const [addEmployee, results] = useAddEmployeeMutation();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      employeeName: { value: string };
    };
    const employeeName = target.employeeName.value;
    addEmployee({ name: employeeName })
      .unwrap()
      .then(() => {
        refetchTree();
        refetchList();
        handleToggle();
        toast.success('Employee added successfully');
      })
      .catch((res) => toast.error(res.data.error));
      e.currentTarget.reset()
  }

  
  return (
    <div className={styles.formWrapper}>
      <FaUserPlus data-tooltip-id="new" onClick={handleFormToggle} cursor={'pointer'} size={24} />
      <Tooltip id="new" place="top" content="New Employee" />
      <form onSubmit={handleSubmit} className={formClassNames}>
        <FaXmark onClick={handleToggle} cursor={'pointer'} size={24} className={styles.close}/>
        <input type="text" name="employeeName" placeholder="Employee Name" />
        <button type="submit" >Add</button>
      </form>
    </div>
  )
}