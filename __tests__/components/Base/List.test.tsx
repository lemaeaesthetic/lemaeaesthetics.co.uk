import { render, screen } from "utils/testing.util";
import { List } from "components/Base/List";

const ID = "component";
const CLASS = "component";
const STYLE = { background: "red" };
const TEST_ID = "test-id";

describe("<List />", () => {
  it("will render the correct attributes", () => {
    const { baseElement } = render(
      <List id={ID} testId={TEST_ID} style={STYLE} className={CLASS}>
        <li>Hey</li>
      </List>
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
      <List id={ID} testId={TEST_ID} style={STYLE} className={CLASS}>
        <li>Hey</li>
      </List>
    );

    const child = screen.getByText("Hey");
    expect(child).toBeInTheDocument();
    expect(child.tagName).toBe("LI");
  });
});
