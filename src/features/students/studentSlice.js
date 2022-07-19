import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const generateId = () => {
  return uuidv4;
};

const studentSlice = createSlice({
  name: "students",
  initialState: [],
  reducers: {
    addStudent(state, action) {
      const content = action.payload;
      state.push({
        content,
        // id: generateId(),
      });
    },
    editStudent(state, action) {
      //
    },
    appendStudent(state, action) {
      state.push(action.payload);
    },
    setStudents(state, action) {
      return action.payload;
    },
  },
});

export const { addStudent, editStudent, appendStudent, setStudents } =
  studentSlice.actions;
export default studentSlice.reducer;
