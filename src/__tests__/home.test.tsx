import { h } from "preact";
// See: https://github.com/mzgoddard/preact-render-spy
import Home from "../routes/home/index";
import { render } from "@testing-library/preact";

describe("Initial Test of Home", () => {
  test("Home renders two items", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("h1")).toBeTruthy;
    expect(container.querySelector("h1")?.innerHTML).toBe("Home");
    expect(container.querySelectorAll("p").length).toBe(1);
  });
});
