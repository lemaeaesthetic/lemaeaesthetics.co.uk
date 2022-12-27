import { ChangeEvent, ChangeEventHandler, useState } from "react";

export const inputTypes = [
  "text",
  "email",
  "number",
  "alpha",
  "alphanumerical",
] as const;
export type InputType = typeof inputTypes[number];

export type InputOptions = {
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
};

const TEXT_REGEX = /^[\w\d\s,()./*%$@£!_&-]+$/;
const EMAIL_REGEX =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const NUMBER_REGEX = /^[.,\d-]+$/;

const validate = <T,>(
  type: string,
  value: T,
  options?: InputOptions
): boolean => {
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
    if (options?.min && value < options.min) {
      valid = false;
    }
    if (options?.max && value > options.max) {
      valid = false;
    }
  }
  if (options?.maxLength && `${value}`.length > options?.maxLength) {
    valid = false;
  }
  if (options?.minLength && `${value}`.length < options?.minLength) {
    valid = false;
  }
  return valid;
};

const useInput = <T,>(
  type: InputType,
  defaultValue: T,
  value?: T,
  options?: InputOptions
) => {
  const [internalValue, setInternalValue] = useState<T>(value || defaultValue);
  const [isValid, setIsValid] = useState<boolean>();
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const handleInput: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.currentTarget.value as T;
    setInternalValue(newValue);
    if (!isDirty) {
      setIsDirty(true);
    }
    if (validate<T>(type, newValue, options)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleBlur = () => {
    if (validate<T>(type, internalValue, options)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return { handleInput, handleBlur, value: internalValue, isValid, isDirty };
};

export { useInput };
