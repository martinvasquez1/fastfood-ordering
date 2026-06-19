"use client";

import LandingMenu from "../components/landing-menu/landing-menu";
import HeroSection from "../components/hero/HeroSection";
import StepsSection from "../components/pasos/StepsSection";
import CatalogSection from "../components/catalogo/CatalogSection";

export default function Home() {
    return (
        <div>
            <HeroSection />
            <StepsSection />
            <CatalogSection />
            <LandingMenu />
        </div>
    )
}