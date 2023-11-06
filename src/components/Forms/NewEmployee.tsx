"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import classNames from "classnames";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa6";

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
  const [employeeName, setEmployeeName] = useState<string>('');
  const handleEmployeeName = (e: ChangeEvent<HTMLInputElement>) => setEmployeeName(e.target.value);

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
    setEmployeeName('');
  }

  
  return (
    <div className={styles.formWrapper}>
      <FaUserPlus onClick={handleFormToggle} cursor={'pointer'} size={24} />
      <form onSubmit={handleSubmit} className={formClassNames}>
        <input type="text" name="employeeName" onChange={handleEmployeeName} value={employeeName} placeholder="Employee Name" />
        <button type="submit" >Add</button>
      </form>
    </div>
  )
}