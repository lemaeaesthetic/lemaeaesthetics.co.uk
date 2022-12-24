import { Button } from "components/Base/Button";
import { render, screen, fireEvent } from "utils/testing.util";

const ID = "button";
const CLASS = "button";
const STYLE = { background: "red" };
const LABEL = "Click me";
const TYPE_BUTTON = "button";
const ON_CLICK = jest.fn();

describe("<Button />", () => {
  it("will render with correct attributes", () => {
    const { baseElement } = render(
      <Button
        id={ID}
        label={LABEL}
        className={CLASS}
        style={STYLE}
        onClick={ON_CLICK}
        type={TYPE_BUTTON}
      />
    );
    const byClass = baseElement.querySelector(`.${CLASS}`);
    const byId = baseElement.querySelector(`#${ID}`);
    const byType = baseElement.querySelector(`[type="${TYPE_BUTTON}"]`);
    [byClass, byType, byId].forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    expect(
      (byClass as HTMLButtonElement).style.getPropertyValue("background")
    ).toBe(STYLE.background);
  });

  it("will correctly execute the callback passed as onClick when it is clicked", () => {
    const { baseElement } = render(
      <Button
        id={ID}
        label={LABEL}
        className={CLASS}
        style={STYLE}
        onClick={ON_CLICK}
        type={TYPE_BUTTON}
      />
    );
    const button = baseElement.querySelector<HTMLButtonElement>(`#${ID}`);
    button?.click();
    expect(ON_CLICK).toBeCalledTimes(1);
  });
});
