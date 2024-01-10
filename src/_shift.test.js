import { _shift } from "./_shift";

describe("moving forward ", () => {
  test("moves one cell to the right", () => {
    // X0  to 0X
    // 00     00

    expect(
      _shift(
        0, // x
        0, // y
        1, // deltaX
        0, // xMin
        1, // xMax
        0, // yMin
        1, // yMax
      ),
    ).toEqual({ x: 1, y: 0 });
  });

  test("goes to the next row if it is exiting the bounds horizontally", () => {
    // 0X  to 00
    // 00     X0
    expect(
      _shift(
        1, // x
        0, // y
        1, // deltaX
        0, // xMin
        1, // xMax
        0, // yMin
        1, // yMax
      ),
    ).toEqual({ x: 0, y: 1 });
  });
  test("goes back to the first row if it is at the last one", () => {
    // 00  to X0
    // 0X     00
    expect(
      _shift(
        1, // x
        1, // y
        1, // deltaX
        0, // xMin
        1, // xMax
        0, // yMin
        1, // yMax
      ),
    ).toEqual({ x: 0, y: 0 });
  });
});
describe("moving backward ", () => {
  test("moves one cell to the left", () => {
    // 00  to X0
    // 0X     00
    expect(
      _shift(
        1, // x
        0, // y
        -1, // deltaX
        0, // xMin
        1, // xMax
        0, // yMin
        1, // yMax
      ),
    ).toEqual({ x: 0, y: 0 });
  });

  test("goes to the previous row if it is exiting the bounds horizontally", () => {
    // 00  to 0X
    // X0     00
    expect(
      _shift(
        0, // x
        1, // y
        -1, // deltaX
        0, // xMin
        1, // xMax
        0, // yMin
        1, // yMax
      ),
    ).toEqual({ x: 1, y: 0 });
  });

  test("does not do anything if the new X coordinates would be infinite", () => {
    // 0000..  to 0000..
    // X000..     X000..
    expect(
      _shift(
        0, // x
        1, // y
        -1, // deltaX
        0, // xMin
        Infinity, // xMax
        0, // yMin
        1, // yMax
      ),
    ).toEqual({ x: 0, y: 1 });
  });
  test("does not do anything if the new Y coordinates would be infinite", () => {
    // X0  to X0
    // 00     00
    // ..     ..
    expect(
      _shift(
        0, // x
        0, // y
        -1, // deltaX
        0, // xMin
        1, // xMax
        0, // yMin
        Infinity, // yMax
      ),
    ).toEqual({ x: 0, y: 0 });
  });
});
