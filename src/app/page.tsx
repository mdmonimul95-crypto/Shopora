import AIFeatureShowcase from "@/components/homepage/AIFeatureShowcase";
import CategoryShowCase from "@/components/homepage/CategoryShowCase";
import CustomerTrust from "@/components/homepage/CustomerTrust";
import DealsOfTheDay from "@/components/homepage/DealsOfTheDay";
import Hero from "@/components/homepage/Hero";
import Newsletter from "@/components/homepage/Newsletter";
import PopularProducts from "@/components/homepage/PopularProducts";
import PowerOfAi from "@/components/homepage/PowerOfAi";



export default function Home() {
  return (
    <>
    <Hero></Hero>
    <CategoryShowCase></CategoryShowCase>
    <DealsOfTheDay></DealsOfTheDay>
    <AIFeatureShowcase></AIFeatureShowcase>
    <PowerOfAi></PowerOfAi>
    <PopularProducts></PopularProducts>
    <CustomerTrust></CustomerTrust>
    <Newsletter></Newsletter>
    </>
  );
}
