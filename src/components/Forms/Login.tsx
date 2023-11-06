"use client";

import { useState } from 'react';
import {FiLogIn} from 'react-icons/fi';
import {Tooltip} from 'react-tooltip';
import classNames from 'classnames';
import toast from 'react-hot-toast';

import styles from './forms.module.css';
import { useFetchUserQuery, useLoginMutation } from '@/store/apis/authApi';
import { FaXmark } from 'react-icons/fa6';

export default function Login() {
  const [open, setOpen] = useState<Boolean>(false);

  const toggleOpen = () => setOpen(!open);
  const formClassNames = classNames({[styles.form]: true, [styles.open]: open});

  const { refetch } = useFetchUserQuery();
  const [login] = useLoginMutation();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: {value: string}
      password: {value: string}
    }
    const username = target.username.value;
    const password = target.password.value;
    login({username, password})
      .unwrap()
      .then((data) => {
        const {token} = data;
        localStorage.setItem('authToken', token);
        refetch();
        setOpen(false);
        toast.success("Logged in");
      })
      .catch((res) => {
        toast.error('Incorrect username or password')
      })
  }

  return (
    <div className={styles.formWrapper}>
      <FiLogIn data-tooltip-id="login" onClick={toggleOpen} cursor={'pointer'} size={24} />
      <Tooltip id="login" place="top" content="Login" />
      <form onSubmit={handleSubmit} className={formClassNames}>
        <FaXmark onClick={toggleOpen} cursor={'pointer'} size={24} className={styles.close}/>
        <input type="text" name="username" id='username' placeholder="Username" />
        <input type="password" name="password" id="password" placeholder='Password' />
        <button type="submit" >Login</button>
      </form>
    </div>
  )
}