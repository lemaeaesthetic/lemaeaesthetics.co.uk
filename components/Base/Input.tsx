import { useInput } from "hooks/useInput";
import React, { forwardRef } from "react";
import { InputType } from "types/data.type";

interface InputProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  type: InputType;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, id, style, type, required, defaultValue, placeholder } =
    props;
  const { handleBlur, handleInput, value, isValid } = useInput(
    type,
    defaultValue
  );
  return (
    <div>
      <input
        ref={ref}
        style={style}
        className={className}
        id={id}
        defaultValue={defaultValue}
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
};

export { Input };
