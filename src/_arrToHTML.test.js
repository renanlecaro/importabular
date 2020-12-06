import { _arrToHTML } from "./_arrToHTML";

test("textContent behavior", () => {
  const div = document.createElement("div");
  div.textContent = "Hello";
  expect(div.innerHTML).toEqual("Hello");
});

test("_arrToHTML", () => {
  expect(_arrToHTML([["A1"]])).toContain("A1");
});