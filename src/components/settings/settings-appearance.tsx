"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette } from "lucide-react"

export default function SettingsAppearance() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle>테마 설정</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">테마 모드</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer bg-white">
                  <div className="h-20 bg-white border border-gray-200 rounded-md mb-2"></div>
                  <p className="text-center text-gray-900">라이트 모드</p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer bg-gray-900">
                  <div className="h-20 bg-gray-900 border border-gray-700 rounded-md mb-2"></div>
                  <p className="text-center text-white">다크 모드</p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer bg-gradient-to-b from-white to-gray-900">
                  <div className="h-20 bg-gradient-to-b from-white to-gray-900 border border-gray-200 dark:border-gray-700 rounded-md mb-2"></div>
                  <p className="text-center text-gray-900 dark:text-white">시스템 설정</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">색상 테마</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 cursor-pointer">
                  <div className="h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md mb-2"></div>
                  <p className="text-center text-sm text-gray-900 dark:text-white">퍼플-핑크</p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 cursor-pointer">
                  <div className="h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md mb-2"></div>
                  <p className="text-center text-sm text-gray-900 dark:text-white">블루-인디고</p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 cursor-pointer">
                  <div className="h-10 bg-gradient-to-r from-green-600 to-teal-600 rounded-md mb-2"></div>
                  <p className="text-center text-sm text-gray-900 dark:text-white">그린-틸</p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 cursor-pointer">
                  <div className="h-10 bg-gradient-to-r from-amber-600 to-red-600 rounded-md mb-2"></div>
                  <p className="text-center text-sm text-gray-900 dark:text-white">앰버-레드</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Palette className="h-4 w-4 mr-2" />
                테마 설정 저장
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
