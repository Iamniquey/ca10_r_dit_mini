import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const urlToFetch = "https://www.reddit.com/r/SmallYTChannel.json";
  const response = await fetch(urlToFetch);
  const jsonObject = await response.json();
  console.log(jsonObject);
  return jsonObject;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: {},
    isLoadingPosts: false,
    failedToLoadPosts: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoadingPosts = false;
        state.failedToLoadPosts = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state) => {
        state.isLoadingPosts = false;
        state.failedToLoadPosts = true;
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoadingPosts = true;
        state.failedToLoadPosts = false;
      });
  },
});

export default postsSlice.reducer;

export const selectPosts = (state) => state.posts.posts;
