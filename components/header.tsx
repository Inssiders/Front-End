"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Menu, X, Bell, TrendingUp, Users, Star, Award, Video, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

const navItems = [
  { name: "트렌딩", href: "/trending", icon: <TrendingUp className="h-4 w-4 mr-2" /> },
  { name: "밈", href: "/memes", icon: <Sparkles className="h-4 w-4 mr-2" /> },
  { name: "인플루언서", href: "/influencers", icon: <Users className="h-4 w-4 mr-2" /> },
  { name: "연예인", href: "/celebrities", icon: <Star className="h-4 w-4 mr-2" /> },
  { name: "챌린지", href: "/challenges", icon: <Award className="h-4 w-4 mr-2" /> },
  { name: "라이브", href: "/live", icon: <Video className="h-4 w-4 mr-2" /> },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-900/80" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                인싸이더
              </span>
            </Link>
          </div>

          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-full text-sm font-medium flex items-center transition-all",
                    pathname === item.href
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50",
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center space-x-2">
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="트렌드 검색..."
                className="pl-10 rounded-full bg-gray-100 border-0 focus-visible:ring-purple-500 dark:bg-gray-800"
              />
            </div>

            <Button variant="ghost" size="icon" className="relative" aria-label="알림">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <Link href="/profile">
              <Avatar className="h-8 w-8 border-2 border-purple-200 hover:border-purple-400 transition-all">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="프로필" />
                <AvatarFallback>MZ</AvatarFallback>
              </Avatar>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="메뉴"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="트렌드 검색..."
                className="pl-10 rounded-full bg-gray-100 border-0 focus-visible:ring-purple-500 dark:bg-gray-800"
              />
            </div>
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-3 rounded-lg text-sm font-medium flex items-center",
                    pathname === item.href
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
