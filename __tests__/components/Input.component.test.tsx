import { Input } from "components/Input/Input.component";
import { render } from "utils";
import { fireEvent } from "@testing-library/react";
import { useInput } from "hooks/useInput.hook";

// IDs
const TEST_ID_1 = "input-1";
const TEST_ID_2 = "input-2";
const TEST_ID_3 = "input-3";

// Values
const INITIAL_VALUE_TEXT = "Hello";
const INITIAL_VALUE_NUMBER = "69";
const INITIAL_VALUE_EMAIL = "hello@hello.com";
const UPDATED_VALUE_TEXT = "Goodbye";
const UPDATED_VALUE_NUMBER = "169";
const UPDATED_VALUE_EMAIL = "hey@gmail.com";
const INVALID_TEXT = "hello {}";
const INVALID_NUMBER = "{}";
const INVALID_EMAIL = "this is not an email";
const INVALID_TEXT_UPDATED = "hello {} 123123";
const INVALID_NUMBER_UPDATED = "{} 123123";
const INVALID_EMAIL_UPDATED = "this is not an email 123123";

// Types
const TEXT = "text";
const NUMBER = "number";
const EMAIL = "email";

// Mock useInput methods
const MockHandleInput = jest.fn();
const MockValidateInput = jest.fn();

// Mock useInput returns
const MOCK_RETURN_VALID_EMAIL = {
  isValid: true,
  value: INITIAL_VALUE_EMAIL,
  handleInput: MockHandleInput,
  validateInput: MockValidateInput,
};
const MOCK_RETURN_VALID_TEXT = {
  isValid: true,
  value: INITIAL_VALUE_TEXT,
  handleInput: MockHandleInput,
  validateInput: MockValidateInput,
};
const MOCK_RETURN_VALID_NUMBER = {
  isValid: true,
  value: INITIAL_VALUE_NUMBER,
  handleInput: MockHandleInput,
  validateInput: MockValidateInput,
};
const MOCK_RETURN_INVALID_EMAIL = {
  isValid: false,
  value: INVALID_EMAIL,
  handleInput: MockHandleInput,
  validateInput: MockValidateInput,
};
const MOCK_RETURN_INVALID_TEXT = {
  isValid: false,
  value: INVALID_TEXT,
  handleInput: MockHandleInput,
  validateInput: MockValidateInput,
};
const MOCK_RETURN_INVALID_NUMBER = {
  isValid: false,
  value: INVALID_NUMBER,
  handleInput: MockHandleInput,
  validateInput: MockValidateInput,
};

// Render elements
const INPUT_COMPONENT_TEXT = (
  <Input
    type={TEXT}
    initialValue={INITIAL_VALUE_TEXT}
    data-testid={TEST_ID_1}
  />
);
const INPUT_COMPONENT_NUMBER = (
  <Input
    type={NUMBER}
    initialValue={INITIAL_VALUE_NUMBER}
    data-testid={TEST_ID_2}
  />
);
const INPUT_COMPONENT_EMAIL = (
  <Input
    type={EMAIL}
    initialValue={INITIAL_VALUE_EMAIL}
    data-testid={TEST_ID_3}
  />
);

const setupTest = (type: "number" | "text" | "email", valid: boolean) => {
  if (type === "text") {
    MockUseInput.mockReturnValueOnce(
      valid ? MOCK_RETURN_VALID_TEXT : MOCK_RETURN_INVALID_TEXT
    );
    const utils = render(INPUT_COMPONENT_TEXT);
    return { input: utils.getByTestId(TEST_ID_1) as HTMLInputElement, utils };
  } else if (type === "email") {
    MockUseInput.mockReturnValueOnce(
      valid ? MOCK_RETURN_VALID_EMAIL : MOCK_RETURN_INVALID_EMAIL
    );
    const utils = render(INPUT_COMPONENT_EMAIL);
    return { input: utils.getByTestId(TEST_ID_3) as HTMLInputElement, utils };
  } else {
    MockUseInput.mockReturnValueOnce(
      valid ? MOCK_RETURN_VALID_NUMBER : MOCK_RETURN_INVALID_NUMBER
    );
    const utils = render(INPUT_COMPONENT_NUMBER);
    return { input: utils.getByTestId(TEST_ID_2) as HTMLInputElement, utils };
  }
};

