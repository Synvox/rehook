import React from "react";

export default (component, deriveProps = x => x) => {
  const newComponent = props => {
    let result = null;

    try {
      result = component(deriveProps(props));
    } catch (e) {
      if (typeof e !== "object" || React.isValidElement(e)) result = e;
      else throw e;
    }

    return result;
  };

  newComponent.displayName =
    component.displayName || component.name || "Component";

  return newComponent;
};
