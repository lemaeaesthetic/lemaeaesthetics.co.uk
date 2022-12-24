import { render, screen } from "utils/testing.util";
import { Paragraph } from "components/Base/Paragraph";

const ID = "component";
const CLASS = "component";
const STYLE = { background: "red" };
const TEST_ID = "test-id";

describe("<Paragraph />", () => {
  it("will render the correct attributes", () => {
    const { baseElement } = render(
      <Paragraph id={ID} testId={TEST_ID} style={STYLE} className={CLASS}>
        <span>Hey</span>
      </Paragraph>
    );
    const byTestId = screen.getByTestId(TEST_ID);
    const byId = baseElement.querySelector<HTMLElement>(`#${ID}`);
    const byClass = baseElement.querySelector<HTMLElement>(`.${CLASS}`);
    expect(byTestId.style.getPropertyValue("background")).toBe(
      STYLE.background
    );
    [byTestId, byId, byClass].forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it("will render the correct content", () => {
    render(
      <Paragraph id={ID} testId={TEST_ID} style={STYLE} className={CLASS}>
        <span>Hey</span>
      </Paragraph>
    );

    const child = screen.getByText("Hey");
    expect(child).toBeInTheDocument();
    expect(child.tagName).toBe("SPAN");
  });
});
