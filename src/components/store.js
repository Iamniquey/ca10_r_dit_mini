import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/Posts/postsSlice.js';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
    }
}); 