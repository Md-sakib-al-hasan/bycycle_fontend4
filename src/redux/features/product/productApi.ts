
import { TQueryParam } from "../../../types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addproduct: builder.mutation({
            query: (userInfo) => ({
              url: '/product/create-product',
              method: 'POST',
              body: userInfo,
            }),
            invalidatesTags:['Product'] 
          }),
        getSingleProduct: builder.query({
            query: (userInfo) => ({
              url: '/product/getSingleProduct',
              method: 'PATCH',
              body: userInfo,
            }),
          }),
          getAllProduct: builder.query({
                  query: (args) => {
                    const params = new URLSearchParams();
                    if (args) {
                      args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                      });
                    }
                    return {
                      url: '/product/getAllProduct',
                      method: 'GET',
                      params:params
                    };
                  },
                  providesTags:['Product']
                }),
      
    }),
  });
  
  export const {useAddproductMutation,useGetSingleProductQuery,useGetAllProductQuery } = productApi;