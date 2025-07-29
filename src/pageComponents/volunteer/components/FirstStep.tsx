import { VolunteerFormType } from "@/lib/types";
import { ArrowRight, MoveRight } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import PhoneInput from "react-phone-number-input";

export default function FirstStep({
  errors,
  register,
  control,
  step,
}: {
  errors: FieldErrors<VolunteerFormType>;
  register: UseFormRegister<VolunteerFormType>;
  control: Control<VolunteerFormType, any, VolunteerFormType>;
  step: number;
}) {
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
        Personal Information
      </div>
      <div className="flex flex-col gap-[2px] w-full max-w-[400px]">
        <label className="font-medium">
          What's your name?
          {errors.name && (
            <div className="text-[12px] sm:text-[13px] font-normal text-red-400">
              {errors.name.message}
            </div>
          )}
        </label>
        <input
          type="text"
          {...register("name")}
          placeholder="Enter full name"
          className="border-b-[1px] outline-0 border-black/30 focus:border-black/60"
        />
      </div>
      <div className="flex flex-col gap-[2px] w-full max-w-[400px]">
        <label className="font-medium">How old are you?</label>
        {errors.age && (
          <div className="text-[12px] sm:text-[13px] font-normal text-red-400">
            {errors.age.message}
          </div>
        )}
        <Controller
          name="age"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={value ?? ""}
              onBlur={onBlur}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const rawValue = e.target.value;

                if (/^\d*$/.test(rawValue)) {
                  const numericValue = Number(rawValue);

                  if (rawValue === "") {
                    onChange(0);
                  } else if (!isNaN(numericValue) && numericValue <= 100) {
                    onChange(numericValue);
                  }
                }
              }}
              placeholder="Enter your age"
              className="border-b-[1px] outline-0 border-black/30 focus:border-black/60"
            />
          )}
        />
      </div>
      <div className="flex flex-col gap-[2px] w-full max-w-[400px]">
        <label className="font-medium">
          What's your email address?{" "}
          {errors.email && (
            <div className="text-[12px] sm:text-[13px] font-normal text-red-400">
              {errors.email.message}
            </div>
          )}
        </label>
        <input
          type="email"
          {...register("email")}
          placeholder="Enter your email"
          className="border-b-[1px] outline-0 border-black/30 focus:border-black/60"
        />
      </div>
      <div className="flex flex-col gap-[2px] w-full max-w-[400px]">
        <label className="font-medium">What is your phone number?</label>
        {errors.number && (
          <div className="text-[12px] sm:text-[13px] font-normal text-red-400">
            {errors.number.message}
          </div>
        )}
        <Controller
          name="number"
          control={control}
          render={({ field }) => (
            <PhoneInput
              {...field}
              international
              defaultCountry="UG"
              value={field.value}
              onChange={(value) => {
                if (!value) {
                  field.onChange("");
                } else {
                  field.onChange(value);
                }
              }}
              onBlur={field.onBlur}
              placeholder="Enter phone number"
              className="w-full max-w-[400px]"
            />
          )}
        />
      </div>
      <div className="flex flex-col gap-[2px] w-full max-w-[400px]">
        <label className="font-medium">
          What's your occupation or school(if you're a student)?
          {errors.occupation && (
            <div className="text-[12px] sm:text-[13px] font-normal text-red-400">
              {errors.occupation.message}
            </div>
          )}
        </label>
        <input
          type="text"
          {...register("occupation")}
          placeholder="Enter your occupation"
          className="border-b-[1px] outline-0 border-black/30 focus:border-black/60"
        />
      </div>
    </motion.section>
  );
}
