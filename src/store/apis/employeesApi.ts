import { BASE_API_URL } from "@/constants";
import { IEmployee, IEmployeeTree, ISupervisedEmployee } from "@/types";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {HYDRATE} from 'next-redux-wrapper';

const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API_URL}/employees`
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
          return {
            url: '/',
            method: 'POST',
            params: {
              ...(relation && {relation})
            },
            body: {
              ...args
            },
          }
        }
      }),
      updateEmployee: build.mutation<IEmployee, Partial<IEmployee>>({
        query: ({name, newSupervisor}) => {
          return {
            url: `/${name}`,
            method: 'PUT',
            body: {
              name,
              newSupervisor
            },
          }
        }
      }),
      deleteEmployee: build.mutation<IEmployee, Partial<IEmployee>>({
        query: ({name}) => {
          return {
            url: `/${name}`,
            method: 'DELETE',
          }
        }
      }),
    }
  },
});

export const { useFetchEmployeeTreeQuery, useFetchEmployeeListQuery, useAddEmployeeMutation, useUpdateEmployeeMutation, useDeleteEmployeeMutation } = employeesApi;
export { employeesApi };