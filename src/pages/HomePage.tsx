import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPosts } from "../reducers/posts";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { fetchUsers } from "../reducers/users";
import { fetchComments } from "../reducers/comments";
import PostBox from "../components/post";
import { Post } from "../types/postsType";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

const Loading = () => {
  return (
    <Stack spacing={4}>
      <Skeleton animation="wave" variant="rounded" height={100} />
      <Skeleton animation="wave" variant="rounded" height={100} />
      <Skeleton animation="wave" variant="rounded" height={100} />
    </Stack>
  );
};

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
    dispatch(fetchComments());
    setLoading(false);
  }, [dispatch]);

  const users = useAppSelector((state) => state.usersReducer);
  const comments = useAppSelector((state) => state.commentsReducer);
  const posts = useAppSelector((state) => state.postsReducer);
  
  const getAuthor = (post: Post) => {
    const user = users.filter((x) => x.id == post.userId);
    const comAmount = comments.filter((x) => x.postId == post.id).length;
    return <PostBox post={post} author={user[0]} commentsAmount={comAmount} />;
  };
  return (
    <div>
    {loading ? (
        <Loading />
      ) : (<>
      <Typography
        variant="h2"
        sx={{ color: "#1976D2", textAlign: "center", py: 2 }}
      >
        All Posts
      </Typography>
      <Grid container spacing={3} sx={{ px: 8 }}>
        {posts.map((item) => (
          <Grid item xs={3} key={item.id} className="elementWrapper">
            {getAuthor(item)}
          </Grid>
        ))}
      </Grid></>)}
    </div>
  );
};

export default HomePage;