jest.mock("hooks/useInput.hook.tsx");

const MockUseInput = useInput as jest.Mock;

describe("<Input />", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it("will render in the dom", () => {
    const { utils } = setupTest("text", true);
    expect(utils.getByTestId(TEST_ID_1)).toBeInTheDocument();
  });

  it("will have the correct default value", () => {
    // Text
    const { input: inputText } = setupTest("text", true);
    expect(inputText.value).toBe(INITIAL_VALUE_TEXT);

    // Number
    const { input: inputNumber } = setupTest("number", true);
    expect(inputNumber.value).toBe(INITIAL_VALUE_NUMBER);

    // Email
    const { input: inputEmail } = setupTest("email", true);
    expect(inputEmail.value).toBe(INITIAL_VALUE_EMAIL);
  });

  it("will have the correct type", () => {
    const { input: textInput } = setupTest("text", true);
    const { input: numberInput } = setupTest("number", true);
    const { input: emailInput } = setupTest("email", true);

    expect(textInput.type).toBe(TEXT);
    expect(numberInput.type).toBe(NUMBER);
    expect(emailInput.type).toBe(EMAIL);
  });

  it("will call handleInput with the new value when onChange is fired", () => {
    const { input: inputText } = setupTest("text", true);
    const { input: inputNumber } = setupTest("number", true);
    const { input: inputEmail } = setupTest("email", true);

    // Text
    expect(inputText.value).toBe(INITIAL_VALUE_TEXT);
    expect(inputText.type).toBe(TEXT);
    fireEvent.change(inputText, { target: { value: UPDATED_VALUE_TEXT } });
    expect(MockHandleInput).toHaveBeenCalledTimes(1);
    expect(MockHandleInput).toHaveBeenCalledWith(UPDATED_VALUE_TEXT);

    // Number
    expect(inputNumber.value).toBe(INITIAL_VALUE_NUMBER);
    expect(inputNumber.type).toBe(NUMBER);
    fireEvent.change(inputNumber, { target: { value: UPDATED_VALUE_NUMBER } });
    expect(MockHandleInput).toHaveBeenCalledTimes(2);
    expect(MockHandleInput).toHaveBeenLastCalledWith(UPDATED_VALUE_NUMBER);

    // Email
    expect(inputEmail.value).toBe(INITIAL_VALUE_EMAIL);
    expect(inputEmail.type).toBe(EMAIL);
    fireEvent.change(inputEmail, { target: { value: UPDATED_VALUE_EMAIL } });
    expect(MockHandleInput).toHaveBeenCalledTimes(3);
    expect(MockHandleInput).toHaveBeenLastCalledWith(UPDATED_VALUE_EMAIL);
  });

  it("will have a data-valid attribute", () => {
    const { input: inputText } = setupTest("text", true);
    const { input: inputNumber } = setupTest("number", true);
    const { input: inputEmail } = setupTest("email", true);

    // Text
    expect(inputText.dataset.valid).toBeDefined();

    // Number
    expect(inputNumber.dataset.valid).toBeDefined();

    // Email
    expect(inputEmail.dataset.valid).toBeDefined();
  });

  it("will correctly have data-valid as true when the value returned from useInput is true", () => {
    const { input: inputText } = setupTest("text", true);
    const { input: inputNumber } = setupTest("number", true);
    const { input: inputEmail } = setupTest("email", true);

    // Text
    expect(inputText.dataset.valid).toBe("true");
    // Number
    expect(inputNumber.dataset.valid).toBe("true");
    // Email
    expect(inputEmail.dataset.valid).toBe("true");
  });

  it("will correctly have data-valid as false when the value returned from useInput is false", () => {
    const { input: inputText } = setupTest("text", false);
    const { input: inputNumber } = setupTest("number", false);
    const { input: inputEmail } = setupTest("email", false);

    // Text
    expect(inputText.dataset.valid).toBe("false");
    // Number
    expect(inputNumber.dataset.valid).toBe("false");
    // Email
    expect(inputEmail.dataset.valid).toBe("false");
  });
});
