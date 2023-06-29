import { createSlice } from "@reduxjs/toolkit"


const tripSlice = createSlice({
    name: "drivers",
    initialState: {
        data: [],
    },
    reducers: {
        setTrip(state, action) {

            state.data = action.payload;
        }
    }
})

export const { setTrip } = tripSlice.actions
export default tripSlice.reducer;


// Thunks

export function fetchTrips() {
    return async function fetchProductThunk(dispatch, getState) {
        // const prop = getState()
        try {
            const res = await fetch('http://localhost:5000/yuja-sm/v1/trips');
            const data = await res.json();
            dispatch(setTrip(data));
        } catch (err) {
            console.log(err);
        }
    }
}