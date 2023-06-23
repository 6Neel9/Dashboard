import { createSlice } from "@reduxjs/toolkit"


const driverSlice = createSlice({
    name: "drivers",
    initialState: {
        data: [],
    },
    reducers: {
        setDrivers(state, action) {

            state.data = action.payload;
        }
    }
})

export const { setDrivers } = driverSlice.actions
export default driverSlice.reducer;


// Thunks

export function fetchDrivers() {
    return async function fetchProductThunk(dispatch, getState) {
        // const prop = getState()
        try {
            const res = await fetch('http://localhost:5000/yuja-sm/v1/drivers');
            const data = await res.json();
            dispatch(setDrivers(data));
        } catch (err) {
            console.log(err);
        }
    }
}