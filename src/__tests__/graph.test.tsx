import { h } from "preact";
import Graph from "../components/graph";
import { render } from "@testing-library/preact";
import { Reactions } from "../services/reactions";
import { Reaction } from "../models/reaction";

describe("Test of Graph", () => {
  let sut: Reactions;
  let reactions: Reaction[];
  let component: HTMLElement;

  beforeAll(() => {
    sut = new Reactions();
    sut.reactionsDataFetch.then((res: any) => {
      reactions = res.data;
    });
  });

  beforeEach(() => {
    const { container } = render(<Graph data={reactions} />);
    component = container;
  });

  test("parent node has class name .graph", () => {
    expect(component.getElementsByClassName("graph")).toBeTruthy();
  });

  test("bars items equal to fetched data items", () => {
    const dataQuantity = reactions.length;
    const barsQuantity = component.querySelectorAll(".bars rect").length;
    expect(dataQuantity).toEqual(barsQuantity);
  });

  test("should be presented x and y axis in graph", () => {
    expect(component.getElementsByClassName("xAxis")).toBeTruthy();
    expect(component.getElementsByClassName("yAxis")).toBeTruthy();
  });

  test("in xAxis should be n pointers equal to fetched data items", () => {
    const dataQuantity = reactions.length;
    const barsQuantity = component.querySelectorAll(".xAxis .tick").length;
    expect(dataQuantity).toEqual(barsQuantity);
  });

  test("each xAxis pointer should to have image tag in self", () => {
    const barsQuantity = component.querySelectorAll(".xAxis .tick");
    barsQuantity.forEach((element) => {
      expect(element.querySelector("image")).toBeTruthy();
    });
  });
});
