import React from "react";
import Banner from "../cart/components/Banner";
import Benefits from "../cart/components/Benefits";
import FadeInSection from "../layouts/FadeInSection";
import FeaturedProducts from "../cart/components/FeaturedProducts";
import FeaturedReviews from "../cart/components/FeaturedReviews";
import CandleGuide from "../cart/components/MedicineGuide";
import SectionSpacer from "../cart/components/SectionSpacer";

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
