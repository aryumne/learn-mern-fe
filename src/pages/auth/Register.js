import React, { useState, useEffect, useRef, useContext } from 'react';
import Box from '@mui/material/Box';
import FormPaper from '../../component/FormPaper';
import Input from '../../component/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/Validators';
import LoadButton from '../../component/LoadButton';
import { UseForm } from '../../utils/UseForm';
import ValidationError from '../../utils/ValidationError';
import { AuthCtx } from '../../configs/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const auth = useContext(AuthCtx);
    const navigate = useNavigate();
    const InputFocus = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const InitializeForm = {
        name: {
            value: '',
            isvalid: false
        },
        email: {
            value: '',
            isvalid: false
        },
        password: {
            value: '',
            isValid: false
        }
    };
    const [formState, handleOnInput] = UseForm(InitializeForm, false);
    useEffect(() => {
        InputFocus.current.focus();
    }, []);

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formState.inputs.name.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                })
            })
            const result = await response.json();
            if (!response.ok) {
                if (response.status === 422) {
                    if (result.errors?.slug) {
                        throw new ValidationError("Ups..! Title is already exist!");
                    } else {
                        throw new ValidationError('Try again later!');
                    }
                }
            }
            auth.login(result.uid, result.token);
            navigate('/', { replace: true });
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'primary.light' }}>
            <FormPaper title='Sign Up'>
                <Input
                    isRef={InputFocus}
                    label='Name'
                    id='name'
                    typeInput='text'
                    validators={[VALIDATOR_REQUIRE('Name')]}
                    onInput={handleOnInput}
                />
                <Input
                    label='Email'
                    id='email'
                    typeInput='text'
                    validators={[VALIDATOR_REQUIRE('Email'), VALIDATOR_EMAIL()]}
                    onInput={handleOnInput}
                />
                <Input
                    label='Password'
                    id='password'
                    typeInput='password'
                    validators={[VALIDATOR_REQUIRE('Password'), VALIDATOR_MINLENGTH(6)]}
                    onInput={handleOnInput}
                />
                <LoadButton clickHandler={handleOnSubmit} loading={isLoading} disable={!formState.isValidForm} />
                <Box sx={{ mt: 2 }}>
                    <Link to="/login" replace={true}>Already have an account?</Link>
                </Box>
            </FormPaper>
        </Box>
    )
}



export default Register