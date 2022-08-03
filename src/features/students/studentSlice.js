import { createSlice, nanoid } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "students",
  initialState: [],
  reducers: {
    addStudent: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (action) => {
        const id = nanoid();
        action.id = id;
        return { payload: action };
      },
    },
    editStudent(state, action) {
      const id = action.id;
      //const studentToEdit = state.find((s) => s.id === id);
      const editedThings = {
        ...state,
        action,
      };
      return state.map((student) =>
        student.id !== id ? student : editedThings
      );
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
