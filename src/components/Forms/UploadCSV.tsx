import { FormEvent } from 'react';
import Papa from 'papaparse';
import classNames from 'classnames';
import { FiUploadCloud } from 'react-icons/fi'

import { FormProps } from '@/types';
import styles from './forms.module.css'
import { fetchEmployeeList, fetchEmployeeTree, useUploadEmployeesMutation } from '@/store';
import toast from 'react-hot-toast';

export default function UploadCSV({open, handleClose, handleToggle}: FormProps) {

  function handleFormToggle() {
    handleClose();
    handleToggle();
  }

  const formClassNames = classNames({[styles.form]: true, [styles.open]: open});

  const [uploadEmplyees] = useUploadEmployeesMutation()
  const {refetch: refetchTree} = fetchEmployeeTree();
  const {refetch: refetchList} = fetchEmployeeList();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      csvFile: { files: File[] };
    };
    const csvFile = target.csvFile.files[0];
    Papa.parse(csvFile, {
      header: true,
      complete: function(results) {
        const data = results.data;
        const obj: {[key: string]: string} = {};
        data.forEach((row: any) => {
          obj[row.employee] = row.supervisor;
        });
        console.log(obj)
        console.log('sending list');
        uploadEmplyees({employees: obj})
          .then(() => {
            refetchTree();
            refetchList();
            toast.success('Employees uploaded successfully');
          })
          .catch((res) => toast.error(res.data.error));
      }
    })
  }
  
  return (
    <div className={styles.formWrapper}>
      <FiUploadCloud onClick={handleFormToggle} cursor={'pointer'} size={24}/>
      <form onSubmit={handleSubmit} className={formClassNames}>
        <input type="file" accept='.csv' name="csvFile" id="csvFile" placeholder='Choose .csv File' />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}