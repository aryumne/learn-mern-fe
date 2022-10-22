import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState, useContext } from "react";
import AlertDialog from "../../../component/AlertDialog";
import BoxSection from '../../../component/BoxSection';
import Input from "../../../component/Input";
import LoadButton from "../../../component/LoadButton";
import { UseForm } from "../../../utils/UseForm";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../../utils/Validators";
import ValidationError from "../../../utils/ValidationError";
import { AuthCtx } from "../../../configs/context/AuthContext";

const AddBlog = () => {
  const auth = useContext(AuthCtx);
  const InputFocus = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const InitializeForm = {
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    }
  }

  const [formState, handleOnInput] = UseForm(InitializeForm, false);

  useEffect(() => {
    InputFocus.current.focus();
  }, []);

  const handleOnClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token'
        },
        body: JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          author: auth.userId
        })
      });
      const result = await response.json();
      if (!response.ok) {
        if (response.status === 422) {
          setIsComplete(false);
          if (result.errors?.slug) {
            throw new ValidationError("Ups..! Title is already exist!");
          } else {
            throw new ValidationError('Try again later!');
          }
        }
      }
      setDialogMessage(result.message);
      setOpenDialog(true);
      setIsComplete(true);
    } catch (e) {
      setDialogMessage(e.message);
      setOpenDialog(true);
    }
    setIsLoading(false);
  }

  const handleOnOpen = useCallback((comple) => () => {
    setOpenDialog(false);
    comple && window.location.reload();
  }, []);

  return (
    <BoxSection>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <AlertDialog openHandler={handleOnOpen} open={openDialog} complete={isComplete} message={dialogMessage} />
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
            validators={[VALIDATOR_REQUIRE('Title'), VALIDATOR_MINLENGTH(5)]}
            onInput={handleOnInput}
          />
          <Input
            label='description'
            id='description'
            typeInput='text'
            validators={[VALIDATOR_REQUIRE('description')]}
            onInput={handleOnInput}
          />
          <LoadButton clickHandler={handleOnClick} loading={isLoading} disable={!formState.isValidForm} />
          {/* <Button variant="contained" fullWidth disabled={!formState.isValidForm} >Save</Button> */}
        </Paper>
      </Box>
    </BoxSection>
  );
};

export default AddBlog;
