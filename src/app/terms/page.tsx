import TermsContent from "@/app/terms/_components/terms-content";
import TermsHeader from "@/app/terms/_components/terms-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "인싸이더 이용약관",
  description: "인싸이더 이용약관",
};

export default function TermsPage() {
  return (
    <div className="pt-20 pb-16">
      <TermsHeader />
      <TermsContent />
    </div>
  );
}
