import { useInput, InputType } from "hooks/useInput";
import React, { forwardRef } from "react";
import styles from "components/Base/Input.module.scss";

interface InputProps {
  className?: string;
  style?: React.CSSProperties;
  id: string;
  type: InputType;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  testId?: string;
  label?: string;
  changeCallback?: any;
  max?: number;
  min?: number;
  minLength?: number;
  maxLength?: number;
  value?: string;
  name: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    changeCallback,
    testId,
    id,
    style,
    type,
    required,
    defaultValue,
    placeholder,
    label,
    name,
    max,
    min,
    maxLength,
    minLength,
    value,
  } = props;

  const options =
    min || max || maxLength || minLength
      ? { min, max, maxLength, minLength }
      : undefined;

  const {
    handleBlur,
    handleInput,
    value: internalValue,
    isValid,
    isDirty,
  } = useInput(type, defaultValue, value, options);

  const classes = `${className ? `${className} ` : ""}${styles.wrapper}`;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    handleInput(event);
    if (changeCallback && typeof changeCallback === "function") {
      changeCallback(event);
    }
  };

  return (
    <div className={classes}>
      {label ? (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      ) : null}
      <input
        name={name}
        id={id}
        data-testid={testId}
        ref={ref}
        style={style}
        className={styles.input}
        placeholder={placeholder}
        type={type}
        required={required}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={(event) => event?.currentTarget.removeAttribute("data-valid")}
        value={
          isDirty
            ? value || internalValue || ""
            : defaultValue || value || internalValue || ""
        }
        data-valid={isValid}
        max={max}
        min={min}
        maxLength={maxLength}
        minLength={minLength}
      />
    </div>
  );
});

Input.defaultProps = {
  className: undefined,
  style: undefined,
  placeholder: undefined,
  required: false,
  defaultValue: undefined,
  testId: undefined,
  label: undefined,
  changeCallback: undefined,
  min: undefined,
  max: undefined,
  minLength: undefined,
  maxLength: undefined,
  value: undefined,
};

export { Input };
