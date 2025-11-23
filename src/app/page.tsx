"use client";
import { AboutSection } from "@/sections/About";
import { aboutSectionId, contactSectionId, heroSectionId, projectsSectionId } from "@/sections/constants";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { useState } from "react";

export default function Home() {
    const [activeSectionId, setActiveSectionId] = useState<string>(heroSectionId);
    return (
        <main id="main-content">
            <Header activeSectionId={activeSectionId} setActiveSectionId={setActiveSectionId} />
            <HeroSection id={heroSectionId} />
            <section aria-label="Featured projects">
                <ProjectsSection id={projectsSectionId} />
            </section>
            <section aria-label="Skills and technologies">
                <TapeSection />
            </section>
            <section aria-label="About me and experience">
                <AboutSection id={aboutSectionId} />
            </section>
            <section aria-label="Contact information">
                <ContactSection id={contactSectionId} />
            </section>
            <Footer />
        </main>
    );
}
