"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Github, Globe, Linkedin } from "lucide-react";

export default function AboutTeam() {
  const team = [
    {
      name: "Toris",
      role: "초기 기획 & 프론트엔드 담당",
      avatar: "/placeholder.svg?height=100&width=100&text=MJ",
      bio: "풀스택 개발을 지향하는 1년차 개발자",
      social: {
        linkedin: "#",
        github: "https://github.com/toris-dev",
        website: "#",
      },
    },
    {
      name: "sinjw",
      role: "프론트엔드 담당",
      avatar: "/placeholder.svg?height=100&width=100&text=JH",
      bio: "밈을 좋아하고 기획을 좋아하는 사람",
      social: {
        linkedin: "#",
        github: "https://github.com/sinjw",
        website: "#",
      },
    },
    {
      name: "Mia",
      role: "백엔드 담당",
      avatar: "/placeholder.svg?height=100&width=100&text=SY",
      bio: "밈을 좋아하고 기획을 좋아하는 사람",
      social: {
        linkedin: "#",
        github: "https://github.com/ooMia",
        website: "#",
      },
    },
    {
      name: "ㅇㅇㅇ",
      role: "백엔드 담당",
      avatar: "/placeholder.svg?height=100&width=100&text=SY",
      bio: "밈을 좋아하고 기획을 좋아하는 사람",
      social: {
        linkedin: "#",
        github: "https://github.com/",
        website: "#",
      },
    },
  ];

  return (
    <div className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            팀 소개
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            인싸이더는 다양한 배경과 전문성을 가진 팀원들이 모여 MZ세대를 위한
            최고의 플랫폼을 만들어가고 있습니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 bg-gray-50 dark:bg-gray-900 hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                    />
                    <AvatarFallback>
                      {member.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {member.bio}
                  </p>
                  <div className="flex space-x-3">
                    <a
                      href={member.social.linkedin}
                      className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={member.social.github}
                      className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={member.social.website}
                      className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                    >
                      <Globe className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
