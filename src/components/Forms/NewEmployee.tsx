"use client";

import { FaUserPlus } from "react-icons/fa6";
import classNames from "classnames";
import toast from "react-hot-toast";

import styles from './forms.module.css';
import { fetchEmployeeTree, useAddEmployeeMutation } from "@/store";
import { FormProps } from "@/types";

export default function NewEmployee({open, handleClose, handleToggle, closeThis}: FormProps) {

  // Icon Interaction
  function handleFormToggle() {
    handleClose();
    handleToggle();
  }
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
        closeThis();
        toast.success('Employee added successfully');
      })
      .catch((res) => toast.error(res.data.error));
  }

  
  return (
    <div className={styles.formWrapper}>
      <FaUserPlus onClick={handleFormToggle} cursor={'pointer'} size={24} />
      <form onSubmit={handleSubmit} className={formClassNames}>
        <input type="text" name="employeeName" placeholder="Employee Name" />
        <button type="submit" >Add</button>
      </form>
    </div>
  )
}