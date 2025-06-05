import SettingsContent from "@/components/settings/settings-content";
import SettingsHeader from "@/components/settings/settings-header";
import SettingsLoading from "@/components/settings/settings-loading";
import { authOptions } from "@/utils/next-auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="pb-10">
      <SettingsHeader />
      <Suspense fallback={<SettingsLoading />}>
        <SettingsContent user={session.user} />
      </Suspense>
    </div>
  );
}
