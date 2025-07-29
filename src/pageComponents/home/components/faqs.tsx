import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faqs = () => {
  return (
    <div className="flex flex-col items-center pb-[80px]">
      <h1 className="text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold">
        Frequently Asked Questions
      </h1>
      <div className="w-[80%] md:w-[70%] lg:w-[60%]">
        <Accordion type="multiple">
          {content.map((item, index) => (
            <AccordionItem value={`item-${index}`} className="" key={index}>
              <AccordionTrigger className="text-[14px] lg:text-[16px] flex items-center pb-[5px]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-black/60 text-[12px] lg:text-[14px]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

const content = [
  {
    question: "What is Pro Bono?",
    answer:
      "Pro Bono is a youth-led nonprofit organization focused on social impact through community programs and outreach.",
  },
  {
    question: "What does Pro Bono do?",
    answer:
      "We run programs in education, healthcare, gender empowerment, and environmental conservation to support communities in need.",
  },
  {
    question: "Who can join Pro Bono?",
    answer:
      "Anyone passionate about making a difference can join as a volunteer, partner, or supporter.",
  },
  {
    question: "How can I support Pro Bono?",
    answer: "You can volunteer, donate, or collaborate with us on project",
  },
  {
    question: "Where does Pro Bono operate?",
    answer:
      "We mainly work in Uganda, but our initiatives aim to create a broader impact.",
  },
];

export default Faqs;
