import { createSlice } from "@reduxjs/toolkit";

const assignmentSlice = createSlice({
  name: "assignments",
  initialState: [],
  reducers: {
    setAssignments: {
      reducer: (state, action) => {
        return action.payload;
      },
      prepare: (action) => {
        return { payload: action };
      },
    },
  },
});

export const { setAssignments } = assignmentSlice.actions;
export default assignmentSlice.reducer;
