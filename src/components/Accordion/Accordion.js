import * as React from "react";
import { AccordionButton } from "./AccordionButton";
import { AccordionProvider } from "./AccordionContext";
import { AccordionItem } from "./AccordionItem";
import { AccordionPanel } from "./AccordionPanel";

export function Accordion({ children, ...props }) {
  return (
    <div>
      <AccordionProvider {...props}>{children}</AccordionProvider>
    </div>
  );
}

Accordion.Item = AccordionItem;
Accordion.Button = AccordionButton;
Accordion.Panel = AccordionPanel;
