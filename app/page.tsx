import HeroSection from "@/components/home/hero-section"
import TrendingSection from "@/components/home/trending-section"
import CategoriesSection from "@/components/home/categories-section"
import ChallengesSection from "@/components/home/challenges-section"
import CreatorsSection from "@/components/home/creators-section"
import DownloadAppSection from "@/components/home/download-app-section"

export default function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <TrendingSection />
      <CategoriesSection />
      <ChallengesSection />
      <CreatorsSection />
      <DownloadAppSection />
    </div>
  )
}
