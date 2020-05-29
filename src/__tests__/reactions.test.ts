import { Reactions } from "../services/reactions";

describe("Testing reactions service", () => {
  let sut: Reactions = new Reactions();
  test("reactionsDataFetch method return proper data", () => {
    return sut.reactionsDataFetch.then((res: any) => {
      expect(res.data.length).toBe(6);
    });
  });
});
