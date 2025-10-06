import React from "react";

const MedicineGuide: React.FC = () => (
  // Retaining the background gradient and layout
  <div className="max-w-7xl mx-auto px-6 py-12 bg-gradient-to-r from-white to-white/90 rounded-lg shadow-xl">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* --- Main Content Column --- */}
      <div>
        <h2 className="text-3xl font-extrabold text-orange-700">
          Guide to Safe Medication Use
        </h2>
        <p className="text-gray-600 mt-4 text-lg">
          Essential advice on dosage, timing, and storage of medicine. Ensure
          optimal treatment effectiveness and minimize risks.
        </p>
        <div className="mt-8">
          <a
            href="/consultation" // Link change
            className="inline-block px-7 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-semibold transition duration-300 shadow-md"
          >
            Learn More About Health
          </a>
        </div>
      </div>

      {/* --- Quick Tips Column --- */}
      <div className="bg-blue-50 rounded-xl p-8 shadow-inner">
        <h3 className="text-xl font-bold text-orange-800 mb-4">
          3 Golden Rules for Taking Medicine
        </h3>
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-start">
            <span className="text-orange-600 font-extrabold mr-3 text-lg">
              •
            </span>
            <p>
              **Correct Dosage:** Always adhere to the dosage and frequency
              prescribed by your doctor or pharmacist.
            </p>
          </li>
          <li className="flex items-start">
            <span className="text-orange-600 font-extrabold mr-3 text-lg">
              •
            </span>
            <p>
              **Timing is Key:** Take medication at the right time (before/after
              meals) as directed for the best effectiveness.
            </p>
          </li>
          <li className="flex items-start">
            <span className="text-orange-600 font-extrabold mr-3 text-lg">
              •
            </span>
            <p>
              **Check Expiry:** Do not use medication that is expired or shows
              signs of damage.
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default MedicineGuide;
