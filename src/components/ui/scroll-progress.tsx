import React, { forwardRef } from "react";
import { motion, useScroll, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps extends HTMLMotionProps<"div"> {}

export const ScrollProgress = forwardRef<HTMLDivElement, ScrollProgressProps>(
  ({ className, ...props }, ref) => {
    const { scrollYProgress } = useScroll();

    return (
      <motion.div
        ref={ref}
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400",
          className
        )}
        style={{
          scaleX: scrollYProgress,
        }}
        {...props}
      />
    );
  }
);
