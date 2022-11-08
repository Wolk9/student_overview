import { createSlice, nanoid } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "students",
  initialState: [],
  reducers: {
    addStudent(state, action) {
      console.log("Lets add a student");
      state.push(action.payload);
    },

    editStudent(state, action) {
      console.log(action.payload, action.payload.id);
      const id = action.payload.id;
      const payload = action.payload;
      const result = state.map((student) =>
        student.id !== id ? student : payload
      );
      // // console.log(result);
      return result;
    },
    setStudents: {
      reducer: (state, action) => {
        return action.payload;
      },
      prepare: (action) => {
        return { payload: action };
      },
    },
  },
});

export const { addStudent, editStudent, setStudents } = studentSlice.actions;
export default studentSlice.reducer;
