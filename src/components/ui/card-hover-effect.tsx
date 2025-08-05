import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IconLogin2 } from '@tabler/icons-react';
import { IconAi } from '@tabler/icons-react';
import { IconTableDown } from '@tabler/icons-react';
import { cn } from "@/lib/utils";
const aiIcons = [
  <IconLogin2 className="w-6 h-6" />,
  <IconAi className="w-6 h-6" />,
  <IconTableDown className="w-6 h-6" />,
];

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", className)}>
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6")}>
        {items.map((item, idx) => (
          <a
            href={item?.link}
            key={`${item?.link}-${idx}`}
            className="relative group block h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-gradient-to-br from-teal-500/10 to-blue-500/10 block rounded-xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card number={idx + 1} icon={aiIcons[idx % aiIcons.length]}>
              <div className="flex flex-col">
                <div className="flex">
                  <CardTitle>{item.title}</CardTitle>
                </div>
                <CardDescription>{item.description}</CardDescription>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export const Card = ({
  className,
  children,
  number,
  icon,
}: {
  className?: string;
  children: React.ReactNode;
  number?: number;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl h-full w-full p-6 overflow-hidden bg-neutral-900 border border-neutral-800 group-hover:border-teal-400/50 relative z-20 transition-all duration-300 flex flex-col",
        className
      )}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="p-2 bg-gradient-to-br border border-white/10 rounded-full text-white">
          {icon}
        </div>
        <div className="text-2xl font-bold text-neutral-700 group-hover:text-teal-400 transition-colors duration-300 border border-white/10 rounded-full px-3 py-1">
          {number}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        {children}
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-teal-400/20 bg-gradient-to-br from-teal-400/5 to-transparent" />
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn(
      "text-xl font-bold text-white mb-4",
      className
    )}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-auto pt-4 text-neutral-400 leading-relaxed text-sm group-hover:text-neutral-300 transition-colors duration-300 border-t border-neutral-800 group-hover:border-teal-400/20",
        className
      )}
    >
      {children}
    </p>
  );
};