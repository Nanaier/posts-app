import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Comment } from "../types/commentsType";


const initialState: Comment[] = [];

export const fetchComments = createAsyncThunk("fetchComments", async () => {
  const data = fetch("https://jsonplaceholder.typicode.com/comments")
    .then((data) => data.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err);
    });

  return data;
});

const commentsSlice = createSlice({
    name: "commentsSlice",
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
      build.addCase(fetchComments.fulfilled, (state, action) => {
        return action.payload;
      });
    },
  });
  
  const commentsReducer = commentsSlice.reducer;
  export const { sortById } = commentsSlice.actions;
  export default commentsReducer;