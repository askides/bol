import { AccordionItemProvider } from "./AccordionItemContext";

export function AccordionItem({ children, index }) {
  return (
    <AccordionItemProvider index={index}>
      <li>{children}</li>
    </AccordionItemProvider>
  );
}
