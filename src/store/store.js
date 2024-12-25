import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import studentReducer from './studentSlice';
import feesReducer from './feesSlice';
import teacherReducer from './teacherSlice'; 

const store = configureStore({
    reducer: {
        auth: authReducer,
        students: studentReducer,
        fees: feesReducer,
        teacher: teacherReducer,  
    },
});

export default store;
