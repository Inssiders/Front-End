"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { HelpCircle, Mail, MessageSquare, Phone, Search } from "lucide-react";
import Link from "next/link";

export default function SettingsHelp() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-4 p-2 sm:p-4">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="text-base sm:text-lg md:text-xl">
            자주 묻는 질문
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-2 md:p-4">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="질문 검색하기..."
                className="pl-10 rounded-full bg-gray-100 border-0 focus-visible:ring-purple-500 dark:bg-gray-800"
              />
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="item-1"
              className="border-b border-gray-200 dark:border-gray-800"
            >
              <AccordionTrigger className="text-left font-medium text-gray-900 dark:text-white py-4">
                인싸이더는 어떤 서비스인가요?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">
                인싸이더는 MZ세대를 위한 트렌디한 콘텐츠 플랫폼입니다. 밈,
                인플루언서, 연예인, 챌린지 등 다양한 콘텐츠를 제공하며 인싸
                문화의 중심이 되고자 합니다. 사용자들은 콘텐츠를 소비하고, 직접
                참여하며, 다른 사용자들과 소통할 수 있습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="border-b border-gray-200 dark:border-gray-800"
            >
              <AccordionTrigger className="text-left font-medium text-gray-900 dark:text-white py-4">
                비밀번호를 잊어버렸어요. 어떻게 해야 하나요?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">
                로그인 페이지에서 '비밀번호 찾기' 옵션을 선택하고 가입 시 사용한
                이메일 주소를 입력하세요. 비밀번호 재설정 링크가 포함된 이메일을
                보내드립니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-3"
              className="border-b border-gray-200 dark:border-gray-800"
            >
              <AccordionTrigger className="text-left font-medium text-gray-900 dark:text-white py-4">
                인싸 포인트는 무엇인가요?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">
                인싸 포인트는 인싸이더 내에서 활동하면서 획득할 수 있는 가상
                포인트입니다. 콘텐츠 업로드, 댓글 작성, 좋아요, 챌린지 참여 등
                다양한 활동을 통해 포인트를 모을 수 있습니다. 모은 포인트로
                프리미엄 배지, 기프티콘, 이벤트 티켓 등 다양한 보상을 교환할 수
                있습니다.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-4 text-center">
            <Link href="/faq">
              <Button
                variant="link"
                className="text-purple-600 dark:text-purple-400"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                모든 FAQ 보기
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="p-2 sm:p-4">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="text-base sm:text-lg md:text-xl">
            문의하기
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-2 md:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
              <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                라이브 채팅
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                실시간 채팅으로 빠른 도움을 받으세요.
              </p>
              <Button variant="outline" className="w-full">
                채팅 시작하기
              </Button>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
              <Mail className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                이메일
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                이메일로 문의사항을 보내주세요.
              </p>
              <Button variant="outline" className="w-full">
                이메일 보내기
              </Button>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
              <Phone className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                전화
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                평일 10:00 - 18:00 운영
              </p>
              <Button variant="outline" className="w-full">
                02-123-4567
              </Button>
            </div>
          </div>

          <div className="text-center">
            <Link href="/contact">
              <Button className="bg-purple-600 hover:bg-purple-700">
                문의하기 페이지로 이동
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
