import React from "react";
import Banner from "./components/Banner";
import Benefits from "./components/Benefits";
import FadeInSection from "../layouts/FadeInSection";
import HowItWorksAndResults from "./components/HowItWorksAndResults";
import FeaturedReviews from "./components/FeaturedReviews";
import CandleGuide from "./components/MedicineGuide";
import SectionSpacer from "./components/SectionSpacer";

const HomePage: React.FC = () => (
  <>
    <Banner />

    <FadeInSection>
      <Benefits />
    </FadeInSection>

    <SectionSpacer />

    <FadeInSection>
      <CandleGuide />
    </FadeInSection>

    <SectionSpacer />

    <FadeInSection>
      <HowItWorksAndResults />
    </FadeInSection>

    <SectionSpacer />

    <FadeInSection>
      <FeaturedReviews />
    </FadeInSection>
  </>
);

export default HomePage;
