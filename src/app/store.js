import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import studentSlice from '../features/students/studentSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    students: studentSlice
  },
});
