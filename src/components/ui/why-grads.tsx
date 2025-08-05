import {
  FileTextIcon,
  GlobeIcon,
  BellIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { SquareLibrary } from 'lucide-react';
import { BentoCard, BentoGrid } from "./bento-grid";
import { motion } from "framer-motion";


const features = [
  {
    Icon: FileTextIcon,
    name: "Manage Graduation Projects",
    description:
      "Gradly helps universities and students manage, track, and evaluate graduation projects efficiently.",
    href: "/",
    cta: "learn more",
    background: (
      <img
        className="absolute -right-20 -top-20 opacity-60"
        src="/images/Manage.png"
        alt="Manage img"
      />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
      {
  Icon: ShieldCheckIcon,
  name: "Secure & Private",
  description:
    "Gradly ensures the security and privacy of all project data, protecting students and university systems from unauthorized access.",
  href: "/security",
  cta: "learn more",
  background: (
    <img
      className="absolute -right-20 -top-20 opacity-60"
      src="/images/security.png" 
      alt="Security background"
    />
  ),
  className: "lg:row-start-1 lg:row-end-2 lg:col-start-3 lg:col-end-4",
},
  {
    Icon: SquareLibrary,
    name: "Centralized Submission",
    description:
      "Students can submit all project files and reports in one place, with version control.",
    href: "/",
    cta: "go to submission",
    background: (
      <img
        className="absolute -right-20 -top-20 opacity-60"
        src="/images/Submission.png"
        alt="Submission"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  
  {
    Icon: GlobeIcon,
    name: "University-Wide Platform",
    description:
      "Built to serve all faculties and departments in both Arabic and English.",
    href: "/",
    cta: "start using",
    background: (
      <img
        className="absolute -right-20 -top-20 opacity-60"
        src="/images/Platform.png"
        alt="Platform background"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  
  {
    Icon: BellIcon,
    name: "Notifications & Reminders",
    description:
      "Students and supervisors get alerts for deadlines, comments, and updates.",
    href: "/",
    cta: " get notified",
    background: (
      <img
        className="absolute -right-20 -top-20 opacity-60"
        src="/images/Notifications.png"
        alt="Notifications img"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },

];

export function BentoDemo() {
  return (
    <div className="relative h-full w-full">
      <div className="text-center px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-6">
            Why Use <span className="text-green-400">Gradly</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Revolutionizing academic collaboration with cutting-edge technology and 
            seamless project management for students and researchers worldwide.
          </p>
        </motion.div>
      </div>
      <BentoGrid className="lg:grid-rows-3 h-full px-32 pb-32">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
}