import { DatePicker } from "@/components/datepicker";
import {
  AvailabilityType,
  DurationType,
  SectorType,
  VolunteerFormType,
} from "@/lib/types";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

export default function SecondStep({
  errors,
  register,
  step,
  setValue,
  watch,
  trigger,
}: {
  errors: FieldErrors<VolunteerFormType>;
  register: UseFormRegister<VolunteerFormType>;
  step: number;
  setValue: UseFormSetValue<VolunteerFormType>;
  watch: UseFormWatch<VolunteerFormType>;
  trigger: UseFormTrigger<VolunteerFormType>;
}) {
  const [customSkill, setCustomSkill] = useState(false);

  const availableDays = watch("availability");
  const sectors = watch("sectors");
  const skill = watch("skills");

  const weekDays: AvailabilityType[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const durations: DurationType[] = [
    "One Time Event",
    "1-3 months",
    "4-6 months",
    "Long term(6months to 1 year)",
  ];

  const skills = [
    "Public Speaking",
    "Teaching",
    "Social Media",
    "Photography",
    "Graphics Design",
    "Event Coordination",
    "Fundraising",
    "Other",
  ];

  const sectorOptions: SectorType[] = [
    "Pro Bono Femmes",
    "Pro Bono Educators",
    "Pro Bono Environment",
    "Pro Bono Health",
    "Media and Communications",
    "Logistics and Event Planning",
    "Fundraising and partnerships",
  ];

  const handleAvailabilityChange = (
    weekday: AvailabilityType,
    isChecked: boolean
  ) => {
    const newSelection = isChecked
      ? [...availableDays, weekday]
      : availableDays.filter((day) => day !== weekday);

    setValue("availability", newSelection, { shouldValidate: true });
  };

  const handleSectorChange = (
    sectorSelection: SectorType,
    isChecked: boolean
  ) => {
    const newSelection = isChecked
      ? [...sectors, sectorSelection]
      : sectors.filter((sector) => sector !== sectorSelection);

    setValue("sectors", newSelection, { shouldValidate: true });
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skillValue = e.target.value;

    if (skillValue === "Other") {
      setCustomSkill(true);
      setValue("skills", "");
    } else {
      setCustomSkill(false);
      setValue("skills", skillValue, { shouldValidate: true });
    }
  };

  useEffect(() => {
    if (customSkill && skill === "") {
      const customSkillInput = document.getElementById("customskill");
      customSkillInput?.focus();
    }
  }, [skill]);

  return (
    <motion.section
      initial={{ x: "3%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-3%", opacity: 0 }}
      key={step}
      className="w-full flex flex-col items-center gap-[25px] sm:gap-[30px] md:gap-[35px] text-[14px] sm:text-[15px] md:text-[16px]"
    >
      <div className="flex gap-[5px] font-semibold text-[18px] sm:text-[19px] md:text-[20px] underline">
        {/* <div className="text-orange-secondary flex items-center">1 <ChevronRight /></div> */}
        Availability, Skills and Seectors
      </div>
      <div className="flex flex-col gap-[5px] w-full max-w-[400px]">
        <div className="w-full font-medium flex flex-col">
          <span className="w-full">On which days are you available?</span>
          {errors.availability && (
            <div className="text-[12px] sm:text-[13px] font-normal text-red-400">
              {errors.availability.message}
            </div>
          )}
        </div>
        {weekDays.map((weekDay) => (
          <div key={weekDay} className="flex gap-[10px] items-center">
            <input
              type="checkbox"
              checked={availableDays.includes(weekDay)}
              onChange={(e) =>
                handleAvailabilityChange(weekDay, e.target.checked)
              }
              className="w-[18px] h-[18px] checkbox"
            />
            <label className="">{weekDay}</label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-[5px] w-full max-w-[400px]">
        <div className="w-full font-medium flex flex-col">
          <span className="w-full">
            How long would you like to volunteer with us?
          </span>
          {errors.duration && (
            <div className="text-[12px] sm:text-[13px] font-normal text-red-400">
              {errors.duration.message}
            </div>
          )}
        </div>
        {durations.map((duration) => (
          <div key={duration} className="flex gap-[10px] items-center">
            <input
              type="radio"
              value={duration}
              {...register("duration")}
              className="w-[18px] h-[18px] checkbox"
            />
            <label className="">{duration}</label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-[10px] w-full max-w-[400px]">
        <div className="w-full font-medium flex flex-col">
          <span className="w-full">What's your preffered start date?</span>
          {errors.startDate && (
            <div className="text-[12px] sm:text-[13px] font-normal text-red-400">
              {errors.startDate.message}
            </div>
          )}
        </div>
        <DatePicker setValue={setValue} watch={watch} trigger={trigger} />
      </div>
      <div className="flex flex-col gap-[5px] w-full max-w-[400px]">
        <div className="w-full font-medium flex flex-col">
          <span className="w-full">What are your strongest skills?</span>
          {errors.skills && (
            <div className="text-[12px] sm:text-[13px] font-normal text-red-400">
              {errors.skills.message}
            </div>
          )}
        </div>
        {skills.map((skill) => (
          <div key={skill} className="flex gap-[10px] items-center">
            <input
              type="radio"
              value={skill}
              name="skills"
              onChange={handleSkillChange}
              className="w-[18px] h-[18px] checkbox"
            />
            <label className="">{skill}</label>
          </div>
        ))}
        {customSkill && (
          <input
            id="customskill"
            type="text"
            {...register("skills")}
            placeholder="Specify"
            className="border-b-[1px] outline-0 border-black/30 focus:border-black/60"
          />
        )}
      </div>
      <div className="flex flex-col gap-[5px] w-full max-w-[400px]">
        <div className="w-full font-medium flex flex-col">
          <span className="w-full">Which sector are you interested in?</span>
          {errors.sectors && (
            <div className="text-[12px] sm:text-[13px] font-normal text-red-400">
              {errors.sectors.message}
            </div>
          )}
        </div>
        {sectorOptions.map((sector) => (
          <div key={sector} className="flex gap-[10px] items-center">
            <input
              type="checkbox"
              checked={sectors.includes(sector)}
              onChange={(e) => handleSectorChange(sector, e.target.checked)}
              className="w-[18px] h-[18px] checkbox"
            />
            <label className="">{sector}</label>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
