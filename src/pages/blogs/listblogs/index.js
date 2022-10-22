import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoxSection from "../../../component/BoxSection";
import ItemBlog from "./ItemBlog";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import LoadingBlogs from "./LoadingBlogs";

const ListBlogs = () => {
  const { uid } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs');
        const result = await response.json();
        if (!response.ok) {
          console.log(result);
          throw new Error('Failed to get data, try again later!');
        }
        console.log(result);
        setBlogs(result.data);
      } catch (e) {
        console.log(e.message);
      }
      setIsloading(false);
    }
    getBlogs();
  }, []);

  if (isLoading) {
    return (
      <BoxSection>
        <Grid container spacing={1} rowSpacing={2}>
          <LoadingBlogs />
        </Grid>
      </BoxSection>
    )
  }

  if (uid) {
    const blogsUser = blogs.filter(b => b.author === uid);
    if (blogsUser.length !== 0) {
      return (
        <BoxSection>
          <Grid container spacing={1}>
            {
              blogsUser.map((item) => (
                <Grid item key={item.id} lg={4} xs={12} md={6}>
                  <ItemBlog blog={item} />
                </Grid>
              ))
            }
          </Grid>
        </BoxSection>
      );
    }
    return (
      <BoxSection>
        <Typography variant='subtitle1'>
          Nothing data entry
        </Typography>
      </BoxSection>
    );
  } else {
    if (blogs.length !== 0) {
      return (
        <BoxSection>
          <Grid container spacing={1}>
            {
              blogs.map((item) => (
                <Grid item key={item.id} lg={4} xs={12} md={6}>
                  <ItemBlog blog={item} />
                </Grid>
              ))
            }
          </Grid>
        </BoxSection>
      );
    }
    return (
      <BoxSection>
        <Typography variant='subtitle1'>
          Nothing data entry
        </Typography>
      </BoxSection>
    );
  }
};

export default ListBlogs;


