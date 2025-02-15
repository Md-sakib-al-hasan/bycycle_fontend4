import {
  createApi,
  BaseQueryFn,
  BaseQueryApi,
  FetchArgs,
  DefinitionType,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout, setUser } from '../features/auth/authSlice';
import { toast } from 'sonner';
import { TErrorResponse } from '../../types';



const baseQuery = fetchBaseQuery({
  baseUrl:`${import.meta.env.VITE_SERVERDOMAIN}/api/v1`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
// eslint-disable-next-line @typescript-eslint/no-explicit-any
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
   console.log(result);
  if (result?.error?.status) {
    const error = result.error as FetchBaseQueryError;
          const errordata = error.data as TErrorResponse
    toast.error(errordata.message);
  }
  if (result?.error?.status === 404) {
    const error = result.error as FetchBaseQueryError;
          const errordata = error.data as TErrorResponse
    toast.error(errordata.message);
  }
  if (result?.error?.status === 403) {
    const error = result.error as FetchBaseQueryError;
    const errordata = error.data as TErrorResponse
      toast.error(errordata.message);
  }
  if (result?.error?.status === 401) {
    //* Send Refresh
    const res = await fetch( `${import.meta.env.VITE_SERVERDOMAIN}/api/v1/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery:baseQueryWithRefreshToken,
  tagTypes: ['User','Login','Order','WhiteList','Product'],
  endpoints: () => ({}),
});
