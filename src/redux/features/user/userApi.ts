import { TQueryParam } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      adduser: builder.mutation({
        query: (userInfo) => ({
          url: '/users/create-user',
          method: 'POST',
          body: userInfo,
        }), 
      }),
      getSingleuser: builder.query({
        query: (userInfo) => ({
          url: '/users/singleUser',
          method: 'POST',
          body: userInfo,
        }),
        providesTags:['User'],
      }),
      updateUser: builder.mutation({
        query: (userInfo) => ({
          url: '/users/update-user', 
          method: 'PUT',
          body: userInfo,
        }),
        invalidatesTags:['User'],
      }),
      changepassword: builder.mutation({
        query: (userInfo) => ({
          url: '/auth/change-password', 
          method: 'POST',
          body: userInfo,
        }),
        invalidatesTags: ["User"],
      }),
      getTodayorder: builder.query({
        query: () => {
         
          return {
            url: '/order/todayAllorder',
            method: 'GET',
          };
        },
        providesTags:['Order']
      }),
      getAllUser: builder.query({
        query: (args) => {
          const params = new URLSearchParams();
          if (args) {
            args.forEach((item: TQueryParam) => {
              params.append(item.name, item.value as string);
            });
          }
          return {
            url: '/users/alluser',
            method: 'GET',
            params:params
          };
        },
        providesTags:['Product']
      }),
      getAllWhiteList: builder.query({
        query: (args) => {
          const params = new URLSearchParams();
          if (args) {
            args.forEach((item: TQueryParam) => {
              params.append(item.name, item.value as string);
            });
          }
          return {
            url: '/whitelist/allwhitelist',
            method: 'GET',
            params:params
          };
        },
        providesTags:['WhiteList']
      }),
      addWhitelsit: builder.mutation({
        query: (product) => {
          
          return {
            url: '/whitelist/add-whitelist',
            method: 'post',
            body:product
          };
        },
        invalidatesTags:['WhiteList']
      }),
      getAllSaleDetials: builder.query({
        query: (args) => {
          const params = new URLSearchParams();
          if (args) {
            args.forEach((item: TQueryParam) => {
              params.append(item.name, item.value as string);
            });
          }
          return {
            url: '/salesDetails/sales',
            method: 'GET',
            params:params
          };
        },
        
      }),
  
      
    }),
  });
  
  export const { useAddWhitelsitMutation,useAdduserMutation,useGetSingleuserQuery,useUpdateUserMutation,useChangepasswordMutation
    ,useGetAllWhiteListQuery,useGetAllUserQuery,useGetTodayorderQuery,useGetAllSaleDetialsQuery } = userApi;