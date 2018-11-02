import renderNothing from "../render-nothing";

test("render nothing", () => {
  let e = undefined;

  try {
    renderNothing();
  } catch (thrown) {
    e = thrown;
  }

  expect(e).toBe(null);
});
