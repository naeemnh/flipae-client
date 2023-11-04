"use client";

import { useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import classNames from "classnames";
import toast from "react-hot-toast";

import styles from './newEmployee.module.css';
import { fetchEmployeeTree, useAddEmployeeMutation } from "@/store";

export default function newEmployee() {

  // Icon Interaction
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen(!open);
  const formClassNames = classNames({[styles.form]: true, [styles.open]: open});

  // Form Interaction
  const { refetch } = fetchEmployeeTree()
  const [addEmployee, results] = useAddEmployeeMutation();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      employeeName: { value: string };
    };
    const employeeName = target.employeeName.value;
    addEmployee({ name: employeeName })
      .unwrap()
      .then(() => {
        refetch();
        setOpen(false);
        toast.success('Employee added successfully');
      })
      .catch((res) => toast.error(res.data.error));
  }

  
  return (
    <div className={styles.newEmployeeWrapper}>
      <FaUserPlus onClick={toggleOpen} cursor={'pointer'} size={24} />
      <form onSubmit={handleSubmit} className={formClassNames}>
        <input type="text" name="employeeName" placeholder="Employee Name" />
        <button type="submit" >Add</button>
      </form>
    </div>
  )
}