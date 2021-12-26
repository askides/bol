import { useAccordion } from "./AccordionContext";
import { useAccordionItem } from "./AccordionItemContext";
import { callAll } from "../../utils/call-all";

export function AccordionButton({ children, onClick }) {
  const { dispatch } = useAccordion();
  const { index } = useAccordionItem();

  const handleToggle = () => {
    dispatch({ type: "TOGGLE_ITEM", id: index });
  };

  return (
    <button type="button" onClick={callAll(handleToggle, onClick)}>
      {children}
    </button>
  );
}
