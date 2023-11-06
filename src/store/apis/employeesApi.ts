import { BASE_API_URL } from "@/constants";
import { IEmployee, IEmployeeTree, ISupervisedEmployee } from "@/types";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {HYDRATE} from 'next-redux-wrapper';

const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API_URL}/employees`,
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  extractRehydrationInfo(action, { reducerPath, }) {
      if (action.type == HYDRATE)
        return action.payload[reducerPath]
  },
  endpoints(build) {
    return {
      fetchEmployeeTree: build.query<IEmployeeTree, void>({
        query: () => {
          return {
            url: '/',
            method: 'GET',
          }
        }
      }),
      fetchEmployeeList: build.query<ISupervisedEmployee[], void>({
        query: () => {
          return {
            url: '/list',
            method: 'GET',
          }
        }
      }),
      addEmployee: build.mutation<IEmployee, Partial<IEmployee>>({
        query: ({relation, ...args}) => {
          const token = localStorage.getItem('authToken');
          return {
            url: '/',
            method: 'POST',
            params: {
              ...(relation && {relation})
            },
            body: {
              ...args
            },
            headers: {
              ...(token && {Authorization: `Bearer ${token}`})
            }
          }
        }
      }),
      updateEmployee: build.mutation<IEmployee, Partial<IEmployee>>({
        query: ({name, newSupervisor}) => {
          const token = localStorage.getItem('authToken');
          return {
            url: `/${name}`,
            method: 'PUT',
            body: {
              name,
              newSupervisor
            },
            headers: {
              ...(token && {Authorization: `Bearer ${token}`})
            }
          }
        }
      }),
      deleteEmployee: build.mutation<IEmployee, Partial<IEmployee>>({
        query: ({name}) => {
          const token = localStorage.getItem('authToken');
          return {
            url: `/${name}`,
            method: 'DELETE',
            headers: {
              ...(token && {Authorization: `Bearer ${token}`})
            }
          }
        }
      }),
      uploadEmployees: build.mutation<any, {employees: {[key:string]: string}}>({
        query: ({employees}) => {
          const token = localStorage.getItem('authToken');
          return {
            url: '/upload',
            method: 'POST',
            body: {employees},
            headers: {
              ...(token && {Authorization: `Bearer ${token}`})
            }
          }
        }
      })
    }
  },
});

export const { useFetchEmployeeTreeQuery, useFetchEmployeeListQuery, useAddEmployeeMutation, useUpdateEmployeeMutation, useDeleteEmployeeMutation, useUploadEmployeesMutation } = employeesApi;
export { employeesApi };