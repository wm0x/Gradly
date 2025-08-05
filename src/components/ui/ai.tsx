import React from "react";
import { FlickeringGrid } from "./flick-bg";
import { motion } from "framer-motion";
import { TypewriterEffectSmooth } from "./typewriter-effect";
import { HoverEffect } from "./card-hover-effect";

export default function Ai() {
  const projects = [
    {
      title: "Sign In or Register",
      description:
        "Log in or create your account to access Gradly AI tools. This allows us to save your progress and personalize your experience.",
      link: "/auth/login",
    },
    {
      title: "Generate Your Project",
      description:
        "Enter your project idea or topic. Gradly AI will create a detailed outline and structure tailored to your needs in seconds.",
      link: "/auth/login",
    },
    {
      title: "Explore-Edit-Download",
      description:
        "Review and adjust the generated content. Once you're ready, copy or download the final version to your device easily.",
      link: "/auth/login",
    },
  ];
  const words = [
    {
      text: "Generate",
      className: "text-white",
    },
    {
      text: "your",
      className: "text-white",
    },
    {
      text: "project",
      className: "text-white",
    },
    {
      text: "with",
      className: "text-white",
    },
    {
      text: "Gradly",
      className: "text-green-500 ",
    },
    {
      text: "AI",
      className: "text-teal-700",
    },
  ];
  return (
    <div className="px-8">
      <div className="relative h-[800px] w-full overflow-hidden rounded-xl border border-white/20 bg-background pb-20 mb-20">
        <FlickeringGrid
          className="absolute inset-0 z-0 w-full h-full bg-black"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
          height={1000}
          width={1900}
        />
        <div className="relative z-10 flex items-center justify-center mt-20 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex px-6 py-2 rounded-full bg-gradient-to-r from-teal-400/10 to-blue-500/10 backdrop-blur-sm border border-x-purple-800 border-y-purple-600/60 shadow-lg shadow-teal-400/10 hover:shadow-teal-400/20 transition-all duration-300 group"
          >
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-teal-400/20 to-blue-500/20 transition-opacity duration-300" />
            <span className="relative z-10 text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-400 flex items-center">
              AI with Gradly
            </span>
          </motion.div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-white">
          <TypewriterEffectSmooth words={words} />
        </div>

        <div>
          <div className="max-w-5xl mx-auto px-8">
            <HoverEffect items={projects} />
          </div>
        </div>
      </div>
    </div>
  );
}
