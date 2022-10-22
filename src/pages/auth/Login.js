import React, { useState, useEffect, useRef, useContext } from 'react';
import Box from '@mui/material/Box';
import FormPaper from '../../component/FormPaper';
import Input from '../../component/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/Validators';
import LoadButton from '../../component/LoadButton';
import { UseForm } from '../../utils/UseForm';
import ValidationError from '../../utils/ValidationError';
import { AuthCtx } from '../../configs/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
    const auth = useContext(AuthCtx);
    const InputFocus = useRef();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const InitializeForm = {
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
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
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
            <FormPaper title='Sign In'>
                <Input
                    isRef={InputFocus}
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
                    <Link to="/register" replace={true}>Don't have an account?</Link>
                </Box>
            </FormPaper>
        </Box>
    )
}



export default Login