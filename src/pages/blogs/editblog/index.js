import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import BoxSection from '../../../component/BoxSection';
import Input from "../../../component/Input";
import Blogs from "../../../configs/dummies/Blogs";
import { UseForm } from "../../../utils/UseForm";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../../utils/Validators";



const EditBlog = () => {
  const { slug } = useParams();
  const InputFocus = useRef();
  useEffect(() => {
    InputFocus.current.focus();
  }, []);
  const [formState, handleOnInput, setFormData] = UseForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    }
  },
    false
  );
  const Blog = Blogs.find(b => (b.slug === slug));

  useEffect(() => {
    if (!Blog) {
      setFormData(
        {
          title: {
            value: Blog.title,
            isValid: true
          },
          description: {
            value: Blog.description,
            isValid: true
          }
        },
        true
      )
    }
  })


  return (
    <BoxSection>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ width: 700, textAlign: 'center', bgcolor: '#f5f5f5', p: 3 }}>
          <Divider textAlign="center" sx={{ mb: 4 }}>
            <Typography variant="h5" textTransform="uppercase" fontWeight={500}>
              New Blog
            </Typography>
          </Divider>
          <Input
            isRef={InputFocus}
            label='Title'
            id='title'
            typeInput='text'
            value={Blog.title}
            valid={true}
            validators={[VALIDATOR_REQUIRE('Title'), VALIDATOR_MINLENGTH(5)]}
            onInput={handleOnInput}
          />
          <Input
            label='description'
            id='description'
            typeInput='text'
            value={Blog.description}
            validators={[VALIDATOR_REQUIRE('description')]}
            onInput={handleOnInput}
            valid={true}
          />
          <Button variant="contained" fullWidth disabled={!formState.isValidForm} >Save</Button>
        </Paper>
      </Box>
    </BoxSection>
  );
};

export default EditBlog;
