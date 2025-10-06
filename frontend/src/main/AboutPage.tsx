import React from "react";
import FadeInSection from "../layouts/FadeInSection";

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <FadeInSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-[#f28d3d] mb-4">
              About Our Pharmacy
            </h1>
            <p className="text-gray-700 mb-4 text-lg">
              We are a licensed, family-owned pharmacy dedicated to providing
              high-quality, genuine medicines and supplements. Our pharmacists
              are trained professionals who ensure every product we stock meets
              strict quality and safety standards.
            </p>
            <p className="text-gray-700 mb-4">
              We source products from reputable manufacturers, perform careful
              batch verification, and store items under optimal conditions.
              Whether you need prescription medication, trusted supplements, or
              expert advice, our team is here to help.
            </p>
            <p className="text-gray-700 mb-6">
              Fast shipping, transparent pricing, and attentive customer care
              are the pillars of our service. If you have any concerns about
              interactions, pregnancy, or pre-existing conditions, please
              consult with our pharmacists or your healthcare provider before
              taking any new medicine or supplement.
            </p>
            <div className="flex gap-3">
              <a
                href="/shop"
                className="px-5 py-3 bg-[#f28d3d] text-white rounded-full font-semibold"
              >
                Browse products
              </a>
              <a
                href="/contact"
                className="px-5 py-3 border border-gray-300 rounded-full text-gray-700"
              >
                Contact us
              </a>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-3">Our Commitments</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Only licensed, GMP-compliant suppliers</li>
              <li>
                Pharmacist review available for prescriptions and interactions
              </li>
              <li>Secure packaging and fast delivery</li>
              <li>Clear labelling and storage guidance</li>
            </ul>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default AboutPage;
