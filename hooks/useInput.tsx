import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { InputType } from "types/data.type";

const TEXT_REGEX = /^[\w\d\s,()./*%$@£!_&-]+$/;
const EMAIL_REGEX =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const NUMBER_REGEX = /^[.,\d-]+$/;

const validate = <T,>(type: string, value: T): boolean => {
  let valid = false;
  if (type === "text") {
    valid = TEXT_REGEX.test(`${value}`);
  }
  if (type === "alpha") {
    valid = /^[a-zA-Z ]+$/.test(`${value}`);
  }
  if (type === "alphanumerical") {
    valid = /^[a-zA-Z 0-9]+$/.test(`${value}`);
  }
  if (type === "email") {
    valid = EMAIL_REGEX.test(`${value}`);
  }
  if (type === "number") {
    valid = NUMBER_REGEX.test(`${value}`);
  }
  return valid;
};

const useInput = <T,>(type: InputType, defaultValue: T) => {
  const [value, setValue] = useState<T>(defaultValue);
  const [isValid, setIsValid] = useState<boolean>();

  const handleInput: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.currentTarget.value as T;
    setValue(newValue);
    if (validate<T>(type, newValue)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleBlur = () => {
    if (validate<T>(type, value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return { handleInput, handleBlur, value, isValid };
};

export { useInput };
