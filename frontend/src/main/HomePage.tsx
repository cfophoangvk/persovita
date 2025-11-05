import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { syncLocalCartToServer } from "../cart/services/cartService";
import Banner from "./components/Banner";
import FadeInSection from "./components/FadeInSection";
import HowItWorksAndResults from "./components/HowItWorksAndResults";
import FeaturedReviews from "./components/FeaturedReviews";
import FAQSection from "./components/FAQSection";
import CandleGuide from "./components/MedicineGuide";
import SectionSpacer from "./components/SectionSpacer";
import { Partners } from "./components/Partners";

const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If redirected back from OAuth with ?syncCart=1, trigger migration
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      if (params.get("syncCart") === "1") {
        (async () => {
          try {
            await syncLocalCartToServer();
          } catch (e) {
            console.warn("syncLocalCartToServer failed on oauth return", e);
          }
          // remove syncCart param so it doesn't run again on refresh
          params.delete("syncCart");
          const newSearch = params.toString();
          const newUrl =
            window.location.pathname + (newSearch ? `?${newSearch}` : "");
          window.history.replaceState({}, "", newUrl);
        })();
      }
    } catch (e) {
      console.warn("Failed to parse syncCart param", e);
    }
    // only run when location.search changes
  }, [location.search]);

  return (
    <>
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

      <FadeInSection>
        <FAQSection />
      </FadeInSection>

      <SectionSpacer />

      <FadeInSection>
        <Partners />
      </FadeInSection>
    </>
  );
};

export default HomePage;
