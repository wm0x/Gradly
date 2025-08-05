import React from "react";
import {
    FiLayers,
    FiCalendar,
    FiClock,
    FiTrendingUp,
} from "react-icons/fi";
import { getProjectStats } from "../api/action/dashboard/info";
import { GrProjects } from "react-icons/gr";

export default async function DashboardHome() {
    const stats = await getProjectStats();


    return (
        <div className="bg-[#0e0e0e] p-6 w-full min-h-screen flex flex-col">
            {/* header */}
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h1 className="text-white text-2xl md:text-3xl font-bold">
                    <span className=" ">
                        Dashboard
                    </span>
                </h1>
                <div className="text-white/50 text-xs md:text-sm">
                    {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="bg-[#1a1a1a] p-4 md:p-6 rounded-xl border border-white/5 duration-300 hover:border-emerald-500/30 transition-all group hover:shadow-lg hover:shadow-emerald-500/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white/70 text-xs md:text-sm mb-1">
                                Total Projects
                            </p>
                            <h3 className="text-xl md:text-2xl font-bold text-white">
                                {stats.totalProjects}
                            </h3>
                        </div>
                        <div className="p-2 md:p-3 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 duration-300">
                            <FiLayers size={20} className="md:w-6 md:h-6" />
                        </div>
                    </div>
                    <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/5">
                        <p className="text-xs text-white/50 flex items-center">
                            <FiTrendingUp className="mr-1" /> 12% from last
                            month
                        </p>
                    </div>
                </div>

                <div className="bg-[#1a1a1a] p-4 md:p-6 rounded-xl border border-white/5 duration-300 hover:border-cyan-500/30 transition-all group hover:shadow-lg hover:shadow-cyan-500/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white/70 text-xs md:text-sm mb-1">
                                Today Projects
                            </p>
                            <h3 className="text-xl md:text-2xl font-bold text-white">
                                {stats.todayProjects}
                            </h3>
                        </div>
                        <div className="p-2 md:p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 duration-300">
                            <GrProjects size={20} className="md:w-6 md:h-6" />
                        </div>
                    </div>
                    <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/5">
                        <p className="text-xs text-white/50 flex items-center">
                            <FiClock className="mr-1" /> Updated in real-time
                        </p>
                    </div>
                </div>

                <div className="bg-[#1a1a1a] p-4 md:p-6 rounded-xl border border-white/5 duration-300 hover:border-purple-500/30 transition-all group hover:shadow-lg hover:shadow-purple-500/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white/70 text-xs md:text-sm mb-1">
                                {new Date().getFullYear()} Projects
                            </p>
                            <h3 className="text-xl md:text-2xl font-bold text-white">
                                {stats.yearlyProjects}
                            </h3>
                        </div>
                        <div className="p-2 md:p-3 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 duration-300">
                            <FiCalendar size={20} className="md:w-6 md:h-6" />
                        </div>
                    </div>
                    <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/5">
                        <p className="text-xs text-white/50">
                            On track for{" "}
                            {Math.round(stats.yearlyProjects * 1.3)} annual
                            projects
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div className="bg-gradient-to-r from-[#1a1a1a] to-[#1e1e1e] p-4 md:p-6 rounded-xl border border-white/5 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg md:text-xl font-semibold text-white flex items-center">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                            Last ( {" "} {stats.lastProjects.length} {" "}) Projects 
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {stats.lastProjects.map((project, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-lg bg-[#1e1e1e] border border-white/5 hover:border-emerald-500/20 transition-colors"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                            <h3 className="text-lg font-bold text-white truncate">
                                                {project.title}
                                            </h3>
                                            <span className="px-2 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 sm:ml-2 flex-shrink-0 inline-flex items-center justify-center ">
                                                @{project.user.username}
                                            </span>
                                        </div>
                                        <p className="text-white/70 text-sm mt-1 line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end gap-4">
                                        <div className="text-right min-w-[100px]">
                                            <p className="text-white/50 text-xs">
                                                Added on
                                            </p>
                                            <p className="text-white text-sm font-medium">
                                                {new Date(
                                                    project.date
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-white/5 text-center pb-5">
                <p className="text-white/50 text-xs md:text-sm">
                    Dashboard updated at {new Date().toLocaleTimeString()}
                </p>
            </div>
        </div>
    );
}