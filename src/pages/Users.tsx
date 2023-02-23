import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {NavLink} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import { fetchUsers } from "../reducers/users";
import { fetchPosts } from "../reducers/posts";
import { User } from "../types/usersType";
import UserBox from "../components/user";
import Typography from "@mui/material/Typography";
const Users = () => {
    
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(fetchUsers());
      dispatch(fetchPosts())
    }, [dispatch]);
    // useEffect(() =>{getPostAmount()}, []);
    const users = useAppSelector((state) => state.usersReducer);
    const posts = useAppSelector((state) => state.postsReducer);
    const getUserBox = (user:User) =>{
        const amn = posts.filter(x => x.userId==user.id).length;
        return (
            <UserBox user = {user} postsAmount = {amn}/>
        )
    }
    return(
    <div>
        <Typography variant='h2' sx={{color:"#1976D2", textAlign:"center", py:2}}>All Users</Typography>
        <Grid
        container
        spacing={3}
        sx={{ px: 8}}
      >
        {users.map((item) => (
          <Grid item xs={3} key={item.id} className="elementWrapper">              
                {getUserBox(item)}

          </Grid>
        ))}
      </Grid>
    </div>
        
    );
};

export default Users;