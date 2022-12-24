import { render, screen } from "utils/testing.util";
import { Picture } from "components/Base/Picture";

const ID = "component";
const CLASS = "component";
const STYLE = { background: "red" };
const TEST_ID = "test-id";
const SRC = "/src.jpg";
const ALT = "Alt";
const WIDTH = 100;
const HEIGHT = 100;

const setupTest = () => {
  return render(
    <Picture
      id={ID}
      testId={TEST_ID}
      style={STYLE}
      className={CLASS}
      src={SRC}
      alt={ALT}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};

describe("<Picture />", () => {
  it("will render the correct attributes", () => {
    const { baseElement } = setupTest();
    const byTestId = screen.getByTestId(TEST_ID);
    const byId = baseElement.querySelector<HTMLElement>(`#${ID}`);
    const byClass = baseElement.querySelector<HTMLElement>(`.${CLASS}`);
    const byAlt = baseElement.querySelector<HTMLElement>(`[alt="${ALT}"]`);
    expect(byTestId.style.getPropertyValue("background")).toBe(
      STYLE.background
    );
    [byId, byClass, byAlt].forEach((element) =>
      expect(element).toBeInTheDocument()
    );
  });
});
