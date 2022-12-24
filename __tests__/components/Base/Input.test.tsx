import { fireEvent, render, screen } from "utils/testing.util";
import { Input, InputType } from "components/Base/Input";

const ID = "input";
const CLASS = "input";
const STYLE = { background: "red" };
const TEST_ID = "input-test";
const TYPE: InputType = "text";
const DEFAULT_VALUE = "Default";
const NEW_VALUE = "New";
const BAD_VALUE = "{}}";

describe("<Input />", () => {
  it("will render the correct attributes", () => {
    const { baseElement } = render(
      <Input
        id={ID}
        testId={TEST_ID}
        style={STYLE}
        className={CLASS}
        type={TYPE}
      />
    );
    const byTestId = screen.getByTestId<HTMLInputElement>(TEST_ID);
    const byId = baseElement.querySelector<HTMLInputElement>(`#${ID}`);
    const byClass = baseElement.querySelector<HTMLInputElement>(`.${CLASS}`);
    [byTestId, byClass, byId].forEach((element) =>
      expect(element).toBeInTheDocument()
    );
    expect(byTestId.type);
    expect(byTestId.style.getPropertyValue("background")).toBe(
      STYLE.background
    );
  });
  it("will render the correct default value and update", () => {
    render(
      <Input
        id={ID}
        testId={TEST_ID}
        style={STYLE}
        className={CLASS}
        type={TYPE}
        defaultValue={DEFAULT_VALUE}
      />
    );
    const element = screen.getByTestId<HTMLInputElement>(TEST_ID);
    expect(element.value).toBe(DEFAULT_VALUE);
    fireEvent.change(element, { target: { value: NEW_VALUE } });
    expect(element.value).toBe(NEW_VALUE);
  });

  it("will correctly update the data-valid attribute", () => {
    render(
      <Input
        id={ID}
        testId={TEST_ID}
        style={STYLE}
        className={CLASS}
        type={TYPE}
        defaultValue={DEFAULT_VALUE}
      />
    );
    const element = screen.getByTestId<HTMLInputElement>(TEST_ID);
    expect(element.value).toBe(DEFAULT_VALUE);
    fireEvent.change(element, { target: { value: BAD_VALUE } });
    fireEvent.blur(element);
    expect(element.dataset.valid).toBe("false");
    fireEvent.change(element, { target: { value: NEW_VALUE } });
    fireEvent.blur(element);
    expect(element.dataset.valid).toBe("true");
  });
});
