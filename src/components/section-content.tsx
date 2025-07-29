import Link from "next/link";

export const SectionContent = () => {
  return (
    <div className="w-52 bg-white p-6 shadow-xl flex flex-col gap-[20px] border-black border-[1px]">
      <span className="hover:underline">
        <Link href={"/educators"} prefetch={true}>
          Educators
        </Link>
      </span>
      <span className="hover:underline">
        <Link href={"/environment"} prefetch={true}>
          Environment
        </Link>
      </span>
      <span className="hover:underline">
        <Link href={"/femmes"} prefetch={true}>
          Femmes
        </Link>
      </span>
      <span className="hover:underline">
        <Link href={"/health"} prefetch={true}>
          Health
        </Link>
      </span>
    </div>
  );
};
