"use client";

import { useEffect, useState } from "react";
import NewEmployee from "../Forms/NewEmployee";
import UpdateEmployee from "../Forms/UpdateEmployee";
import { useFetchUserQuery } from "@/store/apis/authApi";
import Login from "../Forms/Login";

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

  const toggleAddOpen = () => setAddOpen(!addOpen);
  const toggleUpdateOpen = () => setUpdateOpen(!updateOpen);

  const closeAdd = () => setAddOpen(false);
  const closeUpdate = () => setUpdateOpen(false);

  return(
    <>
      <NewEmployee open={addOpen} handleClose={closeUpdate} handleToggle={toggleAddOpen} closeThis={closeAdd} />
      <UpdateEmployee open={updateOpen} handleClose={closeAdd} handleToggle={toggleUpdateOpen} closeThis={closeUpdate} />
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