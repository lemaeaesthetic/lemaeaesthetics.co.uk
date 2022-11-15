import { Form } from "components/Form/Form.component";
import { render, screen } from "utils";
import { fireEvent } from "@testing-library/react";

const CHILD_IDS = ["child1", "child2"];
const TEST_ID = "Form";
const ON_SUBMIT = jest.fn();
const FORM_COMPONENT = (
  <Form data-testid={TEST_ID} submitHandler={ON_SUBMIT}>
    <span data-testid={CHILD_IDS[0]}></span>
    <span data-testid={CHILD_IDS[1]}></span>
  </Form>
);

const setupTest = () => {
  const utils = render(FORM_COMPONENT);
  const form = utils.getByTestId(TEST_ID) as HTMLFormElement;
  return { form, utils };
};

describe("<Form />", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("will render in the dom", () => {
    const { form } = setupTest();
    expect(form).toBeInTheDocument();
  });

  it("will render child components", () => {
    const { utils } = setupTest();
    const child1 = utils.getByTestId(CHILD_IDS[0]);
    const child2 = utils.getByTestId(CHILD_IDS[1]);
    expect(child1).toBeInTheDocument();
    expect(child2).toBeInTheDocument();
    expect(child1.closest(`[data-testid="${TEST_ID}"]`)).toBeDefined();
    expect(child2.closest(`[data-testid="${TEST_ID}"]`)).toBeDefined();
  });

  it("will execute the onsubmit callback if one is provided", () => {
    const { form } = setupTest();
    fireEvent.submit(form);
    expect(ON_SUBMIT).toHaveBeenCalledTimes(1);
  });
});
