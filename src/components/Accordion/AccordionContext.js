import * as React from "react";

export function accordionReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_ITEM": {
      const { id } = action;
      const { items, multiple } = state;
      return {
        ...state,
        items: {
          ...(multiple && items),
          [id]: items[id] ? !items[id] : true,
        },
      };
    }
    default: {
      throw new Error("This action is not available");
    }
  }
}

const AccordionContext = React.createContext();

export function AccordionProvider({
  children,
  defaults = [],
  multiple = false,
  ...props
}) {
  const indexMaps = React.Children.map(children, (_, index) => {
    return { [index]: defaults.includes(index) ? true : false };
  });

  const initialState = indexMaps.reduce((acc, el, index) => {
    acc[index] = el[index];
    return acc;
  }, {});

  const [state, dispatch] = React.useReducer(accordionReducer, {
    items: initialState,
    multiple,
  });

  return (
    <AccordionContext.Provider value={{ state, dispatch, ...props }}>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, { index });
      })}
    </AccordionContext.Provider>
  );
}

export function useAccordion() {
  const context = React.useContext(AccordionContext);

  if (!context) {
    throw new Error(
      "The useAccordion hook should be used only within an AccordionProvider"
    );
  }

  return context;
}
