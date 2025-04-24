"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Save, Bell, Lock, Palette } from "lucide-react"

export default function CreatorStudioSettings() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">크리에이터 설정</h2>
      </div>

      <Tabs defaultValue="profile" className="mb-8">
        <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-full max-w-md mb-6">
          <TabsTrigger
            value="profile"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
          >
            프로필
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
          >
            알림
          </TabsTrigger>
          <TabsTrigger
            value="privacy"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
          >
            개인정보
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
          >
            테마
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>프로필 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg?height=96&width=96&text=MS" alt="프로필 이미지" />
                        <AvatarFallback>MS</AvatarFallback>
                      </Avatar>
                      <Button
                        size="icon"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-purple-600 hover:bg-purple-700"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="mb-1 block">
                            이름
                          </Label>
                          <Input id="name" defaultValue="김민서" />
                        </div>
                        <div>
                          <Label htmlFor="username" className="mb-1 block">
                            사용자 이름
                          </Label>
                          <Input id="username" defaultValue="@minseo_style" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="bio" className="mb-1 block">
                          소개
                        </Label>
                        <Textarea id="bio" defaultValue="패션 & 뷰티 인플루언서 | 대학생 | 트렌드 리더" rows={3} />
                      </div>

                      <div>
                        <Label htmlFor="email" className="mb-1 block">
                          이메일
                        </Label>
                        <Input id="email" type="email" defaultValue="minseo@example.com" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="instagram" className="mb-1 block">
                        인스타그램
                      </Label>
                      <Input id="instagram" defaultValue="minseo_style" />
                    </div>
                    <div>
                      <Label htmlFor="youtube" className="mb-1 block">
                        유튜브
                      </Label>
                      <Input id="youtube" defaultValue="MinSeoStyle" />
                    </div>
                    <div>
                      <Label htmlFor="twitter" className="mb-1 block">
                        트위터
                      </Label>
                      <Input id="twitter" defaultValue="minseo_style" />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Save className="h-4 w-4 mr-2" />
                      저장하기
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>알림 설정</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">앱 알림</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="comments" className="flex-1">
                          댓글 알림
                        </Label>
                        <Switch id="comments" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="likes" className="flex-1">
                          좋아요 알림
                        </Label>
                        <Switch id="likes" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="follows" className="flex-1">
                          팔로우 알림
                        </Label>
                        <Switch id="follows" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="mentions" className="flex-1">
                          멘션 알림
                        </Label>
                        <Switch id="mentions" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">이메일 알림</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-news" className="flex-1">
                          뉴스레터 및 업데이트
                        </Label>
                        <Switch id="email-news" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-marketing" className="flex-1">
                          마케팅 이메일
                        </Label>
                        <Switch id="email-marketing" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-activity" className="flex-1">
                          계정 활동 요약
                        </Label>
                        <Switch id="email-activity" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Bell className="h-4 w-4 mr-2" />
                      알림 설정 저장
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="privacy">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>개인정보 설정</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">계정 공개 설정</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="public-profile" className="flex-1">
                          공개 프로필
                        </Label>
                        <Switch id="public-profile" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-activity" className="flex-1">
                          활동 내역 공개
                        </Label>
                        <Switch id="show-activity" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-followers" className="flex-1">
                          팔로워 목록 공개
                        </Label>
                        <Switch id="show-followers" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">데이터 및 개인정보</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="data-collection" className="flex-1">
                          데이터 수집 허용
                        </Label>
                        <Switch id="data-collection" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="personalized-ads" className="flex-1">
                          맞춤형 광고
                        </Label>
                        <Switch id="personalized-ads" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Lock className="h-4 w-4 mr-2" />
                      개인정보 설정 저장
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="appearance">
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
