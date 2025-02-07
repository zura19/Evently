import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionComp({
  children,
  title,
  defaultOpen = false,
  type = "single",
}: {
  children: React.ReactNode;
  title: string;
  type?: "single" | "multiple";
  defaultOpen?: boolean;
}) {
  return (
    // @ts-expect-error acordion error
    <Accordion
      type={type}
      defaultValue={defaultOpen ? `item-1` : ""}
      collapsible
    >
      <AccordionItem defaultValue={`item-1`} value={`item-1`}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
