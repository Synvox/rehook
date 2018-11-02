import renderComponent from "../render-component";

test("render component", () => {
  let e = undefined;

  try {
    renderComponent(() => "something")();
  } catch (thrown) {
    e = thrown;
  }

  expect(e).toBe("something");
});
