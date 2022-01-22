import * as React from "react";
import { AccordionButton } from "./AccordionButton";
import { AccordionProvider } from "./AccordionContext";
import { AccordionItem } from "./AccordionItem";
import { AccordionPanel } from "./AccordionPanel";

export function Accordion({ children, ...props }) {
  return (
    <ul>
      <AccordionProvider {...props}>{children}</AccordionProvider>
    </ul>
  );
}

Accordion.Item = AccordionItem;
Accordion.Button = AccordionButton;
Accordion.Panel = AccordionPanel;
