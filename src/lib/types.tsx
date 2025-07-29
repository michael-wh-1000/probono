import { ZodType, z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export type AvailabilityType =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type DurationType =
  | "One Time Event"
  | "1-3 months"
  | "4-6 months"
  | "Long term(6months to 1 year)";

export type SectorType =
  | "Pro Bono Femmes"
  | "Pro Bono Educators"
  | "Pro Bono Environment"
  | "Pro Bono Health"
  | "Media and Communications"
  | "Logistics and Event Planning"
  | "Fundraising and partnerships";

// export type VolunteerFormType = {
//   name: string;
//   age: number;
//   email: string;
//   number: string;
//   occupation: string;
//   availability: AvailabilityType[];
//   duration: DurationType;
//   startDate: Date;
//   skills: string;
//   sectors: SectorType[];
//   attendance: string;
//   certificate: string;
//   resume: File;
// };

export const VolunteerFormSchema = z.object({
  name: z.string().min(2, "Enter a valid name"),
  age: z.number().gte(10, "Enter a valid age"),
  email: z.email("Enter a valid email address"),
  number: z
    .string("Enter a valid phone number")
    .min(10, "Enter a valid phone number")
    .refine((val) => isValidPhoneNumber(val || ""), {
      message: "Enter a valid phone number",
    }),
  occupation: z.string().min(1, "Enter a valid occupation"),
  availability: z
    .array(
      z.enum([
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ])
    )
    .min(1, "Select at least one day"),
  duration: z.enum(
    [
      "One Time Event",
      "1-3 months",
      "4-6 months",
      "Long term(6months to 1 year)",
    ],
    "Select one"
  ),
  startDate: z.date("Please select a date"),
  skills: z.string().min(5, `Select one or specify "other"`),
  sectors: z
    .array(
      z.enum([
        "Pro Bono Femmes",
        "Pro Bono Educators",
        "Pro Bono Environment",
        "Pro Bono Health",
        "Media and Communications",
        "Logistics and Event Planning",
        "Fundraising and partnerships",
      ])
    )
    .length(2, "Must select exactly 2"),
  attendance: z.string("Select one"),
  certificate: z.string("Select one"),
  resume: z
    .instanceof(File, { message: "Please upload a file." })
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      { message: "Invalid document file type" }
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File must be less than 5MB",
    }),
});

export type VolunteerFormType = z.infer<typeof VolunteerFormSchema>;
