import { Typography, Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import BoxSection from '../../../component/BoxSection';
import Blogs from "../../../configs/dummies/Blogs";
import ImageView from "../../../component/ImageView";

const DetailBlog = () => {
  const { slug } = useParams();

  const Blog = Blogs.find(b => (b.slug === slug));
  return (
    <BoxSection>
      <Box sx={{ display: 'flex', flexDirection: 'column', py: 2 }}>
        <Typography variant="h5" fontWeight={600} textAlign="left">{Blog.title}</Typography>
        <Typography variant="body2" textAlign="left">Oleh {Blog.author}, {Blog.created_at}</Typography>
        <ImageView image="https://picsum.photos/1920/1080" />
        <Typography variant="subtitle1" textAlign="justify">{Blog.description}</Typography>
      </Box>
    </BoxSection>
  )
};

export default DetailBlog;
