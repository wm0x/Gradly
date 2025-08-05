
import { motion } from "framer-motion";
import {
  FilePlus2,        
  LayoutList,       
  FileText,         
  Search,           
  Filter,           
} from "lucide-react";
import { Signal } from 'lucide-react';
import { SmoothCursor } from "./cursor";
import { cn } from "@/lib/utils";



export function FeaturesSectionDemo() {
const features = [
  {
    title: "Project Submission and Editing",
    description: "A simple form where users can add new projects or update existing ones...",
    icon: <FilePlus2 className="w-6 h-6" />,
  },
  {
    title: "Project Listing Page",
    description: "A paginated list that shows every project’s title, status badge...",
    icon: <LayoutList className="w-6 h-6" />,
  },
  {
    title: "Project Detail View",
    description: "A dedicated page for each project displaying all its information in full...",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "Search Functionality",
    description: "A basic search box that looks through project titles, problems, and solutions...",
    icon: <Search className="w-6 h-6" />,
  },
  {
    title: "Filter and Sort Controls",
    description: "Controls to filter projects by status and sort by date or title...",
    icon: <Filter className="w-6 h-6" />,
  },
  {
    title: "24/7 online",
    description: "We are available 100% of the time.",
    icon: <Signal className="w-6 h-6" />,
  },
];
  return (
    <section className="relative py-20 overflow-hidden tsxt-center">
      <SmoothCursor />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl opacity-20 animate-float-delay"></div>
      </div>

        <h2 className="text-4xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-white text-center mx-auto pb-20 mb-10 overflow-visible">
          

          Features
        
            
        </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "flex flex-col lg:border-r py-10 px-8 relative group/feature border-neutral-800 hover:bg-neutral-900/50 transition-all duration-300",
        (index === 0 || index === 4) && "lg:border-l border-neutral-800",
        index < 4 && "lg:border-b border-neutral-800"
      )}
    >
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover/feature:opacity-100 transition-opacity duration-300 pointer-events-none border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent" />
      
      <motion.div 
        whileHover={{ scale: 1.1 }}
        className="mb-6 relative z-10 text-green-400 p-3 bg-neutral-800 rounded-lg w-12 h-12 flex items-center justify-center"
      >
        {icon}
      </motion.div>
      
      <div className="text-xl font-bold mb-3 relative z-10">
        <span className="relative inline-block text-neutral-100">
          {title}
          <motion.span 
            className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.05 }}
          />
        </span>
      </div>
      
      <p className="text-neutral-400 relative z-10">
        {description}
      </p>
      
      <div className="absolute right-4 top-4 opacity-0 group-hover/feature:opacity-100 transition-opacity duration-300">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2 + i, repeat: Infinity }}
            className="w-1 h-1 bg-green-400 rounded-full mb-1"
          />
        ))}
      </div>
    </motion.div>
  );
};