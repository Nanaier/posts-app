import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { fetchUsers } from "../reducers/users";
import { fetchPosts } from "../reducers/posts";
import { User } from "../types/usersType";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
const UserBox = (props: { user: User; postsAmount: number }) => {
  return (
    <>
      <Card sx={{ minWidth: 275, maxWidth:300}}>
        <CardContent>
          <Typography noWrap variant="subtitle1" pb={1}>
            {props.user.name}
          </Typography>

          <Typography color="text.secondary">{props.user.username}</Typography>
          <Typography color="text.secondary">{props.user.email}</Typography>
          <Typography color="text.secondary">{props.user.phone}</Typography>
          <Typography color="text.secondary">{props.user.website}</Typography>
        </CardContent>
        <CardActions>
          <NavLink to={`/user/${props.user.id}`} className="linkToPost">
            <Typography color="#1976D2" className="linkToPost">{`${props.postsAmount} posts`}</Typography>
          </NavLink>
        </CardActions>
      </Card>
    </>
  );
};

export default UserBox;
