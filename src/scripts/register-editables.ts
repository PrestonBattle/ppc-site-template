
import { registerAstroComponent } from "@cloudcannon/editable-regions/astro";

import HeroSplit from "@page-sections/heroes/hero-split/HeroSplit.astro";
import HeroCenter from "@page-sections/heroes/hero-center/HeroCenter.astro";
import FeatureGrid from "@page-sections/features/feature-grid/FeatureGrid.astro";
import FeatureSplit from "@page-sections/features/feature-split/FeatureSplit.astro";
import FeatureSlider from "@page-sections/features/feature-slider/FeatureSlider.astro";
import InsuranceBlock from "@page-sections/info-blocks/insurance-block/InsuranceBlock.astro";
import FaqSection from "@page-sections/info-blocks/faq-section/FaqSection.astro";
import TestimonialSection from "@page-sections/people/testimonial-section/TestimonialSection.astro";
import TeamGrid from "@page-sections/people/team-grid/TeamGrid.astro";
import CtaForm from "@page-sections/ctas/cta-form/CtaForm.astro";
import CtaCenter from "@page-sections/ctas/cta-center/CtaCenter.astro";
import CtaSplit from "@page-sections/ctas/cta-split/CtaSplit.astro";
import CustomSection from "@builders/custom-section/CustomSection.astro";

registerAstroComponent("page-sections/heroes/hero-split", HeroSplit);
registerAstroComponent("page-sections/heroes/hero-center", HeroCenter);
registerAstroComponent("page-sections/features/feature-grid", FeatureGrid);
registerAstroComponent("page-sections/features/feature-split", FeatureSplit);
registerAstroComponent("page-sections/features/feature-slider", FeatureSlider);
registerAstroComponent("page-sections/info-blocks/insurance-block", InsuranceBlock);
registerAstroComponent("page-sections/info-blocks/faq-section", FaqSection);
registerAstroComponent("page-sections/people/testimonial-section", TestimonialSection);
registerAstroComponent("page-sections/people/team-grid", TeamGrid);
registerAstroComponent("page-sections/ctas/cta-form", CtaForm);
registerAstroComponent("page-sections/ctas/cta-center", CtaCenter);
registerAstroComponent("page-sections/ctas/cta-split", CtaSplit);
registerAstroComponent("page-sections/builders/custom-section", CustomSection);