import { useAccordion } from "./AccordionContext";
import { useAccordionItem } from "./AccordionItemContext";
import { callAll } from "../../utils/call-all";

export function AccordionButton({ children, onClick }) {
  const {
    dispatch,
    state: { items },
  } = useAccordion();
  const { index } = useAccordionItem();

  const isOpen = Boolean(items[index]);

  const handleToggle = () => {
    dispatch({ type: "TOGGLE_ITEM", id: index });
  };

  return (
    <button
      type="button"
      id={`${index}-id`}
      aria-expanded={isOpen}
      aria-controls={`${index}-section`}
      onClick={callAll(handleToggle, onClick)}
    >
      {children}
    </button>
  );
}
