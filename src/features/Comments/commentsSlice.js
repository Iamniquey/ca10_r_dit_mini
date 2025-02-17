import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: {},
  },
  reducers: {
    getComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export default commentsSlice.reducer;

export const selectComments = (state) => state.comments.comments;

export const { getComments } = commentsSlice.actions;
