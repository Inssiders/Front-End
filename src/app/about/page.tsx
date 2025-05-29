import AboutFeatures from "@/components/about/about-features";
import AboutHeader from "@/components/about/about-header";
import AboutMission from "@/components/about/about-mission";
import AboutTeam from "@/components/about/about-team";

export default function AboutPage() {
  return (
    <div className="pt-20 pb-16">
      <AboutHeader />
      <AboutMission />
      <AboutFeatures />
      <AboutTeam />
      {/* <AboutCTA /> */}
    </div>
  );
}
