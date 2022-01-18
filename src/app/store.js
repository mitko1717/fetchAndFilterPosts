import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/list/slice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
