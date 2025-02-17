import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPostPage = createAsyncThunk(
  "currentPost/getPostPage",
  async (url) => {
    const urlToFetch = `${url}.json`;
    const response = await fetch(urlToFetch);
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  }
);

const currentPostSlice = createSlice({
  name: "currentPost",
  initialState: {
    post: {},
    postPage: {},
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
