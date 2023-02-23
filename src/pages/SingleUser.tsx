import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import PostBox from "../components/post";
import UserBox from "../components/user";
import { fetchComments } from "../reducers/comments";
import { fetchPosts } from "../reducers/posts";
import { Post } from "../types/postsType";
import { User } from "../types/usersType";

const SingleUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const Loading = () => {
    return (
      <Stack spacing={4}>
        <Skeleton animation="wave" variant="rounded" height={100} />
        <Skeleton animation="wave" variant="rounded" height={100} />
        <Skeleton animation="wave" variant="rounded" height={100} />
      </Stack>
    );
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchComments());
  }, [dispatch]);
  const posts = useAppSelector((state) => state.postsReducer);
  const comments = useAppSelector((state) => state.commentsReducer);

  const getUserBox = () => {
    const amn = posts.filter((x) => x.userId == user!.id).length;
    return <UserBox user={user!} postsAmount={amn} />;
  };

  const getAuthor = (post: Post) => {
    const comAmount = comments.filter((x) => x.postId == post.id).length;
    return <PostBox post={post} author={user!} commentsAmount={comAmount} />;
  };
  const getPosts = () => {
    const postsByUser = posts.filter((x) => x.userId == user!.id);
    return (
      <Grid container spacing={3} sx={{ px: 8 }}>
        {postsByUser.map((item) => (
          <Grid item xs={3} key={item.id} className="elementWrapper">
            {getAuthor(item)}
          </Grid>
        ))}
      </Grid>
    );
  };
  useEffect(() => {
    const getUser = async () => {
      const responce = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      )
        .then((responce) => responce.json())
        .then((responce) => responce);
      setUser(responce);
      setLoading(false);
    };

    getUser();
  }, [id]);

  return <>{loading ? <Loading /> : 
    <>
        
        <div className="userBox">{getUserBox()}</div>
        
        <Typography variant='h4' sx={{color:"#1976D2", textAlign:"center", py:2}}>Posts by 
            <NavLink to={`/user/${id}`} className="linkToPost">
                {`${user!.name}`}
            </NavLink>
        </Typography>
        {getPosts()}
    </>}</>;
};

export default SingleUser;
