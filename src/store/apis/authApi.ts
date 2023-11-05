import { BASE_API_URL } from "@/constants";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from "next-redux-wrapper";

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${BASE_API_URL}/auth`,
    headers: {
      "ContentType": "application/json"
    },
  }),
  extractRehydrationInfo(action, { reducerPath, }) {
      if (action.type == HYDRATE)
        return action.payload[reducerPath]
  },
  endpoints(build) {
    return {
      login: build.mutation<any, {username: string, password: string}>({
        query: ({username, password}) => {
          return {
            url: '/login',
            method: 'POST',
            body: {
              username,
              password
            }
          }
        },
      }),
      logout: build.mutation<any, void>({
        query: () => {
          return {
            url: '/',
            method: 'DELETE',
          }
        }
      }),
      fetchUser: build.query<any, void>({
        query: () => {
          const authToken = localStorage.getItem('authToken');
          return {
            url: '/',
            method: 'GET',
            withCredentials: true,
            headers: {
              ...(authToken && {Authorization: `Bearer ${authToken}`})
            }
          }
        }
      }),
    }
  },
});

export const { useLoginMutation, useLogoutMutation, useFetchUserQuery } = authApi;
export { authApi };
