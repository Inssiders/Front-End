"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Save } from "lucide-react"

export default function SettingsProfile() {
  return (
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
  )
}
