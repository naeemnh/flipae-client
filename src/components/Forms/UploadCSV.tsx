import { FormEvent } from 'react';
import { usePapaParse } from 'react-papaparse'
import classNames from 'classnames';
import { FiDownload, FiUpload } from 'react-icons/fi'
import {Tooltip} from 'react-tooltip';

import { FormProps } from '@/types';
import styles from './forms.module.css'
import { fetchEmployeeList, fetchEmployeeTree, useUploadEmployeesMutation } from '@/store';
import toast from 'react-hot-toast';
import { ParseResult } from 'papaparse';
import { FaXmark } from 'react-icons/fa6';

export default function UploadCSV({open, handleClose, handleToggle}: FormProps) {
  const {readString} = usePapaParse();

  function handleFormToggle() {
    handleClose();
    handleToggle();
  }

  const formClassNames = classNames({[styles.form]: true, [styles.open]: open});

  const [uploadEmployees, results] = useUploadEmployeesMutation()
  const {refetch: refetchTree} = fetchEmployeeTree();
  const {refetch: refetchList} = fetchEmployeeList();

  function formatCSVAndSaveData(results: ParseResult<unknown>) {
    const data = results.data;
      const obj: {[key: string]: string} = {};
      data.forEach((row: any) => {
        obj[row.employee] = row.supervisor;
      });
      uploadEmployees({employees: obj})
        .then(() => {
          toast.success('Employees uploaded successfully');
          refetchList();
          refetchTree();
        })
        .catch((res) => toast.error('res.data.error'));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement> & {target: { csvFile: { files: FileList } }}) {
    e.preventDefault();
    const csvFile = e.target.csvFile.files[0];
    if (window.confirm('This action may override existing data. Are you sure you want to continue?'))
      csvFile.text().then((text) => {
        readString(text, {
          header: true,
          complete: formatCSVAndSaveData
        })
      })
    handleToggle();
    e.currentTarget.reset();
  }
  
  return (
    <div className={styles.formWrapper}>
      <FiUpload data-tooltip-id="upload" onClick={handleFormToggle} cursor={'pointer'} size={24}/>
      <Tooltip id="upload" place="top" content="Upload CSV File" />
      <form onSubmit={handleSubmit} className={formClassNames}>
        <FaXmark onClick={handleToggle} cursor={'pointer'} size={24} className={styles.close}/>
        <input type="file" accept='.csv' name="csvFile" id="csvFile" placeholder='Choose .csv File' />
        <button type="submit">Upload</button>
        <span>
          Download the&nbsp;<a href="/download/example.csv" target="_blank" rel="noopener noreferrer"><code className={styles.code}>Example file <FiDownload size={20}/></code></a>
        </span>
      </form>
    </div>
  )
}