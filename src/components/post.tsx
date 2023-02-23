import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { User } from "../types/usersType";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Post } from "../types/postsType";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CommentIcon from '@mui/icons-material/Comment';
import CardActions from "@mui/material/CardActions";
import Badge from "@mui/material/Badge";
const PostBox = (props: {
  post: Post;
  author: User;
  commentsAmount: number;
}) => {
  return (
    <Box>
      <Card >
        <CardContent>
          <Typography noWrap variant="h5" pb={1} color="#1976D2">
            {props.post.title}
          </Typography>
          <Divider />
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              my: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "4",
              WebkitBoxOrient: "vertical",
            }}
          >
            {props.post.body}
          </Typography>
          <NavLink to={`/post/${props.post.id}`} className="linkToPost">
            <Typography color="#1976D2" className="linkToPost">Read more...</Typography>
            
          </NavLink>

          <Divider />
          <div className="commentAmount">
            
            <Badge badgeContent={props.commentsAmount} color="primary">
                <CommentIcon color="action" />
            </Badge>
          </div>
          
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostBox;
