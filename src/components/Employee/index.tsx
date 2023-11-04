import { IEmployeeTree, IPosition } from "@/types";
import Card from "../Card";
import styles from './employee.module.css'

interface EmployeeProps {
  employeeTree: IEmployeeTree;
}

export default function Employee({employeeTree}: EmployeeProps) {
  const [employeeName, subEmployeeTrees] = Object.entries(employeeTree)[0];


  return (
    <div className={styles.employeeWrapper}>
      <Card name={employeeName} />
      {
        subEmployeeTrees && subEmployeeTrees.length > 0 && (
          <div className={styles.subEmployeeWrapper}>
            {
              subEmployeeTrees.map((subEmployeeTree: IEmployeeTree, index: number) => (
                // <Employee key={index} employeeTree={subEmployeeTree} parentPosition={position} />
                <Employee key={index} employeeTree={subEmployeeTree}/>
              ))
            }
          </div>
        )
      }
    </div>
  )
}