import { useInput, InputType } from "hooks/useInput";
import React, { forwardRef } from "react";

interface InputProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  type: InputType;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  testId?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    testId,
    id,
    style,
    type,
    required,
    defaultValue,
    placeholder,
  } = props;
  const { handleBlur, handleInput, value, isValid } = useInput(
    type,
    defaultValue
  );
  return (
    <div>
      <input
        data-testid={testId}
        ref={ref}
        style={style}
        className={className}
        id={id}
        placeholder={placeholder}
        type={type}
        required={required}
        onChange={handleInput}
        onBlur={handleBlur}
        value={value || defaultValue}
        data-valid={isValid}
      />
    </div>
  );
});

Input.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  placeholder: "Enter text",
  required: false,
  defaultValue: "some val",
  testId: undefined,
};

export { Input };
