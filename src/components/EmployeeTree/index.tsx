"use client";

import { fetchEmployeeTree } from "@/store";
import Employee from "../Employee";
import { IEmployeeTree } from "@/types";

import styles from './employeeTree.module.css'

export default function EmployeeTree() {
  const { data, error, isLoading } = fetchEmployeeTree();
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.log(error);
    return <div>Something has gone wrong</div>
  };
  if (data)
    return (
      <div className={styles.treeWrapper}>
        {
          Object.entries(data).map(([employeeName, subEmployeeTrees]: [string, IEmployeeTree[]], index: number) => (
            <Employee key={index} employeeTree={{[employeeName]: subEmployeeTrees}} />
          ))
        }
      </div>
    )  
}