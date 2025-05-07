import FaqHeader from "@/components/faq/faq-header"
import FaqContent from "@/components/faq/faq-content"
import FaqContact from "@/components/faq/faq-contact"

export default function FaqPage() {
  return (
    <div className="pt-20 pb-16">
      <FaqHeader />
      <FaqContent />
      <FaqContact />
    </div>
  )
}
