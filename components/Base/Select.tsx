import { useSelect } from "hooks/useSelect";
import React, { forwardRef } from "react";
import styles from "./Select.module.scss"; // Add scss module

interface SelectProps {
  className?: string;
  style?: React.CSSProperties;
  id: string;
  testId?: string;
  children: React.ReactNode;
  label?: string;
  changeCallback?: any;
  defaultValue?: string;
  value?: string;
  allowDefaultSelection?: boolean;
  name: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const {
    testId,
    className,
    id,
    style,
    children,
    label,
    changeCallback,
    value,
    defaultValue,
    name,
    allowDefaultSelection,
  } = props;

  const { isDirty, isValid, handleBlur, handleChange } = useSelect(
    value || defaultValue || "",
    allowDefaultSelection
  );
  // Change styles.Select
  const classes = `${className ? `${className} ` : ""}${styles.wrapper}`;

  const changeHandler: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    handleChange(event);
    if (typeof changeCallback === "function") {
      changeCallback(event);
    }
  };

  // Alter render method
  return (
    <div data-testid={testId} style={style} className={classes}>
      {label ? (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      ) : null}
      <select
        ref={ref}
        className={styles.select}
        id={id}
        onChange={changeHandler}
        value={value}
        data-valid={!isDirty ? true : isValid}
        onBlur={handleBlur}
        name={name}
        onFocus={(event) => event?.currentTarget.removeAttribute("data-valid")}
      >
        {children}
      </select>
    </div>
  );
});

Select.defaultProps = {
  className: undefined,
  style: undefined,
  testId: undefined,
  label: undefined,
  changeCallback: undefined,
  defaultValue: undefined,
  value: undefined,
  allowDefaultSelection: false,
};

export { Select };
