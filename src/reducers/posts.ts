import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Post } from "../types/postsType";


const initialState: Post[] = [];

export const fetchPosts = createAsyncThunk("fetchPosts", async () => {
  const data = fetch("https://jsonplaceholder.typicode.com/posts")
    .then((data) => data.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err);
    });

  return data;
});

const postsSlice = createSlice({
    name: "postsSlice",
    initialState,
    reducers: {
    //   sortByPrice: (state, action) => {
    //     if (action.payload === "asc") {
    //       state.sort((a, b) => (a.price > b.price ? 1 : -1));
    //     } else {
    //       state.sort((a, b) => (a.price < b.price ? 1 : -1));
    //     }
    //   },
      sortById: (state) => {
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
      },
    },
    extraReducers: (build) => {
      build.addCase(fetchPosts.fulfilled, (state, action) => {
        return action.payload;
      });
    },
  });
  
  const postsReducer = postsSlice.reducer;
  export const { sortById } = postsSlice.actions;
  export default postsReducer;