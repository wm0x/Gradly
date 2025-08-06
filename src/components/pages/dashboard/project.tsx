"use client";

import { CometCard } from "@/components/ui/CometCard";
import { ProjectSearch } from "@/components/ui/ProjectSearch";
import React, { useState, useEffect } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  status: string;
  finalReportUrl: string;
  coverImageUrl?: string | null;
  userId: string;
  createdAt: string;
  imageSrc?: string; 
  user?: User; 
  username?: string;
};
type User = {
    id: string;
    name?: string | null;
    username: string;
  };
export default function DashboardProjects() {
  const [searchWord, setSearchWord] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data: Project[] = await res.json();
        const transformed = data.map((proj) => ({
          ...proj,
          imageSrc: proj.coverImageUrl || "", 
          username: proj.user?.name || proj.user?.username || "User",
          userImage: "", 
        }));

        setProjects(transformed);
        setError(null);
      } catch  {
        setError("error there");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchWord.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex items-start justify-between p-4 gap-4 w-full">
      <div className="flex-1 flex flex-col gap-6">
        <ProjectSearch onSearch={setSearchWord} />

        {loading && (
          <div className="text-center text-white py-10">Loading projects...</div>
        )}
        {error && (
          <div className="text-center text-red-500 py-10">{error}</div>
        )}

        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 px-12 mb-28"
          dir="ltr"
        >
          {!loading && !error && filteredProjects.length === 0 ? (
            <div className="text-white text-center col-span-full text-2xl py-10 ">
              <span className="border p-2 rounded-xl border-green-600 text-gray-600 ">
                not found
              </span>{" "}
              !!
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <CometCard
                    id={project.id}
                    key={project.id || index}
                    title={project.title}
                    description={project.description}
                    imageSrc={project.imageSrc || ""}
                    username={project.username || ""}  
                    status={project.status} 
                    createdAt={project.createdAt} 
                    finalReportUrl={project.finalReportUrl} 
                    userId={project.userId}                
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
