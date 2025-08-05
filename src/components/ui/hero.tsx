"use client";
import React from "react";
import { Spotlight } from "./spotlight";
import { cn } from "@/lib/utils";
import { PointerHighlight } from "./text-pointer-animation";

export function Hero() {
    return (
        <div className="flex flex-col size-full items-center justify-center overflow-hidden rounded-lg p-20 pt-20">
            <div className="absolute flex h-screen w-full items-center justify-center mt-30 -translate-y-[-20%]">
                <div
                    className={cn(
                        "absolute inset-0",
                        "[background-size:20px_20px]",
                        "[background-image:radial-gradient(#1d1d1d_1px,transparent_1px)]",
                        "dark:[background-image:radial-gradient(#1d1d1d_1px,transparent_1px)]",
                        "[mask-image:radial-gradient(circle,rgba(0,0,0,1)_20%,rgba(0,0,0,0)_80%)]",
                        "mask-image-[radial-gradient(circle,rgba(0,0,0,1)_20%,rgba(0,0,0,0)_80%)]",
                        "mask-repeat-no-repeat mask-position-center"
                    )}
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center  [mask-image:radial-gradient(ellipse_at_center,transparent_100%,black)] bg-[#1d1d1d]"></div>
                <div className="absolute h-screen w-full rounded-md flex md:items-center md:justify-center bg-transparent antialiased bg-grid-white/[0.02] overflow-hidden">
                    <Spotlight />
                    <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 translate-y-32 md:translate-y-0">
                        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-[#ffffff] via-[#ffffff] to-[#ffffff] ">
                            All Graduation Projects <br />
                        </h1>
                        <PointerHighlight> In One Place </PointerHighlight>
                        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
                            Browse – search – and submit graduation projects.{" "}
                            <br />
                            <span className="bg-gradient-to-r from-[#4caf50] to-[#8bc34a] bg-clip-text text-transparent">
                                A platform that keeps every great idea alive.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
