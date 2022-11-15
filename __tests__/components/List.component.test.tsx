import { List } from "components/List/List.component";
import { render, screen } from "utils";

const CHILD_IDS = ["child1", "child2"];
const TEST_ID = "List";
const LIST_COMPONENT = (
  <List data-testid={TEST_ID}>
    <li data-testid={CHILD_IDS[0]}></li>
    <li data-testid={CHILD_IDS[1]}></li>
  </List>
);

describe("<List />", () => {
  beforeEach(() => {
    render(LIST_COMPONENT);
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
