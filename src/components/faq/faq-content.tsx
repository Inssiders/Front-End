"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// FAQ 데이터 (실제로는 API에서 가져올 것)
const faqData = {
  general: [
    {
      question: "인싸이더는 어떤 서비스인가요?",
      answer:
        "인싸이더는 MZ세대를 위한 트렌디한 콘텐츠 플랫폼입니다. 밈, 인플루언서, 연예인, 챌린지 등 다양한 콘텐츠를 제공하며 인싸 문화의 중심이 되고자 합니다. 사용자들은 콘텐츠를 소비하고, 직접 참여하며, 다른 사용자들과 소통할 수 있습니다.",
    },
    {
      question: "인싸이더는 무료로 이용할 수 있나요?",
      answer:
        "네, 인싸이더의 기본 서비스는 무료로 이용 가능합니다. 다만, 일부 프리미엄 콘텐츠나 특별 기능은 인싸 포인트를 사용하거나 프리미엄 멤버십 가입이 필요할 수 있습니다.",
    },
    {
      question: "인싸이더는 어떤 기기에서 이용할 수 있나요?",
      answer:
        "인싸이더는 웹 브라우저를 통해 PC, 태블릿, 모바일 등 다양한 기기에서 이용 가능합니다. 또한 PWA(Progressive Web App) 기능을 지원하여 모바일 기기에서 앱처럼 설치하여 사용할 수 있습니다.",
    },
    {
      question: "계정은 어떻게 만들 수 있나요?",
      answer:
        "회원가입 페이지에서 이메일, 소셜 미디어 계정(구글, 페이스북, 애플 등)을 통해 간편하게 가입할 수 있습니다. 가입 후 프로필 설정을 통해 관심사를 설정하면 맞춤형 콘텐츠를 추천받을 수 있습니다.",
    },
  ],
  account: [
    {
      question: "비밀번호를 잊어버렸어요. 어떻게 해야 하나요?",
      answer:
        "로그인 페이지에서 '비밀번호 찾기' 옵션을 선택하고 가입 시 사용한 이메일 주소를 입력하세요. 비밀번호 재설정 링크가 포함된 이메일을 보내드립니다.",
    },
    {
      question: "계정 정보는 어떻게 변경할 수 있나요?",
      answer:
        "로그인 후 프로필 페이지에서 '설정' 메뉴를 통해 프로필 사진, 사용자 이름, 이메일 주소 등의 계정 정보를 변경할 수 있습니다.",
    },
    {
      question: "계정을 삭제하고 싶어요. 어떻게 해야 하나요?",
      answer:
        "설정 > 계정 > 계정 삭제 메뉴에서 계정 삭제를 진행할 수 있습니다. 계정 삭제 시 모든 데이터가 영구적으로 삭제되므로 신중하게 결정해주세요.",
    },
    {
      question: "여러 기기에서 동시에 로그인할 수 있나요?",
      answer:
        "네, 여러 기기에서 동시에 로그인하여 인싸이더를 이용할 수 있습니다. 각 기기에서의 활동은 동기화되어 어떤 기기에서든 동일한 경험을 제공합니다.",
    },
  ],
  content: [
    {
      question: "콘텐츠는 어떻게 업로드할 수 있나요?",
      answer:
        "로그인 후 '크리에이터 스튜디오'에서 '새 콘텐츠 만들기' 버튼을 클릭하여 텍스트, 이미지, 비디오 등 다양한 형태의 콘텐츠를 업로드할 수 있습니다.",
    },
    {
      question: "부적절한 콘텐츠를 발견했어요. 어떻게 신고할 수 있나요?",
      answer:
        "각 콘텐츠의 오른쪽 상단에 있는 '더보기' 메뉴(...)를 클릭한 후 '신고하기' 옵션을 선택하여 부적절한 콘텐츠를 신고할 수 있습니다. 신고된 콘텐츠는 검토 후 적절한 조치가 취해집니다.",
    },
    {
      question: "콘텐츠 추천은 어떤 기준으로 이루어지나요?",
      answer:
        "사용자의 관심사, 이전 활동 내역, 인기도, 최신성 등 다양한 요소를 고려한 알고리즘을 통해 개인화된 콘텐츠를 추천해드립니다.",
    },
    {
      question: "내 콘텐츠의 저작권은 어떻게 보호되나요?",
      answer:
        "인싸이더에 업로드된 모든 콘텐츠의 저작권은 원 저작자에게 있습니다. 다른 사용자가 무단으로 콘텐츠를 사용하는 경우 저작권 침해 신고를 통해 보호받을 수 있습니다.",
    },
  ],
  points: [
    {
      question: "인싸 포인트는 무엇인가요?",
      answer:
        "인싸 포인트는 인싸이더 내에서 활동하면서 획득할 수 있는 가상 포인트입니다. 콘텐츠 업로드, 댓글 작성, 좋아요, 챌린지 참여 등 다양한 활동을 통해 포인트를 모을 수 있습니다.",
    },
    {
      question: "인싸 포인트로 무엇을 할 수 있나요?",
      answer:
        "모은 포인트로 프리미엄 배지, 기프티콘, 이벤트 티켓 등 다양한 보상을 교환할 수 있습니다. 또한 일부 특별 기능이나 콘텐츠 이용 시 포인트가 필요할 수 있습니다.",
    },
    {
      question: "인싸 레벨은 어떻게 올릴 수 있나요?",
      answer:
        "인싸 레벨은 포인트 획득량에 따라 자동으로 상승합니다. 더 많은 포인트를 모을수록 레벨이 높아지며, 높은 레벨에서는 특별한 혜택이 제공됩니다.",
    },
    {
      question: "포인트는 만료되나요?",
      answer:
        "기본적으로 인싸 포인트는 만료되지 않습니다. 다만, 이벤트나 프로모션을 통해 획득한 특별 포인트는 기간 제한이 있을 수 있으니 포인트 획득 시 안내 사항을 확인해주세요.",
    },
  ],
}

