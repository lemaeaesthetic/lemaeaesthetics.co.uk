import { Modal } from "components/Modal/Modal.component";
import { render, screen } from "utils";

const CHILD_IDS = ["child1", "child2"];
const TEST_ID = "Modal";
const MODAL_COMPONENT = (
  <Modal data-testid={TEST_ID}>
    <div data-testid={CHILD_IDS[0]}></div>
    <div data-testid={CHILD_IDS[1]}></div>
  </Modal>
);

describe("<Modal />", () => {
  beforeEach(() => {
    render(MODAL_COMPONENT);
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
