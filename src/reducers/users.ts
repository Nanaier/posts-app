import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types/usersType";


const initialState: User[] = [];

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const data = fetch("https://jsonplaceholder.typicode.com/users")
    .then((data) => data.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err);
    });

  return data;
});

const usersSlice = createSlice({
    name: "usersSlice",
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
      build.addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload;
      });
    },
  });
  
  const usersReducer = usersSlice.reducer;
  export const { sortById } = usersSlice.actions;
  export default usersReducer;