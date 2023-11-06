import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { employeesApi } from './apis/employeesApi';
import { authApi } from './apis/authApi';

export const store = configureStore({
  reducer: {
    [employeesApi.reducerPath]: employeesApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(employeesApi.middleware)
      .concat(authApi.middleware);
  }
});

setupListeners(store.dispatch);

export { 
  useFetchEmployeeTreeQuery as fetchEmployeeTree, useFetchEmployeeListQuery as fetchEmployeeList, useAddEmployeeMutation, useUpdateEmployeeMutation, useDeleteEmployeeMutation, useUploadEmployeesMutation
} from './apis/employeesApi';

export { useFetchUserQuery, useLoginMutation, useLogoutMutation } from './apis/authApi'