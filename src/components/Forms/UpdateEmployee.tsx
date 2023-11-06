"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaUserPen, FaXmark } from "react-icons/fa6";
import { Tooltip } from 'react-tooltip';
import classNames from "classnames";
import toast from "react-hot-toast";

import styles from "./forms.module.css";
import { fetchEmployeeList, fetchEmployeeTree, useUpdateEmployeeMutation } from "@/store";
import { ISupervisedEmployee, FormProps } from "@/types";

export default function UpdateEmployee({open, handleClose, handleToggle}: FormProps) {
  function handleFormToggle() {
    handleClose();
    handleToggle();
  }

  const formClassNames = classNames({
    [styles.form]: true,
    [styles.open]: open,
  });

  // Form Interaction
  const { refetch: refetchTree } = fetchEmployeeTree();
  const {data, refetch: refetchList} = fetchEmployeeList()
  const [updateEmployee, results] = useUpdateEmployeeMutation();
  const [selectedEmployees, setSelectedEmployees] = useState<{employee: string, supervisor: string}>({employee: '', supervisor: ''});
  const [filteredEmployees, setFilteredEmployees] = useState<ISupervisedEmployee[]>([]);

  // Filter out the selected employee from the list of employees
  useEffect(() => {
    const {employee: selectedEmployee } = selectedEmployees;
    if (selectedEmployee) {
      setFilteredEmployees(data?.filter((employee: ISupervisedEmployee) => employee.name !== selectedEmployee) || [])
    }
  }, [selectedEmployees.employee])


  const handleEmployeeSelection = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelectedEmployees(selectedEmployees => ({...selectedEmployees, employee: e.target.value}));

  const handleSupervisorSelection = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelectedEmployees(selectedEmployees => ({...selectedEmployees, supervisor: e.target.value}));

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
        refetchTree();
        refetchList();
        handleToggle();
        toast.success("Employee updated successfully");
      })
      .catch((res) => toast.error(res.data.error));
    setSelectedEmployees({employee: '', supervisor: ''});
  }

  return (
    <div className={styles.formWrapper}>
      <FaUserPen data-tooltip-id="update" onClick={handleFormToggle} cursor={"pointer"} size={24} />
      <Tooltip id="update" place="top" content="Update Employee" />
      <form onSubmit={handleSubmit} className={formClassNames}>
        <FaXmark onClick={handleToggle} cursor={"pointer"} size={24} className={styles.close} />
        <select defaultValue={''} onChange={handleEmployeeSelection} name="employeeName" id="employeeName">
          <option value="">Employee</option>
          {data?.map((employee) => (
            <option key={employee.name} value={employee.name!}>{employee.name}</option>
          ))}
        </select>
        <select defaultValue={''} onChange={handleSupervisorSelection} name="newSupervisor" id="newSupervisor">
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