const AppFooter: React.FC = () => {
  return (
    <footer className="bg-[#f7f5f0] text-[#1f2937] mt-12">
      <div className="max-w-full mx-auto px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left: About (wide) */}
          <div className="md:col-span-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 border rounded-sm flex items-center justify-center text-lg font-bold">
                C
              </div>
              <div>
                <div className="font-semibold mb-4">ABOUT CUURE</div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>
                    <a href="/about" className="hover:underline">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Our Mission
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Research & Development
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Science & Technology
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Our Commitments
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Integrative Health
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Why Supplementing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Our Athletes
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Center columns: Offer + Help */}
          <div className="md:col-span-2">
            <div className="font-semibold mb-4">OUR OFFER</div>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Experience
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Our Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cuure App
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Our Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="font-semibold mb-4">NEED HELP</div>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Customer Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Press and Partnerships
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Professionals
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Ambassador Programme
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Career Center
                </a>
              </li>
            </ul>
          </div>

          {/* Right: Terms + Payments */}
          <div className="md:col-span-3">
            <div className="font-semibold mb-4">TERMS</div>
            <ul className="text-sm text-gray-700 space-y-2 mb-4">
              <li>
                <a href="#" className="hover:underline">
                  Terms and conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Data Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cookie preferences
                </a>
              </li>
            </ul>

            <div className="font-semibold text-sm mb-3">SECURED PAYMENTS</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-white flex items-center justify-center text-xs rounded shadow">
                VISA
              </div>
              <div className="w-10 h-6 bg-white flex items-center justify-center text-xs rounded shadow">
                MC
              </div>
              <div className="w-10 h-6 bg-white flex items-center justify-center text-xs rounded shadow">
                AMEX
              </div>
              <div className="w-14 h-6 bg-white flex items-center justify-center text-xs rounded shadow">
                PayPal
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer box centered */}
        <div className="mt-8 flex justify-center">
          <div className="w-full md:w-3/4 border rounded p-4 text-center text-sm text-gray-600 bg-white">
            Our products are not intended to diagnose, treat, cure or prevent
            disease. If you are unwell, pregnant, or breastfeeding, consult your
            GP or healthcare provider before taking any dietary supplements.
          </div>
        </div>

        {/* Bottom copyright and small print */}
        <div className="mt-6 text-xs text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Cuure. All rights reserved.</div>
          <div className="text-center">
            Groupe Well SAS, 83 bd de Sébastopol, 75002 Paris
          </div>
          <div>RCS Paris B 849 602 917</div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
