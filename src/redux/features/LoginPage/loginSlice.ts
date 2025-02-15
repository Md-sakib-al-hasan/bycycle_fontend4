import { createSlice, PayloadAction } from "@reduxjs/toolkit";


 const handleLoginShowreducer = createSlice({
    name:'loginpage',
    initialState:{login:false,signu:false,changepassword:false,aminchangePassword:false},
    reducers:{
        isLoginpageShow: (state,actions:PayloadAction<boolean>) => {
          state.login = actions.payload
        },
        isSignuppageShow: (state,actions:PayloadAction<boolean>) => {
          state.signu = actions.payload
        },
        isChangepasswordShow:(state,actions:PayloadAction<boolean>) => {
          state.changepassword = actions.payload
        },
        isChangepasswordShowadmin:(state,actions:PayloadAction<boolean>) => {
          state.aminchangePassword = actions.payload
        },
    }
})

export const {isLoginpageShow,isSignuppageShow,isChangepasswordShow,isChangepasswordShowadmin} = handleLoginShowreducer.actions ;


export default handleLoginShowreducer.reducer;