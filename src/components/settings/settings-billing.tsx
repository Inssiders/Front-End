"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Star, Check, Plus } from "lucide-react"

export default function SettingsBilling() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>멤버십 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mr-2">현재 플랜: 무료</h3>
                <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">
                  기본
                </Badge>
              </div>
              <p className="text-gray-600 dark:text-gray-400">인싸이더의 기본 기능을 무료로 이용하고 있습니다.</p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Star className="h-4 w-4 mr-2" />
              프리미엄으로 업그레이드
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>프리미엄 플랜</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">베이직</h3>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                ₩5,900<span className="text-sm text-gray-500 dark:text-gray-400 font-normal">/월</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">광고 없는 경험</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">프리미엄 배지</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">월 500 인싸 포인트</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                선택하기
              </Button>
            </div>

            <div className="border-2 border-purple-600 dark:border-purple-400 rounded-lg p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                인기
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">프로</h3>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                ₩9,900<span className="text-sm text-gray-500 dark:text-gray-400 font-normal">/월</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">베이직의 모든 기능</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">독점 콘텐츠 액세스</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">월 1,000 인싸 포인트</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">우선 고객 지원</span>
                </li>
              </ul>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">선택하기</Button>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">프리미엄</h3>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                ₩15,900<span className="text-sm text-gray-500 dark:text-gray-400 font-normal">/월</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">프로의 모든 기능</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">VIP 이벤트 초대</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">월 2,000 인싸 포인트</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">맞춤형 프로필 테마</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                선택하기
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>결제 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center">
                <CreditCard className="h-6 w-6 text-gray-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">결제 수단이 없습니다</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    프리미엄 기능을 이용하려면 결제 수단을 추가하세요
                  </p>
                </div>
              </div>
              <Button variant="outline" className="rounded-full">
                <Plus className="h-4 w-4 mr-2" />
                결제 수단 추가
              </Button>
            </div>

            <div className="flex justify-end">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <CreditCard className="h-4 w-4 mr-2" />
                결제 정보 저장
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
