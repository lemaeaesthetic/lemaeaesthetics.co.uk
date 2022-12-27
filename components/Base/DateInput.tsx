import React, { forwardRef, useState } from "react";
import styles from "./DateInput.module.scss"; // Add scss module
import { Input } from "./Input";
import { Select } from "./Select";

interface DateInputProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
}

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

const validateDate = (day: any, month: any, year: any, setter: any) => {
  const date = new Date(Number(year), Number(month), Number(day));
  setter(date.getTime() >= TODAY.getTime());
};

const DateInput = forwardRef<HTMLInputElement, DateInputProps>((props, ref) => {
  const { testId, className, id, style } = props;
  const [year, setYear] = useState(`${TODAY.getFullYear()}`);
  const [day, setDay] = useState(`${TODAY.getDate()}`);
  const [month, setMonth] = useState(`${TODAY.getMonth()}`);
  const [isValid, setIsValid] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Change styles.DateInput
  const classes = `${className ? `${className} ` : ""}${styles.wrapper}`;
  // Alter render method
  const handleDayChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (!isDirty) setIsDirty(true);
    setDay(event.currentTarget.value);
    validateDate(event.currentTarget.value, month, year, setIsValid);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isDirty) setIsDirty(true);
    setYear(event.currentTarget.value);
    validateDate(day, month, event.currentTarget.value, setIsValid);

    // Reset the month if the user selects current year and the
    // selected month has passed
    if (
      event.currentTarget.value === `${TODAY.getFullYear()}` &&
      Number(month) < TODAY.getMonth() - 1
    ) {
      setMonth(`${TODAY.getMonth()}`);
    }
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isDirty) setIsDirty(true);
    setMonth(event.currentTarget.value);
    const daysInMonth = new Date(
      Number(year),
      Number(event.currentTarget.value) + 1,
      0
    );
    if (Number(day) > daysInMonth.getDate()) {
      setDay(`${daysInMonth.getDate()}`);
    }
    validateDate(day, event.currentTarget.value, year, setIsValid);
  };

  return (
    <div
      data-valid={isDirty ? isValid : undefined}
      data-dirty={isDirty}
      data-testid={testId}
      style={style}
      className={classes}
      id={id}
    >
      <input
        ref={ref}
        hidden
        name="date"
        onChange={() => {}}
        value={`${new Date(
          Number(year),
          Number(month),
          Number(day)
        ).getTime()}`}
      />
      <span>Select Date</span>
      <Input
        name="day"
        type="number"
        id="day-select"
        value={day}
        changeCallback={handleDayChange}
        max={new Date(Number(year), Number(month) + 1, 0).getDate()}
        min={Number(month) === TODAY.getMonth() ? TODAY.getDate() : 1}
      />
      <Select
        name="month"
        id="month-select"
        value={month}
        changeCallback={handleMonthChange}
        allowDefaultSelection
      >
        {[...Array(12)].map((_month, i) => (
          <option
            value={i}
            disabled={Number(year) === TODAY.getFullYear() && i < Number(month)}
            key={Math.random().toString(36).substring(2, 9)}
          >
            {new Date(TODAY.getFullYear(), i, 1).toLocaleDateString("en-GB", {
              month: "short",
            })}
          </option>
        ))}
      </Select>
      <Select
        name="year"
        id="year-select"
        changeCallback={handleYearChange}
        value={year}
        allowDefaultSelection
      >
        <option value={TODAY.getFullYear()}>{TODAY.getFullYear()}</option>
        <option value={TODAY.getFullYear() + 1}>
          {TODAY.getFullYear() + 1}
        </option>
      </Select>
    </div>
  );
});

DateInput.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { DateInput };
