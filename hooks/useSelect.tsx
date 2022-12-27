import { ChangeEvent, ChangeEventHandler, useState } from "react";

const useSelect = (defaultValue: string, allowDefault?: boolean) => {
  const [value, setValue] = useState<string>(defaultValue);
  const [isValid, setIsValid] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange: ChangeEventHandler = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setValue(event.currentTarget.value);
    if (event.currentTarget.value === defaultValue && !allowDefault) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    if (!isDirty) {
      setIsDirty(true);
    }
  };

  const handleBlur = () => {
    if (
      isDirty &&
      value &&
      defaultValue &&
      value === defaultValue &&
      !allowDefault
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  return {
    value,
    isValid,
    isDirty,
    setIsValid,
    handleBlur,
    handleChange,
  };
};

export { useSelect };
