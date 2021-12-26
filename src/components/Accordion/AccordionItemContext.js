import * as React from "react";

const AccordionItemContext = React.createContext();

export function AccordionItemProvider(props) {
  const { index } = props;

  return (
    <AccordionItemContext.Provider value={{ index }}>
      {props.children}
    </AccordionItemContext.Provider>
  );
}

export function useAccordionItem() {
  const context = React.useContext(AccordionItemContext);

  if (!context) {
    throw new Error(
      "The useAccordionItem hook should be used onl within an AccordionItemProvider"
    );
  }

  return context;
}
