import { useAccordion } from "./AccordionContext";
import { useAccordionItem } from "./AccordionItemContext";

export function AccordionPanel({ children }) {
  const {
    state: { items },
  } = useAccordion();
  const { index } = useAccordionItem();

  if (items[index]) {
    return <div>{children}</div>;
  }

  return null;
}
