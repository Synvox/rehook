import testUtil from "../test-util";
import branch from "../branch";
import withProps from "../with-props";

test("branch left", () => {
  const getProps = testUtil(
    branch(
      ({ val }) => val,
      withProps({ left: true }),
      withProps({ right: true })
    ),
    { val: true }
  );

  expect(getProps().left).toBe(true);
});

test("branch right", () => {
  const getProps = testUtil(
    branch(
      ({ val }) => val,
      withProps({ left: true }),
      withProps({ right: true })
    ),
    { val: false }
  );

  expect(getProps().right).toBe(true);
});

test("branch without right", () => {
  const getProps = testUtil(
    branch(({ val }) => val, withProps({ left: true })),
    { val: false }
  );

  expect(getProps()).toEqual({ val: false });
});
