import { render, screen } from "utils/testing.util";
import { Section } from "components/Base/Section";

const ID = "component";
const CLASS = "component";
const STYLE = { background: "red" };
const TEST_ID = "test-id";

describe("<Section />", () => {
  it("will render the correct attributes", () => {
    const { baseElement } = render(
      <Section id={ID} testId={TEST_ID} style={STYLE} className={CLASS}>
        <div id="yo">Hey</div>
      </Section>
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
  it("will render children", () => {
    render(
      <Section id={ID} testId={TEST_ID} style={STYLE} className={CLASS}>
        <div data-testid="yo">Hey</div>
      </Section>
    );
    const child = screen.getByTestId("yo");
    expect(child).toBeInTheDocument();
  });
});
