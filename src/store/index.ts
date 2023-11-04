import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { employeesApi } from './apis/employeesApi';

export const store = configureStore({
  reducer: {
    [employeesApi.reducerPath]: employeesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(employeesApi.middleware);
  }
});

setupListeners(store.dispatch);

export { 
  useFetchEmployeeTreeQuery as fetchEmployeeTree, useAddEmployeeMutation as addEmployee, useUpdateEmployeeMutation as updateEmployee, useDeleteEmployeeMutation as deleteEmployee 
} from './apis/employeesApi';