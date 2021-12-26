import { AccordionItemProvider } from "./AccordionItemContext";

export function AccordionItem(props) {
  const { index } = props;

  return (
    <AccordionItemProvider index={index}>
      <div>{props.children}</div>
    </AccordionItemProvider>
  );
}
