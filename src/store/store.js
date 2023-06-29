import { configureStore } from "@reduxjs/toolkit";
import driversReducer from "./driverSlice"; 
import tripReducer from "./tripSlice";


const store = configureStore({
    reducer:{
        drivers: driversReducer,
        trips:tripReducer
    }
})


// export type RootState = ReturnType<typeof store.getState>;
export default store;