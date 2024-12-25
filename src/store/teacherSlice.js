import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    classes: [],
    attendance: [],
    assignments: [],
};

const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        setClasses: (state, action) => {
            state.classes = action.payload;
        },
        markAttendance: (state, action) => {
            state.attendance.push(action.payload);
        },
        addAssignment: (state, action) => {
            state.assignments.push(action.payload);
        },
    },
});

export const { setClasses, markAttendance, addAssignment } = teacherSlice.actions;

export default teacherSlice.reducer;
