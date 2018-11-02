import * as exported from "../";

test("exports expected", () => {
  expect(Object.keys(exported)).toEqual([
    "rehook",
    "branch",
    "pipe",
    "defaultProps",
    "flattenProp",
    "lifecycle",
    "mapProps",
    "renameProp",
    "renameProps",
    "renderComponent",
    "renderNothing",
    "withHandlers",
    "withPropsOnChange",
    "withProps",
    "withReducer",
    "withStateHandlers",
    "withState"
  ]);
});
