import { Option } from "components/Option/Option.component";
import { render, screen } from "utils";

const TEST_ID = "Option";
const OPTION_COMPONENT = <Option data-testid={TEST_ID}></Option>;

describe("<Option />", () => {
  beforeEach(() => {
    render(OPTION_COMPONENT);
  });

  it("will render in the dom", () => {
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });
});
