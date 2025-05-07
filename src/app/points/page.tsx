import PointsHeader from "@/components/points/points-header"
import PointsExplained from "@/components/points/points-explained"
import PointsLeaderboard from "@/components/points/points-leaderboard"
import PointsHistory from "@/components/points/points-history"
import PointsRewards from "@/components/points/points-rewards"

export default function PointsPage() {
  return (
    <div className="pt-20 pb-16">
      <PointsHeader />
      <PointsExplained />
      <PointsLeaderboard />
      <PointsRewards />
      <PointsHistory />
    </div>
  )
}
