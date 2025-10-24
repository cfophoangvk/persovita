import React, { useEffect } from "react";
import Banner from "./components/Banner";
import FadeInSection from "../layouts/FadeInSection";
import HowItWorksAndResults from "./components/HowItWorksAndResults";
import FeaturedReviews from "./components/FeaturedReviews";
import FAQSection from "./components/FAQSection";
import CandleGuide from "./components/MedicineGuide";
import SectionSpacer from "./components/SectionSpacer";

const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return <>
    <Banner />

    <FadeInSection>
      <HowItWorksAndResults />
    </FadeInSection>

    <SectionSpacer />

    <FadeInSection>
      <CandleGuide />
    </FadeInSection>

    <SectionSpacer />

    <FadeInSection>
      <FeaturedReviews />
    </FadeInSection>

    <SectionSpacer />

    <FadeInSection>
      <FAQSection />
    </FadeInSection>
  </>
}

export default HomePage;
