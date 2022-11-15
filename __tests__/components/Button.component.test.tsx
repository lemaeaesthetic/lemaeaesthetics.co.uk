import { Button } from "components/Button/Button.component";
import { render, screen } from "utils";

const TEST_ID = "button";
const CHILD_ELEMENT_IDS = ["Hey", "Yo"];
const ON_CLICK = jest.fn();

describe("<Button />", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("will render in the dom", () => {
    render(<Button data-testid={TEST_ID} />);
    expect(screen.getByTestId(TEST_ID));
  });

  it("will call the onclick callback function when the button is clicked", () => {
    render(<Button data-testid={TEST_ID} onClick={ON_CLICK} />);
    const button = screen.getByTestId(TEST_ID);
    button.click();
    expect(ON_CLICK).toBeCalledTimes(1);
  });

  it("will render the button's child elements", () => {
    render(
      <Button data-testid={TEST_ID} onClick={ON_CLICK}>
        <span data-testid={CHILD_ELEMENT_IDS[0]}>{CHILD_ELEMENT_IDS[0]}</span>
        <span data-testid={CHILD_ELEMENT_IDS[1]}>{CHILD_ELEMENT_IDS[1]}</span>
      </Button>
    );
    const button = screen.getByTestId(TEST_ID);
    const child1 = screen.getByTestId(CHILD_ELEMENT_IDS[0]);
    const child2 = screen.getByTestId(CHILD_ELEMENT_IDS[1]);

    expect(button).toBeInTheDocument();
    expect(child1).toBeInTheDocument();
    expect(child2).toBeInTheDocument();
    expect(child1.closest(`[data-testid="${TEST_ID}"]`)).toBeDefined();
    expect(child2.closest(`[data-testid="${TEST_ID}"]`)).toBeDefined();
  });
});
