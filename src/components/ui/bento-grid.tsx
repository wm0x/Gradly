import { ComponentPropsWithoutRef, ReactNode } from "react";


import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      "transform-gpu bg-black [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="p-4">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
        <Icon className="h-12 w-12 origin-left transform-gpu text-white transition-all duration-300 ease-in-out group-hover:scale-75" />
        <h3 className="text-xl font-semibold text-neutral-300">
          {name}
        </h3>
        <p className="max-w-lg text-neutral-400">{description}</p>
      </div>

      <div className="pointer-events-auto lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          className="p-0 text-green-700 hover:bg-transparent hover:text-green-600"
          asChild
        >
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180 text-green-600" />
          </a>
        </Button>
      </div>
    </div>

    <div className="pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
      <Button
        variant="ghost"
        size="sm"
        className="pointer-events-auto p-0 text-green-700 hover:bg-transparent hover:text-green-600"
        asChild
      >
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180 text-green-600" />
        </a>
      </Button>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
