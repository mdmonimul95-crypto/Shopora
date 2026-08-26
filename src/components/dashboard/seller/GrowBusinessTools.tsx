import { ArrowUpRight, BarChart3, Bell, Package, Sparkles, Tag } from 'lucide-react'
import React from 'react'


const growthTools = [
  {
    title: "AI Description Generator",
    description: "Generate SEO-friendly product descriptions in seconds.",
    action: "Try Now",
    icon: <Sparkles size={24} />,
    bg: "bg-[#E8F7F4]",
    color: "text-[#0F766E]",
  },
  {
    title: "AI Product Recommendations",
    description: "Get AI-powered product recommendations for your store.",
    action: "View Recommendations",
    icon: <Package size={24} />,
    bg: "bg-[#E8F7F4]",
    color: "text-[#0F766E]",
  },
  {
    title: "Inventory Alerts",
    description: "Get notified when stock is low to avoid running out.",
    action: "Manage Alerts",
    icon: <Bell size={24} />,
    bg: "bg-[#EAF3FF]",
    color: "text-[#3B82F6]",
  },
  {
    title: "Coupons & Discounts",
    description: "Create and manage coupons to boost sales.",
    action: "Manage Coupons",
    icon: <Tag size={24} />,
    bg: "bg-[#E8F7F4]",
    color: "text-[#0F766E]",
  },
  {
    title: "Sales Analytics",
    description: "Deep insights into your store performance and growth.",
    action: "View Analytics",
    icon: <BarChart3 size={24} />,
    bg: "bg-[#E8F7F4]",
    color: "text-[#0F766E]",
  },
];

const GrowBusinessTools = () => {
  return (
     <div className="mt-5">

          <h2 className="mb-4 font-['Poppins'] text-[18px] font-semibold text-[#1E293B]">
            Powerful Tools to Grow Your Business
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

            {growthTools.map((tool) => (
              <div
                key={tool.title}
                className="rounded-xl border border-[#E8EEEE] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >

                <div className="flex items-start gap-4">

                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${tool.bg} ${tool.color}`}
                  >
                    {tool.icon}
                  </div>

                  <div className="min-w-0">

                    <h3 className="font-['Poppins'] text-[14px] font-semibold leading-5 text-[#1E293B]">
                      {tool.title}
                    </h3>

                    <p className="mt-2 font-['Poppins'] text-[14px] leading-5 text-[#64748B]">
                      {tool.description}
                    </p>

                    <button
                      type="button"
                      className="mt-4 flex items-center gap-2 font-['Poppins'] text-[14px] font-semibold text-[#0F766E]"
                    >
                      {tool.action}
                      <ArrowUpRight size={16} />
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
  )
}

export default GrowBusinessTools