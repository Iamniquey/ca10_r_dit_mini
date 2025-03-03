import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/Posts/postsSlice.js";
import currentPostReducer from "../features/CurrentPost/currentPostSlice.js";
import commentsReducer from "../features/Comments/commentsSlice.js";
import searchReducer from "../features/Search/searchSlice.js";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    currentPost: currentPostReducer,
    comments: commentsReducer,
    search: searchReducer,
  },
});
