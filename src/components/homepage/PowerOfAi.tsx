
import { AiPower } from "@/type/homePage";
import {
  BrainCircuit,
  FilePenLine,
  MessageCircle,
  ImageIcon,
} from "lucide-react";

import React from "react";

const aiFeatures: AiPower[] = [
  {
    id: "personalized-recommendations",
    icon: BrainCircuit,
    title: "Personalized\nRecommendations",
    description: "Get product suggestions based on your taste",
  },
  {
    id: "ai-product-description",
    icon: FilePenLine,
    title: "AI Product Description",
    description: "Generate SEO-friendly descriptions and tags",
  },
  {
    id: "conversational-assistant",
    icon: MessageCircle,
    title: "Conversational Assistant",
    description: "Ask anything and get instant help",
  },
  {
    id: "visual-product-search",
    icon: ImageIcon,
    title: "Visual Product Search",
    description: "Find products by uploading an image",
  },
];

const PowerOfAi = () => {
  return (
    <section className="bg-white px-4 py-15 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-6 text-center">
          <h2 className="font-['Poppins'] text-lg font-semibold tracking-tight text-[#1E293B] sm:text-xl md:text-2xl">
            Experience the Power of AI
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {aiFeatures.map((feature, index) => {
            const Icon = feature.icon;

            const isAccent = index % 2 !== 0;

            return (
              <div
                key={feature.id}
                className="group flex min-h-43.75 flex-col items-center rounded-xl border border-[#E8EEEE] bg-white px-5 py-4 text-center shadow-[0_2px_12px_rgba(15,118,110,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#CFE7E4] hover:shadow-[0_8px_25px_rgba(15,118,110,0.10)]"
              >
                {/* Icon */}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 ${
                    isAccent
                      ? "bg-[#FFF0F0] text-[#FF6B6B]"
                      : "bg-[#E8F5F3] text-[#0F766E]"
                  }`}
                >
                  <Icon
                    size={23}
                    strokeWidth={1.8}
                  />
                </div>

                {/* Title */}
                <h3
                  className={`mt-3 whitespace-pre-line font-['Poppins'] text-[18px] md:text-[16px] font-semibold leading-4 text-[#1E293B]  ${
                    feature.title.includes("\n") ? "max-w-37.5" : ""
                  }`}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-1.5 max-w-43.75 font-['Poppins'] text-[12px] leading-4 text-[#94A3B8] md:text-[14px]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PowerOfAi;