"use client";

import { useEffect, useState } from "react";
import { DeleteEmployee, Login, Logout, NewEmployee, UpdateEmployee, UploadCSV } from "@/components/Forms";
import { useFetchUserQuery } from "@/store/apis/authApi";

export default function Actions() {
  const {data, isSuccess} = useFetchUserQuery();
  useEffect(() => {console.log(data)}, [data])
  if (isSuccess && data)
    return <LoggedInActions />
  else
    return <LoggedOutActions />
}

function LoggedInActions() {
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [fileOpen, setFileOpen] = useState<boolean>(false);

  const toggleAddOpen = () => setAddOpen(!addOpen);
  const toggleUpdateOpen = () => setUpdateOpen(!updateOpen);
  const toggleFileOpen = () => setFileOpen(!fileOpen);

  const closeUpdateFile = () => {
    setUpdateOpen(false);
    setFileOpen(false);
  }
  const closeAddFile = () => {
    setAddOpen(false);
    setFileOpen(false);
  }
  const closeAddUpdate = () => {
    setAddOpen(false);
    setUpdateOpen(false);
  }

  return(
    <>
      <UploadCSV open={fileOpen} handleClose={closeAddUpdate} handleToggle={toggleFileOpen}/>
      <NewEmployee open={addOpen} handleClose={closeUpdateFile} handleToggle={toggleAddOpen} />
      <UpdateEmployee open={updateOpen} handleClose={closeAddFile} handleToggle={toggleUpdateOpen} />
      <DeleteEmployee />
      <Logout/>
    </>
  )
}

function LoggedOutActions() {
  
  return(
    <>
      <Login/>
    </>
  )
}