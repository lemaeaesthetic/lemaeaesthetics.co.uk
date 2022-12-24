import { render, screen } from "utils/testing.util";
import { Anchor } from "components/Base/Anchor";

const ID = "component";
const CLASS = "component";
const STYLE = { background: "red" };
const TEST_ID = "test-id";
const HREF = "http://localhost/something";
const TITLE = "title";
const LABEL = "Link";

describe("<Anchor />", () => {
  it("will render the correct attributes", () => {
    const { baseElement } = render(
      <Anchor
        id={ID}
        testId={TEST_ID}
        style={STYLE}
        className={CLASS}
        title={TITLE}
        href={HREF}
        label={LABEL}
      />
    );
    const byTestId = screen.getByTestId<HTMLAnchorElement>(TEST_ID);
    const byId = baseElement.querySelector<HTMLElement>(`#${ID}`);
    const byClass = baseElement.querySelector<HTMLElement>(`.${CLASS}`);
    const byLabel = screen.getByText(LABEL);
    [byTestId, byClass, byId, byLabel].forEach((item) =>
      expect(item).toBeInTheDocument()
    );
    expect(byTestId.style.getPropertyValue("background")).toBe(
      STYLE.background
    );
    expect(byTestId.href).toBe(HREF);
  });
});
