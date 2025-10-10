import React from "react";
import Banner from "./components/Banner";
import Benefits from "./components/Benefits";
import FadeInSection from "../layouts/FadeInSection";
import FeaturedProducts from "./components/FeaturedProducts";
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
      <FeaturedProducts />
    </FadeInSection>

    <SectionSpacer />

    <FadeInSection>
      <FeaturedReviews />
    </FadeInSection>
  </>
);

export default HomePage;
