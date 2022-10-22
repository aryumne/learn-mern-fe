import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            // ambil id input setiap inputan seperti title, description ,dll
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    // jika input yang dilakukan perubahan sama dengan inputID maka compare hasil isvalid inputID dengan isvalid form
                    formIsValid = formIsValid && action.isValid;
                } else {
                    // untuk inputan yang belum ada action atau perubahan tetap dilakukan compare dengan mengambil langsung dari statenya.
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            // kembalikan nilai state(initializeform) yang terbaru setelah perubahan input dilakukan.
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.val,
                        isValid: action.isValid
                    }
                },
                isValidForm: formIsValid
            }
        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValidForm: action.formIsValid
            }
        default:
            return state;
    }
}

export const UseForm = (InitializeFormInput, InitializeFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: InitializeFormInput,
        isValidForm: InitializeFormValidity
    });

    const handleOnInput = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            inputId: id,
            val: value,
            isValid: isValid
        });
    }, []);

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formIsValid: formValidity
        })
    }, []);

    return [formState, handleOnInput, setFormData];
};