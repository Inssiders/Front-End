import AboutFeatures from "@/components/about/about-features";
import AboutHeader from "@/components/about/about-header";
import AboutMission from "@/components/about/about-mission";
import AboutTeam from "@/components/about/about-team";

export default function AboutPage() {
  return (
    <div>
      <AboutHeader />
      <AboutMission />
      <AboutFeatures />
      <AboutTeam />
      {/* <AboutCTA /> */}
    </div>
  );
}
