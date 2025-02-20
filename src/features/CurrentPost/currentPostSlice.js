import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { trackApiCallAllowance } from "../../data/util";

export const getPostPage = createAsyncThunk(
  "currentPost/getPostPage",
  async (url) => {
    if (trackApiCallAllowance()) {
      try {
        const urlToFetch = `${url}.json`;
        const response = await fetch(urlToFetch);

        const json = await response.json();

        return json;
      } catch (e) {
        console.log("Error in getPostPage: ", e);
      }
    } else {
      console.log("Rate limit exceeded in getPostPage. Try again later.");
      return null;
    }
  }
);

const currentPostSlice = createSlice({
  name: "currentPost",
  initialState: {
    post: {},
    postPage: {},
    isLoadingPostPage: false,
    failedToLoadPostPage: false,
  },
  reducers: {
    addCurrentPost: (state, action) => {
      state.post = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostPage.fulfilled, (state, action) => {
        state.isLoadingPostPage = false;
        state.failedToLoadPostPage = false;
        state.postPage = action.payload;
      })
      .addCase(getPostPage.pending, (state) => {
        state.isLoadingPostPage = true;
        state.failedToLoadPostPage = false;
      })
      .addCase(getPostPage.rejected, (state) => {
        state.isLoadingPostPage = false;
        state.failedToLoadPostPage = true;
        console.log(
          "Error in currentPostSlice: Post page data not retreieved!"
        );
      });
  },
});

export default currentPostSlice.reducer;

export const { addCurrentPost } = currentPostSlice.actions;

export const selectPost = (state) => state.currentPost.post;
export const selectPostPage = (state) => state.currentPost.postPage;
export const isLoadingPostPage = (state) => state.currentPost.isLoadingPostPage;
