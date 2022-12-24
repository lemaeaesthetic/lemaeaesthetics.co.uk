import { render, screen } from "utils/testing.util";
import { ListItem } from "components/Base/ListItem";

const ID = "component";
const CLASS = "component";
const STYLE = { background: "red" };
const TEST_ID = "test-id";

describe("<ListItem />", () => {
  it("will render the correct attributes", () => {
    const { baseElement } = render(
      <ListItem id={ID} testId={TEST_ID} style={STYLE} className={CLASS}>
        <p>Hey</p>
      </ListItem>
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
      <ListItem id={ID} testId={TEST_ID} style={STYLE} className={CLASS}>
        <p>Hey</p>
      </ListItem>
    );

    const child = screen.getByText("Hey");
    expect(child).toBeInTheDocument();
    expect(child.tagName).toBe("P");
  });
});
