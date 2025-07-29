import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const CollapsibleMenu = ({
  children,
  trigger,
  className,
  textStyles,
}: {
  children: React.ReactNode;
  trigger: string;
  className: string;
  textStyles: string;
}) => {
  return (
    <div>
      <Accordion type="multiple" className={className}>
        <AccordionItem value={trigger}>
          <AccordionTrigger className={textStyles}>{trigger}</AccordionTrigger>
          <AccordionContent className="text-[12px]">
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CollapsibleMenu;
