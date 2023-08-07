import { Button } from "components/Base/Button";
import { Container } from "components/Base/Container";
import { DateInput } from "components/Base/DateInput";
import { Heading } from "components/Base/Heading";
import { Input } from "components/Base/Input";
import { Paragraph } from "components/Base/Paragraph";
import { Select } from "components/Base/Select";
import React, { RefObject, useRef, useState } from "react";
import { useAppSelector } from "services/redux/hooks";
import { selectTreatments } from "services/redux/treatmentsSlice";
import styles from "./BookingForm.module.scss"; // Add scss module

interface BookingFormProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
}

const validateField = (
  value: string,
  validation: string,
  fieldName: string
) => {
  switch (validation) {
    case "date":
      return {
        value,
        fieldName,
        isValid:
          new Date(Number(value)).getTime() >= new Date().setHours(0, 0, 0, 0),
      };
    case "alpha":
      return { value, fieldName, isValid: /^[a-z ]+$/i.test(value) };
    case "number":
      return { value, fieldName, isValid: /^[0-9]+$/.test(value) };
    case "text":
      return {
        value,
        fieldName,
        isValid: /^[\w\d\s()_/?!.,"'&%£$@+*-]+$/.test(value),
      };
    case "email":
      return {
        value,
        fieldName,
        isValid: /^\w[\w.-]*@([\w-]+\.)+[\w-]+$/.test(value),
      };
    default:
      return { value, fieldName, isValid: /^[\w\d\s()]+$/.test(value) };
  }
};

const validateForm = (formData: FormData) => {
  const date: FieldValue = [formData.get("date"), "date", "date"];
  const name: FieldValue = [formData.get("name"), "alpha", "name"];
  const phone: FieldValue = [formData.get("phone"), "number", "phone"];
  const email: FieldValue = [formData.get("email"), "email", "email"];
  const treatment: FieldValue = [
    formData.get("treatment"),
    "text",
    "treatment",
  ];
  return [date, name, phone, email, treatment].map((field) => {
    const [value, type, fieldName] = field;
    if (fieldName === "treatment" && value === "N/A")
      return { isValid: false, fieldName, value };
    return validateField(`${value}`, type, fieldName);
  });
};

type FieldValue = [FormDataEntryValue | null, string, string];

type Message = {
  heading: string;
  content: string;
};

const BookingForm: React.FC<BookingFormProps> = ({
  testId,
  className,
  id,
  style,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<Message | undefined>();
  const classes = `${className ? `${className} ` : ""}${styles.wrapper}`;
  const treatments = useAppSelector(selectTreatments());
  const nameInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const dateInput = useRef<HTMLInputElement>(null);
  const treatmentSelect = useRef<HTMLSelectElement>(null);
  const underlayRef = useRef<HTMLSpanElement | undefined>();

  const handleLoader = (override?: boolean) => {
    underlayRef.current?.setAttribute(
      "aria-hidden",
      `${typeof override !== "undefined" ? override : !isLoading}`
    );
    setIsLoading(typeof override !== "undefined" ? override : !isLoading);
  };

  const handleSubmission: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    handleLoader();
    const formData = new FormData(event.currentTarget);
    const validation = validateForm(formData);
    const errors = validation.filter((obj) => !obj.isValid);
    if (errors.length > 0) {
      errors.forEach((error) => {
        if (error.fieldName === "phone" && phoneInput?.current) {
          phoneInput.current.dataset.valid = "false";
        }
        if (error.fieldName === "name" && nameInput?.current) {
          nameInput.current.dataset.valid = "false";
        }
        if (error.fieldName === "email" && emailInput?.current) {
          emailInput.current.dataset.valid = "false";
        }
        if (error.fieldName === "date" && dateInput?.current) {
          dateInput.current.dataset.valid = "false";
        }
        if (error.fieldName === "treatment" && treatmentSelect?.current) {
          treatmentSelect.current.dataset.valid = "false";
        }
      });
      setMessage({
        heading: "Please check your data",
        content:
          "It looks like you may have incorrectly filled in the form. Please check the fields outlined in red and resubmit.",
      });
    } else {
      try {
        const body = validation.reduce((output: any, current) => {
          const clone = { ...output };
          clone[current.fieldName] = current.value;
          return clone;
        }, {});
        const req = await fetch("/api/v1/book", {
          method: "POST",
          body: JSON.stringify(body),
        });
        const res = await req.json();
        if (res.success) {
          setMessage({
            heading: "Booking sent",
            content:
              "Your booking has been sent and we will do our utmost to be in touch with you ASAP.",
          });
        } else {
          setMessage({
            heading: "Something went wrong",
            content:
              "Something seems to have gone wrong with your request. Please visit our contact page and give us a call.",
          });
        }
      } catch (e) {
        setMessage({
          heading: "Something went wrong",
          content:
            "Something seems to have gone wrong with your request. Please visit our contact page and give us a call.",
        });
      }
    }
    setTimeout(() => {
      handleLoader(false);
    }, 1000);
  };
  // Alter render method
  return (
    <Container data-testid={testId} style={style} className={classes} id={id}>
      <span
        className={styles.underlay}
        ref={underlayRef as RefObject<HTMLSpanElement>}
        aria-hidden={!isLoading && typeof message === "undefined"}
      />
      <div
        className={styles.message}
        aria-hidden={
          !(message && message.content.length > 0 && message.heading.length > 0)
        }
      >
        <Heading level={4} content={message?.heading || ""} />

        <Paragraph>{message?.content || ""}</Paragraph>
        <Button onClick={() => setMessage(undefined)} type="button">
          Close
        </Button>
      </div>
      <form onSubmit={handleSubmission}>
        <div className={styles["input-row"]}>
          <Input
            ref={nameInput}
            name="name"
            id="name"
            type="alpha"
            label="Name"
          />
          <Input
            ref={phoneInput}
            id="phone"
            type="number"
            label="Phone"
            name="phone"
            minLength={9}
            maxLength={13}
          />
        </div>
        <div className={styles["input-row"]}>
          <Input
            ref={emailInput}
            id="email"
            name="email"
            type="email"
            label="Email"
          />
          <Select
            id="treatment"
            label="Treatment"
            name="treatment"
            ref={treatmentSelect}
          >
            <option value="N/A">Select Treatment</option>
            {treatments.map((treatment) => (
              <option
                key={Math.random().toString(36).substring(2, 9)}
                value={treatment.slug}
              >
                {treatment.name}
              </option>
            ))}
          </Select>
        </div>
        <div className={styles["input-row"]}>
          <DateInput ref={dateInput} />
        </div>
        <div className={styles["input-row"]}>
          <Button type="submit" label="Submit" onClick={() => {}} />
        </div>
      </form>
    </Container>
  );
};

BookingForm.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { BookingForm };
