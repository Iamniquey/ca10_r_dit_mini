import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { trackApiCallAllowance } from "../../data/util";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  //check api call limit
  if (trackApiCallAllowance()) {
    const urlToFetch = "https://www.reddit.com/r/SmallYTChannel.json";
    try {
      const response = await fetch(urlToFetch);

      // return json object
      const jsonObject = await response.json();
      return jsonObject;
    } catch (e) {
      console.log("Error in getPosts: ", e);
    }
  } else {
    console.log("Rate limit exceeded in getPosts. Try again later.");
    return null;
  }
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

export const isLoadingPosts = (state) => state.posts.isLoadingPosts;

export const selectPosts = (state) => state.posts.posts;
