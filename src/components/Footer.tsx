import { ShoppingBag } from "lucide-react";


const shopLinks = [
  "All Products",
  "Deals of the Day",
  "New Arrivals",
  "Top Rated",
  "Best Sellers",
];

const customerLinks = [
  "Track Order",
  "Shipping & Delivery",
  "Returns & Refunds",
  "FAQs",
  "Contact Us",
];

const companyLinks = [
  "About Us",
  "Careers",
  "Privacy Policy",
  "Terms & Conditions",
  "Cookie Policy",
];



const Footer = () => {
  return (
    <footer className="border-t border-[#E8EEEE] bg-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F766E]">
                <ShoppingBag
                  size={21}
                  strokeWidth={2}
                  className="text-[#FF6B6B]"
                />
              </div>

              <div>
                <h2 className="font-['Poppins'] text-base font-bold leading-4 text-[#1E293B]">
                  Shopora
                </h2>

                <p className="font-['Poppins'] text-[6px] text-[#94A3B8]">
                  Smart Shopping, Made Simple
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="mt-5 max-w-47.5 font-['Poppins'] text-[14px] leading-5 text-[#64748B] ">
              Your one-stop destinatix-won for smart, secure and simple online
              shopping.
            </p>

        
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-['Poppins'] text-xs font-semibold text-[#1E293B] sm:text-sm">
              Shop
            </h3>

            <ul className="mt-4 space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-['Poppins'] text-[14px] text-[#64748B] transition-colors duration-300 hover:text-[#0F766E] "
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-['Poppins'] text-xs font-semibold text-[#1E293B] sm:text-sm">
              Customer Service
            </h3>

            <ul className="mt-4 space-y-2.5">
              {customerLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-['Poppins'] text-[14px] text-[#64748B] transition-colors duration-300 hover:text-[#0F766E] "
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-['Poppins'] text-xs font-semibold text-[#1E293B] sm:text-sm">
              Company
            </h3>

            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-['Poppins'] text-[14px] text-[#64748B] transition-colors duration-300 hover:text-[#0F766E] "
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Secure Payments */}
          <div>
            <h3 className="font-['Poppins'] text-xs font-semibold text-[#1E293B] sm:text-sm">
              Secure Payments
            </h3>

            {/* Payment Methods */}
            <div className="mt-4 flex flex-wrap gap-2">

              <div className="flex h-8 w-12 items-center justify-center rounded-md border border-[#E8EEEE] bg-[#F8FAFC]">
                <span className="font-['Poppins'] text-[10px] font-bold italic text-[#2563EB]">
                  VISA
                </span>
              </div>

              <div className="flex h-8 w-12 items-center justify-center rounded-md border border-[#E8EEEE] bg-[#F8FAFC]">
                <div className="flex items-center">
                  <span className="h-3 w-5 rounded-full bg-[#EB001B]" />
                  <span className="-ml-2 h-3 w-5 rounded-full bg-[#F79E1B] opacity-90" />
                </div>
              </div>

              <div className="flex h-8 w-12 items-center justify-center rounded-md border border-[#E8EEEE] bg-[#F8FAFC]">
                <span className="font-['Poppins'] text-[8px] font-bold italic text-[#0070BA]">
                  PayPal
                </span>
              </div>

              <div className="flex h-8 w-12 items-center justify-center rounded-md border border-[#E8EEEE] bg-[#F8FAFC]">
                <span className="font-['Poppins'] text-[9px] font-bold text-[#635BFF]">
                  stripe
                </span>
              </div>

            </div>

            {/* Security Text */}
            <p className="mt-4 max-w-47.5 font-['Poppins'] text-[14px] leading-5 text-[#64748B] ">
              We protect your payment information with industry-leading
              security.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-[#E8EEEE]">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
          <p className="font-['Poppins'] text-[9px] text-[#94A3B8] sm:text-[10px]">
            © 2026 Shopora. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;