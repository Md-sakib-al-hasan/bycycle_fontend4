
import { TQueryParam } from "../../../types";
import { baseApi } from "../../api/baseApi";

const OrderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTodAllPrice: builder.query({
            query: () => ({
              url: '/order/gettodayallprice',
              method: 'GET',
            }),
            providesTags:['Order'] 
          }),
          addorder: builder.mutation({
            query: (orderinfo) => ({
              url: '/order/create-roder',
              method: 'POST',
              body: orderinfo,
            }), 
            invalidatesTags:['Order']
          }), 
          getAllOrder: builder.query({
            query: (args) => {
              const params = new URLSearchParams();
              if (args) {
                args.forEach((item: TQueryParam) => {
                  params.append(item.name, item.value as string);
                });
              }
              return {
                url: '/order/getAllorder',
                method: 'GET',
                params:params
              };
            },
            providesTags:['Order']
          }),
      
    }),
  });
  
  export const {useGetTodAllPriceQuery,useAddorderMutation,useGetAllOrderQuery } = OrderApi;