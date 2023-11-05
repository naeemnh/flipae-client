"use client";

import { useEffect, useState } from "react";
import { FaUserPen } from "react-icons/fa6";
import classNames from "classnames";
import toast from "react-hot-toast";

import styles from "./forms.module.css";
import { fetchEmployeeList, fetchEmployeeTree, useUpdateEmployeeMutation } from "@/store";
import { ISupervisedEmployee, FormProps } from "@/types";

export default function UpdateEmployee({open, handleClose, handleToggle, closeThis}: FormProps) {
  function handleFormToggle() {
    handleClose();
    handleToggle();
  }

  const formClassNames = classNames({
    [styles.form]: true,
    [styles.open]: open,
  });

  // Form Interaction
  const { refetch } = fetchEmployeeTree();
  const {data} = fetchEmployeeList()
  const [updateEmployee, results] = useUpdateEmployeeMutation();
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [filteredEmployees, setFilteredEmployees] = useState<ISupervisedEmployee[]>([]);

  // Filter out the selected employee and their supervisor from the list of employees
  useEffect(() => {
    if (selectedEmployee) {
      setFilteredEmployees(data?.filter((employee: ISupervisedEmployee) => employee.name !== selectedEmployee && employee.supervisor?.name !== selectedEmployee) || [])
    }
  }, [selectedEmployee])


  function handleEmployeeSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    const target = e.target as typeof e.target & {
      value: string;
    };
    setSelectedEmployee(target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      employeeName: { value: string };
      newSupervisor: { value: string };
    };
    const employeeName = target.employeeName.value;
    const newSupervisor = target.newSupervisor.value
    updateEmployee({ name: employeeName, newSupervisor})
      .unwrap()
      .then(() => {
        refetch();
        closeThis();
        toast.success("Employee updated successfully");
      })
      .catch((res) => toast.error(res.data.error));
  }

  return (
    <div className={styles.formWrapper}>
      <FaUserPen onClick={handleFormToggle} cursor={"pointer"} size={24} />
      <form onSubmit={handleSubmit} className={formClassNames}>
        <select defaultValue={''} onChange={handleEmployeeSelection} name="employeeName" id="employeeName">
          <option value="">Employee</option>
          {data?.map((employee) => (
            <option key={employee.name} value={employee.name!}>{employee.name}</option>
          ))}
        </select>
        <select defaultValue={''} name="newSupervisor" id="newSupervisor">
          <option value=''>New Supervisor</option>
          {
            filteredEmployees.map((employee: ISupervisedEmployee) => (
              <option key={employee.name} value={employee.name!}>{employee.name}</option>
            ))
          }
        </select>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}