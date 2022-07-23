import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "courses",
  initialState: [],
  reducers: {
    setCourses: {
      reducer: (state, action) => {
        return action.payload;
      },
      prepare: (action) => {
        return { payload: action };
      },
    },
  },
});

export const { setCourses } = courseSlice.actions;
export default courseSlice.reducer;
