"use client"
import Ai from "@/components/ui/ai";
import { FeaturesSectionDemo } from "@/components/ui/feature";
import Footer from "@/components/ui/footer";
import { Hero } from "@/components/ui/hero";
import { HeroVideoDialog } from "@/components/ui/hero-vid";
import NavbarDemo from "@/components/ui/navbar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { StickyBanner } from "@/components/ui/sticky-msg";
import { BentoDemo } from "@/components/ui/why-grads";
import React from "react";

export default function home() {
    return (
        <div className="flex flex-col min-h-screen font-[var(--font-geist-sans)] bg-black/95 scroll-smooth">
            <StickyBanner className="bg-gradient-to-b from-teal-950 to-green-900">
                <p className="mx-0 max-w-[90%] text-white drop-shadow-md text-center">
                    The beta version of the platform has officially launched 🚀
                    !!{" "}
                    <a
                        href="#"
                        className="transition duration-200 hover:underline"
                    >
                        start exploring now!
                    </a>
                </p>
            </StickyBanner>
            <ScrollProgress />
            <header className="sticky top-0 z-[998] p-8 ">
                <NavbarDemo />
            </header>
            <main className="w-full mx-auto overflow-hidden pb-40">
                <Hero />
            </main>
            <div className="relative max-w-7xl max-h-screen mx-auto mt-60 pb-40 ">
                <HeroVideoDialog
                    className="block"
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/Pu8sE5uhziU"
                    thumbnailSrc="https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2RNK1P0BYVrSCZEy_Sd1Ew%252F3417757448_4a6bdf36ce_o.jpg&width=910"
                    thumbnailAlt="Hero Video"
                />
            </div>
            <div className="scroll-mt-32 pb-32" id="features">
                <FeaturesSectionDemo />
            </div>
            <div className="overflow-visible scroll-mt-28" id="Gradly-ai">
                <Ai></Ai>
            </div>
            <div id="why-grads" className="scroll-mt-32">
                <BentoDemo />
            </div>
            <footer className="p-32">
                <Footer />
            </footer>
        </div>
    );
}
