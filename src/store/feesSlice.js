import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feesDetails: [],
    selectedStudent: null,
};

const feesSlice = createSlice({
    name: 'fees',
    initialState,
    reducers: {
        setFeesDetails(state, action) {
            state.feesDetails = action.payload;
        },
        setSelectedStudent(state, action) {
            state.selectedStudent = action.payload;
        },
    },
});

export const { setFeesDetails, setSelectedStudent } = feesSlice.actions;
export default feesSlice.reducer;
