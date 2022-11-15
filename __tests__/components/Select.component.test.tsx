import { Select } from "components/Select/Select.component";
import { render, screen } from "utils";

const CHILD_IDS = ["child1", "child2"];
const TEST_ID = "Select";
const SELECT_COMPONENT = (
  <Select data-testid={TEST_ID}>
    <option data-testid={CHILD_IDS[0]}></option>
    <option data-testid={CHILD_IDS[1]}></option>
  </Select>
);

describe("<Select />", () => {
  beforeEach(() => {
    render(SELECT_COMPONENT);
  });

  it("will render in the dom", () => {
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });

  it("will render child components", () => {
    const child1 = screen.getByTestId(CHILD_IDS[0]);
    const child2 = screen.getByTestId(CHILD_IDS[1]);
    expect(child1).toBeInTheDocument();
    expect(child2).toBeInTheDocument();
    expect(child1.closest(`[data-testid="${TEST_ID}"]`)).toBeDefined();
    expect(child2.closest(`[data-testid="${TEST_ID}"]`)).toBeDefined();
  });
});
