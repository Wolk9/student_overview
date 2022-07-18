import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Willy Wonka",
    age: 30,
    gender: "male",
  },
  {
    id: 2,
    name: "Elisabeth Hurley",
    age: 30,
    gender: "female",
  },
];

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent(state, action) {
      //
    },
    editStudent(state, action) {
      //
    },
  },
});

export const { addStudent, editStudent } = studentSlice.actions;
export default studentSlice.reducer;
