"use client";

import { Progress } from "@/components/ui/progress";
import { VolunteerFormSchema, VolunteerFormType } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-phone-number-input/style.css";
import FirstStep from "@/pageComponents/volunteer/components/FirstStep";
import { CustomButton } from "@/components/button";
import SecondStep from "@/pageComponents/volunteer/components/SecondStep";
import ThirdStep from "@/pageComponents/volunteer/components/ThirdStep";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/loader";

const VolunteerPage = () => {
  const router = useRouter();
  const {
    formState: { errors },
    register,
    control,
    handleSubmit,
    trigger,
    setValue,
    watch,
  } = useForm<VolunteerFormType>({
    resolver: zodResolver(VolunteerFormSchema),
    mode: "onBlur",
    defaultValues: {
      availability: [],
      sectors: [],
    },
  });
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState((1 / 3) * 100);

  const nextFunction = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (Math.ceil(step) < 100) {
      setStep((prev) => prev + (1 / 3) * 100);
    }
  };

  const prevFunction = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (Math.floor(step) > (1 / 3) * 100) {
      setStep((prev) => prev - (1 / 3) * 100);
    }
  };

  const onSubmit = async (form: VolunteerFormType) => {
    const data = new FormData();

    data.append("name", form.name);
    data.append("age", form.age.toString());
    data.append("email", form.email);
    data.append("number", form.number);
    data.append("occupation", form.occupation);
    data.append("availability", form.availability.join(", "));
    data.append("startDate", form.startDate.toISOString());
    data.append("skills", form.skills);
    data.append("sectors", form.sectors.join(", "));
    data.append("attendance", form.attendance);
    data.append("certificate", form.certificate);
    data.append("resume", form.resume);

    setLoading(true);

    const result = await axios.post(
      "http://localhost:3000/api/formsubmit",
      data
    );

    if (result.status === 200) {
      setLoading(false);
      router.push("/volunteer/success");
    } else {
      setLoading(false);
      router.push("/volunteer/failure");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  return (
    <div className="pt-[120px] pb-[80px] lg:pt-[130px] xl:pt-[140px] w-full min-h-screen flex flex-col gap-[40px] md:gap-[50px] lg:gap-[60px] xl:gap-[70px] items-center relative overflow-hidden  px-[20px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px]">
      <div className="absolute top-0  h-full overflow-clip w-full -z-10">
        <img
          src="/svg-images/circles.svg"
          className="w-full h-full object-cover"
        />
      </div>
      <Progress value={step} className="w-full max-w-[500px] h-[3px]" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full gap-[30px]"
      >
        {loading && <Loader />}
        {Object.keys(errors).length > 0 && (
          <div className="text-[12px] sm:text-[13px] font-normal text-red-400">
            Please check the form for any errors
          </div>
        )}
        <div className="w-full flex flex-col items-center gap-[50px] md:gap-[60px] lg:gap-[70px] xl:gap-[80px] pb-[20px] md:pb-[30px] lg:pb-[40px] xl:pb-[50px]">
          {step === (1 / 3) * 100 ? (
            <FirstStep
              register={register}
              control={control}
              errors={errors}
              step={step}
            />
          ) : step === (2 / 3) * 100 ? (
            <SecondStep
              register={register}
              errors={errors}
              step={step}
              setValue={setValue}
              watch={watch}
              trigger={trigger}
            />
          ) : (
            <ThirdStep
              register={register}
              control={control}
              errors={errors}
              step={step}
              trigger={trigger}
              watch={watch}
            />
          )}
        </div>

        <div className="w-full max-w-[500px] text-[13px] text-white flex justify-between">
          <CustomButton onClick={prevFunction}>Back</CustomButton>
          {Math.round(step) === 100 ? (
            <CustomButton type="submit">Finish</CustomButton>
          ) : (
            <CustomButton onClick={nextFunction}>Next</CustomButton>
          )}
        </div>
      </form>
    </div>
  );
};

export default VolunteerPage;
