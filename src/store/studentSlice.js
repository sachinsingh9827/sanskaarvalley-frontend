import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    students: [],
    selectedClass: null,
    attendance: {},
};

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        setStudents(state, action) {
            state.students = action.payload;
        },
        setSelectedClass(state, action) {
            state.selectedClass = action.payload;
        },
        markAttendance(state, action) {
            const { studentId, status } = action.payload;
            state.attendance[studentId] = status;
        },
    },
});

export const { setStudents, setSelectedClass, markAttendance } = studentSlice.actions;
export default studentSlice.reducer;
