import { BASE_API_URL } from "@/constants";
import { IEmployee, IEmployeeTree } from "@/types";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {HYDRATE} from 'next-redux-wrapper';

const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_API_URL}/employees` }),
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
        query: ({name, ...args}) => {
          return {
            url: `/${name}`,
            method: 'PUT',
            body: {
              name,
              ...args
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

export const { useFetchEmployeeTreeQuery, useAddEmployeeMutation, useUpdateEmployeeMutation, useDeleteEmployeeMutation } = employeesApi;
export { employeesApi };