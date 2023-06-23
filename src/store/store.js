import { configureStore } from "@reduxjs/toolkit";
import driversReducer from "./driverSlice"; 


const store = configureStore({
    reducer:{
        drivers: driversReducer,
    }
})


// export type RootState = ReturnType<typeof store.getState>;
export default store;