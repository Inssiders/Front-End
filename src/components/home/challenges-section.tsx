"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Award, ArrowRight, Play, Users, Clock } from "lucide-react";
import Link from "next/link";

const challenges = [
  {
    id: 1,
    title: "댄스 챌린지: 뉴진스 'ETA'",
    description: "뉴진스의 새 히트곡 'ETA'에 맞춰 댄스 챌린지에 도전하세요!",
    image: "/placeholder.svg?height=400&width=600&text=뉴진스 ETA 챌린지",
    participants: 12453,
    deadline: "3일 남음",
    prize: "1,000 인싸 포인트",
    difficulty: "중간",
    tags: ["K-POP", "댄스", "뉴진스"],
  },
  {
    id: 2,
    title: "밈 챌린지: '아무말 대잔치'",
    description: "요즘 유행하는 '아무말 대잔치' 밈을 재해석해 나만의 버전을 만들어보세요.",
    image: "/placeholder.svg?height=400&width=600&text=아무말 대잔치 챌린지",
    participants: 8765,
    deadline: "5일 남음",
    prize: "800 인싸 포인트",
    difficulty: "쉬움",
    tags: ["밈", "유머", "창작"],
  },
  {
    id: 3,
    title: "립싱크 챌린지: 아이유 '홀씨'",
    description: "아이유의 신곡 '홀씨'에 맞춰 립싱크 챌린지를 해보세요.",
    image: "/placeholder.svg?height=400&width=600&text=아이유 홀씨 챌린지",
    participants: 9876,
    deadline: "7일 남음",
    prize: "1,200 인싸 포인트",
    difficulty: "어려움",
    tags: ["K-POP", "립싱크", "아이유"],
  },
];

export default function ChallengesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="overflow-hidden bg-white py-20 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <div className="mb-4 flex items-center">
              <Award className="mr-2 size-6 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">인싸 챌린지</h2>
            </div>
            <p className="max-w-2xl text-gray-600 dark:text-gray-400">
              인싸이더의 다양한 챌린지에 참여하고 포인트와 배지를 획득하세요. 당신의 창의력을 보여줄
              기회입니다!
            </p>
          </div>

          <Link href="/challenges">
            <Button className="mt-4 rounded-full bg-purple-600 hover:bg-purple-700 md:mt-0">
              모든 챌린지 보기
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              variants={item}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card className="h-full overflow-hidden border-0 bg-gray-50 dark:bg-gray-900">
                <div className="relative">
                  <img
                    src={challenge.image || "/placeholder.svg"}
                    alt={challenge.title}
                    className="aspect-video w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <Badge
                          variant="secondary"
                          className="bg-purple-600 text-white hover:bg-purple-700"
                        >
                          {challenge.difficulty}
                        </Badge>
                        <span className="ml-2 flex items-center text-xs text-white">
                          <Clock className="mr-1 size-3" />
                          {challenge.deadline}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
                    </div>
                  </div>

                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-purple-600/80 opacity-0"
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button size="lg" variant="secondary" className="rounded-full">
                      <Play className="mr-2 size-5" />
                      참여하기
                    </Button>
                  </motion.div>
                </div>

                <CardContent className="p-5">
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {challenge.description}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {challenge.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <Avatar
                            key={i}
                            className="size-6 border-2 border-white dark:border-gray-900"
                          >
                            <AvatarImage
                              src={`/placeholder.svg?height=24&width=24&text=${i + 1}`}
                            />
                            <AvatarFallback>U{i + 1}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                        <Users className="mr-1 size-3" />
                        {challenge.participants.toLocaleString()}명 참여
                      </span>
                    </div>

                    <div className="text-xs font-medium text-purple-600 dark:text-purple-400">
                      {challenge.prize}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
