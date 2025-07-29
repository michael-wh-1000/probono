import { Input } from "@/components/ui/input";
import { VolunteerFormType } from "@/lib/types";
import { motion } from "motion/react";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

export default function ThirdStep({
  errors,
  register,
  control,
  step,
  watch,
  trigger,
}: {
  errors: FieldErrors<VolunteerFormType>;
  register: UseFormRegister<VolunteerFormType>;
  control: Control<VolunteerFormType, any, VolunteerFormType>;
  step: number;
  watch: UseFormWatch<VolunteerFormType>;
  trigger: UseFormTrigger<VolunteerFormType>;
}) {
  const resumeFile = watch("resume");

  const attendance = ["Yes", "No"];

  const certificate = ["Yes", "No"];

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
        Final Steps
      </div>
      <div className="flex flex-col gap-[5px] w-full max-w-[400px]">
        <div className="w-full font-medium flex flex-col">
          <span className="w-full">
            Are you willing to attend virtual or in person trainings and
            meetings when required?
          </span>
          {errors.attendance && (
            <div className="text-[12px] sm:text-[13px] font-normal text-red-400">
              {errors.attendance.message}
            </div>
          )}
        </div>
        {attendance.map((attendanceOption) => (
          <div key={attendanceOption} className="flex gap-[10px] items-center">
            <input
              type="radio"
              value={attendanceOption}
              {...register("attendance")}
              className="w-[18px] h-[18px] checkbox"
            />
            <label className="">{attendanceOption}</label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-[5px] w-full max-w-[400px]">
        <div className="w-full font-medium flex flex-col">
          <span className="w-full">
            Would you like recieve a certificate after your volunteer period?
          </span>
          {errors.certificate && (
            <div className="text-[12px] sm:text-[13px] font-normal text-red-400">
              {errors.certificate.message}
            </div>
          )}
        </div>
        {certificate.map((certificateOption) => (
          <div key={certificateOption} className="flex gap-[10px] items-center">
            <input
              type="radio"
              value={certificateOption}
              {...register("certificate")}
              className="w-[18px] h-[18px] checkbox"
            />
            <label className="">{certificateOption}</label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-[2px] w-full max-w-[400px]">
        <div className="font-medium">
          Submit your cover letter or resume
          {errors.resume && (
            <div className="text-[12px] sm:text-[13px] font-normal text-red-400">
              {errors.resume.message}
            </div>
          )}
        </div>
        <label htmlFor="fileInput">
          <div className="text-[14px] px-[10px] py-[6px] border-grey border-[1px] rounded-sm shadow-sm">
            <span className="font-medium">
              {resumeFile ? "File Selected" : "Choose File"}{" "}
            </span>
            <span>
              {resumeFile
                ? resumeFile.name.length > 25
                  ? resumeFile.name.slice(0, 25).concat("...")
                  : resumeFile.name
                : "No file chosen"}
            </span>
          </div>
        </label>
        <Controller
          name="resume"
          control={control}
          render={({ field: { onChange, ref, value } }) => (
            <Input
              id="fileInput"
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                onChange(file);
                trigger("resume");
              }}
              ref={ref} // ✅ Keeps native behavior so file name shows
            />
          )}
        />
      </div>
    </motion.section>
  );
}
