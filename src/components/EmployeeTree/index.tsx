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
          Object.entries(data).length > 0 ?
          Object.entries(data).map(([employeeName, subEmployeeTrees]: [string, IEmployeeTree[]], index: number) => (
            <Employee key={index} employeeTree={{[employeeName]: subEmployeeTrees}} />
          )) : (
          <>
            <h1 className="message">No employees found.</h1>
            <h3 className="message">Start by Creating an employee or by uploading an employee:supervisor list</h3>
          </>
          )
        }
      </div>
    )  
}