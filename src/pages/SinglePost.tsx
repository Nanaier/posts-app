import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchComments } from "../reducers/comments";
import { fetchPosts } from "../reducers/posts";
import { fetchUsers } from "../reducers/users";
import { Post } from "../types/postsType";
import CommentIcon from '@mui/icons-material/Comment';
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

const SinglePost = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchComments());
    dispatch(fetchPosts());
  }, [dispatch]);
  const users = useAppSelector((state) => state.usersReducer);
  const comments = useAppSelector((state) => state.commentsReducer);
  const posts = useAppSelector((state) => state.postsReducer);
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
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

  useEffect(() => {
    const getPost = async () => {
      const responce = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      )
        .then((responce) => responce.json())
        .then((responce) => responce);
      setPost(responce);
      setLoading(false);
    };

    getPost();
  }, [id]);
  const getCommentsAmount = (post: Post) => {
      const comAmount = comments.filter((x) => x.postId == post.id).length;
      return comAmount
    };
   const getComments = (post: Post) => {
        const com = comments.filter((x) => x.postId == post.id);
        return com
      };
    const getUser = () =>{
        const user = users.find((x) => x.id == post!.userId);
        return user
    }
    const getPosts = () =>{
        const postsByUser = posts.filter((x) => x.userId == getUser()!.id);
        return postsByUser
    }
  // const getPostBox = () => {
  //     const amn = posts.filter((x) => x.userId == user!.id).length;
  //     return <UserBox user={user!} postsAmount={amn} />;
  // };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        <Box sx={{px: 5}}>
            <Card>
                <CardContent >
                <Typography  variant="h5" pb={1} color="#1976D2">
                    {post!.title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="text.secondary">
                    {post!.body}
                </Typography>
                </CardContent>
            </Card>
            <Box sx={{display: "flex", flexDirection: "row", py:4, justifyContent:"space-between"}}>
                <Typography variant='h4' sx={{color:"#1976D2"}}>Comments({getCommentsAmount(post!)})</Typography> 
                <Badge badgeContent={getCommentsAmount(post!)} color="primary">
                    <CommentIcon color="action" />
                </Badge>
            </Box>
            <Card>
            <CardContent>
            {getComments(post!).map((item) => (
                <Grid item xs={12} key={item.id} className="elementWrapper">
                    <Box sx={{display:"flex", flexDirection: "row"}}>
                        <Avatar alt= {item.name} src="/broken-image.jpg" sx={{m:3}}></Avatar>
                        <Divider orientation="vertical" flexItem/>
                        <Box sx={{display:"flex", flexDirection: "column"}}>
                            <Typography variant='h6' sx={{color:"#1976D2"}}>{item.name}</Typography> 
                            <Typography >{item.body}</Typography>
                        </Box>
                    </Box>

                </Grid>
            ))}
                
                
            </CardContent>

            </Card>

            <Box sx={{display: "flex", flexDirection: "row", py:4, justifyContent:"space-between"}}>
                <Typography variant='h4' sx={{color:"#1976D2"}}>Other posts by
                    <NavLink to={`/user/${id}`} className="linkToPost">
                    {getUser()?.name}
                    </NavLink>
                </Typography> 
            </Box>

            <Card sx={{px: 5}}>
                <CardContent>
                    {getPosts().map((item, index) => (
                    <Grid item xs={12} key={item.id} className="elementWrapper">
                        
                        <Card sx={{display:"flex", flexDirection: "row"}}>
                            <CardContent>
                                    <Typography variant='h6' >{index+1}. {item.title}</Typography> 
                                    <Typography >{item.body}</Typography>
                            </CardContent>
                            
                        </Card>

                    </Grid>
                    ))}
                </CardContent>
            </Card>
        </Box>
          
        </>
      )}
    </>
  );
};

export default SinglePost;
