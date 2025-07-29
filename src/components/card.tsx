import { LucideIcon } from "lucide-react";

export const Card = ({
  title,
  subtitle,
  Icon,
}: {
  title: string;
  subtitle: string;
  Icon: LucideIcon;
}) => {
  return (
    <div className="w-full h-full p-[40px] rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white flex flex-col gap-[10px]">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-secondary to-orange-primary translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

      <Icon
        className="absolute z-10 -top-12 -right-12 text-slate-100 group-hover:text-orange-secondary/40 group-hover:rotate-12 transition-transform duration-300"
        size={150}
      />
      <h3 className="font-medium text-[14px] sm:text-[16px] lg:text-[18px] text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-black/70 text-[10px] sm:text-[12px] lg:text-[14px] group-hover:text-white/80 relative z-10 duration-300">
        {subtitle}
      </p>
    </div>
  );
};
