import * as exported from "../";

test("exports expected", () => {
  expect(Object.keys(exported)).toEqual([
    "branch",
    "catchRender",
    "defaultProps",
    "flattenProp",
    "lifecycle",
    "mapProps",
    "pipe",
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
