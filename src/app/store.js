import { configureStore } from "@reduxjs/toolkit";
import studentSlice, { setStudents } from "../features/students/studentSlice";
import courseSlice, { setCourses } from "../features/courses/courseSlice";
import assignmentSlice, {
  setAssignments,
} from "../features/assignments/assignmentSlice";
import uiSlice from "../features/ui/uiSlice";
import dataService from "../services/dataService";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    students: studentSlice,
    courses: courseSlice,
    assignments: assignmentSlice,
  },
});

dataService
  .getAll("students")
  .then((records) => store.dispatch(setStudents(records.data)));

//TODO: assignmentService.getAllAssignments
dataService
  .getAll("courses")
  .then((records) => store.dispatch(setCourses(records.data)));
//TODO: coursesService.getAllCourses
dataService
  .getAll("assignments")
  .then((records) => store.dispatch(setAssignments(records.data)));
