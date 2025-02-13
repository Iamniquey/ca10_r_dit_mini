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
  },
  reducers: {
    // addPost: (state, action) => {
    //   state.posts = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export default postsSlice.reducer;

//export const { addPost } = postsSlice.actions;

export const selectPosts = (state) => state.posts.posts;
