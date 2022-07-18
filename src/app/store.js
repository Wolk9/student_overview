import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "../features/students/studentSlice";
import uiSlice from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    students: studentSlice,
  },
});
