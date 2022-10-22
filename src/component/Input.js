import React, { useEffect, useReducer } from "react";
import { Validate } from "../utils/Validators";
import TextField from "@mui/material/TextField";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';

const InputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            const validated = Validate(action.val, action.validators);
            return {
                ...state,
                value: action.val,
                isValid: validated.isValid,
                msg: validated.msg
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            };
        case 'SHOW-PASSWORD':
            return {
                ...state,
                showPassword: action.val
            }
        default:
            return state;
    }
}

const Input = props => {
    const { id, typeInput, label, onInput, validators, isRef, value, valid } = props;
    const InitializeState = {
        value: value || '',
        isValid: valid || false,
        isTouched: false,
        showPassword: false,
        msg: '',
    };
    const [inputState, dispatch] = useReducer(InputReducer, InitializeState);



    useEffect(() => {
        onInput(id, inputState.value, inputState.isValid)
    }, [id, onInput, inputState.value, inputState.isValid]);


    const handleOnChange = event => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: validators
        })
    };
    const handleOnBlur = () => {
        dispatch({ type: 'TOUCH' })
    };

    const handleClickShowPassword = () => {
        dispatch({
            type: 'SHOW-PASSWORD',
            val: !inputState.showPassword
        })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            {(() => {
                switch (typeInput) {
                    case 'text':
                        return (
                            <TextField
                                inputRef={isRef}
                                fullWidth
                                id={id}
                                label={label}
                                error={!inputState.isValid && inputState.isTouched ? true : false
                                }
                                onBlur={handleOnBlur}
                                onChange={handleOnChange}
                                onFocus={handleOnChange}
                                helperText={!inputState.isValid && inputState.isTouched ? inputState.msg : ''}
                                value={inputState.value}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                        );
                    case 'password':
                        return (
                            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                <InputLabel htmlFor={id} error={!inputState.isValid && inputState.isTouched ? true : false
                                }>Password</InputLabel>
                                <OutlinedInput
                                    id={id}
                                    type={inputState.showPassword ? 'text' : 'password'}
                                    value={inputState.value}
                                    error={!inputState.isValid && inputState.isTouched ? true : false
                                    }
                                    onChange={handleOnChange}
                                    onBlur={handleOnBlur}
                                    onFocus={handleOnChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {inputState.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label={label}
                                />
                                <FormHelperText id={id} error>
                                    {!inputState.isValid && inputState.isTouched ? inputState.msg : ''}
                                </FormHelperText>
                            </FormControl>
                        );
                    case 'textarea':
                        return (
                            <TextField
                                inputRef={isRef}
                                fullWidth
                                multiline
                                id={id}
                                label={label}
                                rows={4}
                                error={!inputState.isValid && inputState.isTouched ? true : false}
                                onBlur={handleOnBlur}
                                onChange={handleOnChange}
                                onFocus={handleOnChange}
                                helperText={!inputState.isValid && inputState.isTouched ? inputState.msg : ''}
                                value={inputState.value}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                        );
                    default:
                        return '';
                };
            })()}
        </>
    );
};

export default Input;