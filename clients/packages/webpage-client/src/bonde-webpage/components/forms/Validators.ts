// Validate for redux-form
// https://redux-form.com/7.4.2/docs/api/field.md/#-code-validate-value-allvalues-props-name-gt-error-code-optional-

const isEmail = (message: string) => (value: any) => {
  // eslint-disable-next-line
  const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return !regexEmail.test(value) ? message : undefined;
};

const required = (message: string) => (value: any) =>
  !value ? message : undefined;

const min = (size: number, message: string) => (value: any) =>
  value && value.length < size ? message : undefined;

const max = (size: number, message: string) => (value: any) =>
  value && value.length > size ? message : undefined;

const composeValidators = (...validators: any) => (value: any) =>
  validators.reduce(
    (error: any, validator: any) => error || validator(value),
    undefined
  );

// Regex to validate phone numver in E.164 format
// Validating only BRA phone numbers for now
const regexPhoneE164 = /^\+\d{12,13}$/;

const isValidPhoneE164 = ({ code, invalid }: { code: string; invalid: string }) =>
  (value: string) => {
    value = value.replace("(", "").replace(")", "").replace("-", "").split(" ").join("")

    const phoneE164 = /^\+/.test(value) ? value : `+${value}`;
    const message = [11, 12].includes(phoneE164.length) ? code : invalid;
    return regexPhoneE164.test(phoneE164) ? undefined : message;
  };

export default {
  isEmail,
  required,
  min,
  max,
  isValidPhoneE164,
  composeValidators,
};
