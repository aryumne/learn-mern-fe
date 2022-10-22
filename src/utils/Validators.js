const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_NUMBER = 'NUMBER';
const VALIDATOR_TYPE_FILE = 'FILE';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';

export const VALIDATOR_REQUIRE = inputName => ({ type: VALIDATOR_TYPE_REQUIRE, msg: `${inputName} is required!` });
export const VALIDATOR_NUMBER = inputName => ({ type: VALIDATOR_TYPE_NUMBER, msg: `${inputName} must be a number!` });
export const VALIDATOR_FILE = inputName => ({ type: VALIDATOR_TYPE_FILE, msg: `${inputName} must be a file!` });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL, msg: 'must use unipa email: example@unipa.ac.id!' });
export const VALIDATOR_MINLENGTH = val => ({
    type: VALIDATOR_TYPE_MINLENGTH,
    length: val,
    msg: `Please enter a valid value, at least ${val} characters!`
});
export const VALIDATOR_MAXLENGTH = val => ({
    type: VALIDATOR_TYPE_MAXLENGTH,
    length: val,
    msg: `Maximal ${val} digits!`
});
export const VALIDATOR_MIN = val => ({
    type: VALIDATOR_TYPE_MIN,
    min: val,
    msg: `Minimal value is ${val}!`
});
export const VALIDATOR_MAX = val => ({
    type: VALIDATOR_TYPE_MAX,
    max: val,
    msg: `Maximal value is ${val}!`
});
export const Validate = (val, validators) => {
    let result = {
        isValid: true,
        msg: '',
    };
    for (const validator of validators) {
        switch (validator.type) {
            case VALIDATOR_TYPE_REQUIRE:
                result.isValid = result.isValid && val.trim().length > 0;
                result.msg = !result.isValid && validator.msg;
                break;
            case VALIDATOR_TYPE_NUMBER:
                result.isValid = result.isValid && Number.isInteger(val);
                result.msg = !result.isValid && validator.msg;
                break;
            case VALIDATOR_TYPE_EMAIL:
                result.isValid = result.isValid && /^\S+@unipa.ac.id+$/.test(val);
                result.msg = !result.isValid && validator.msg;
                break;
            case VALIDATOR_TYPE_MINLENGTH:
                result.isValid = result.isValid && val.trim().length >= validator.length;
                result.msg = !result.isValid && validator.msg;
                break;
            case VALIDATOR_TYPE_MAXLENGTH:
                result.isValid = result.isValid && val.trim().length <= validator.length;
                result.msg = !result.isValid && validator.msg;
                break;
            case VALIDATOR_TYPE_MIN:
                result.isValid = result.isValid && +val >= validator.min;
                result.msg = !result.isValid && validator.msg;
                break;
            case VALIDATOR_TYPE_MAX:
                result.isValid = result.isValid && +val <= validator.max;
                result.msg = !result.isValid && validator.msg;
                break;
            default:
                result.isValid = false;
                break;
        }
    }
    return result;
}

