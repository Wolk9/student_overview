import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        name: "Willy Wonka",
        age: 30,
        gender: "male"
    },
    {
        name: "Elisabeth Hurley",
        age: 30,
        gender: "female"
    }

]

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        addStudent(state, action) {
    //
        },
    },
    
});

export const { addStudent } = studentSlice.actions;
export default studentSlice.reducer