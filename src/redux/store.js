import { configureStore } from "@reduxjs/toolkit";
import treeReducer from "./slices/tree";

export const store = configureStore({
  reducer: {
    tree: treeReducer,
  },
});
