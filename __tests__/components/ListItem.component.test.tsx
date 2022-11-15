import { ListItem } from "components/ListItem/ListItem.component";
import { render, screen } from "utils";

const CHILD_IDS = ["child1", "child2"];
const TEST_ID = "ListItem";
const LIST_ITEM_COMPONENT = (
  <ListItem data-testid={TEST_ID}>
    <span data-testid={CHILD_IDS[0]}></span>
    <span data-testid={CHILD_IDS[1]}></span>
  </ListItem>
);

describe("<ListItem />", () => {
  beforeEach(() => {
    render(LIST_ITEM_COMPONENT);
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