export default function FaqContent() {
  const [activeTab, setActiveTab] = useState("general")
  const [searchQuery, setSearchQuery] = useState("")

  // 검색 기능 구현 (실제로는 더 복잡한 검색 로직이 필요할 수 있음)
  const filteredFaqs = Object.entries(faqData).reduce(
    (acc, [category, items]) => {
      const filtered = items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      if (filtered.length > 0) {
        acc[category] = filtered
      }
      return acc
    },
    {} as Record<string, typeof faqData.general>,
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 검색 로직 (이미 위에서 필터링됨)
  }

  return (
    <div className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="질문 검색하기..."
                className="pl-10 py-6 text-lg rounded-full bg-gray-100 border-0 focus-visible:ring-purple-500 dark:bg-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-purple-600 hover:bg-purple-700"
              >
                검색
              </Button>
            </div>
          </form>

          <Tabs
            defaultValue="general"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-3xl mx-auto"
          >
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="general">일반</TabsTrigger>
              <TabsTrigger value="account">계정</TabsTrigger>
              <TabsTrigger value="content">콘텐츠</TabsTrigger>
              <TabsTrigger value="points">포인트</TabsTrigger>
            </TabsList>

            {Object.keys(faqData).map((category) => (
              <TabsContent key={category} value={category} className="mt-6">
                <Accordion type="single" collapsible className="w-full">
                  {(searchQuery ? filteredFaqs[category] || [] : faqData[category as keyof typeof faqData]).map(
                    (faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <AccordionItem
                          value={`item-${index}`}
                          className="border-b border-gray-200 dark:border-gray-800"
                        >
                          <AccordionTrigger className="text-left font-medium text-gray-900 dark:text-white py-4">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ),
                  )}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
