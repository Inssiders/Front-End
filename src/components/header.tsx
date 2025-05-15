"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Menu, Search, Sparkles, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { name: "밈", href: "/memes", icon: <Sparkles className="h-4 w-4 mr-2" /> },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const { data: session } = useSession();
  const pathname = usePathname();
  const isMobile = useMobile();
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      if (window.scrollY < 10) {
        setShowHeader(true);
        lastScrollY.current = window.scrollY;
        return;
      }
      if (window.scrollY > lastScrollY.current) {
        // 아래로 스크롤
        setShowHeader(false);
      } else {
        // 위로 스크롤
        setShowHeader(true);
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add click outside to close dropdown
  useEffect(() => {
    if (!isMenuOpen) return;
    function handleClick(e: MouseEvent) {
      const dropdown = document.getElementById("mobile-menu-dropdown");
      if (dropdown && !dropdown.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMenuOpen]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
      setIsMenuOpen(false);
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b shadow-sm backdrop-blur-md",
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90"
          : "bg-white/70 dark:bg-gray-900/70",
        showHeader ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-2 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center min-w-[100px]">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text tracking-tight select-none">
              인싸이더
            </span>
          </Link>

          {/* Mobile Search (centered) */}
          <div className="flex-1 flex justify-center items-center md:hidden">
            <form onSubmit={handleSearchSubmit} className="w-full max-w-xs">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="트렌드 검색..."
                  className="pl-10 pr-3 py-2 rounded-full bg-gray-100 border-0 focus-visible:ring-2 focus-visible:ring-purple-400 dark:bg-gray-800 text-base transition-all"
                  aria-label="트렌드 검색"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Desktop Nav */}
          {!isMobile && (
            <nav className="flex-1 flex justify-center items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold flex items-center transition-all duration-150",
                    pathname === item.href
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-200 shadow"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/60"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop Search */}
          <div className="hidden md:flex items-center w-64 max-w-xs relative">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="트렌드 검색..."
                  className="pl-10 pr-3 py-2 rounded-full bg-gray-100 border-0 focus-visible:ring-2 focus-visible:ring-purple-400 dark:bg-gray-800 text-sm"
                  aria-label="트렌드 검색"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Desktop Profile/Login */}
          <div className="hidden md:flex items-center ml-2">
            <div className="relative">
              {session ? (
                <button
                  onClick={() => setIsProfileMenuOpen((v) => !v)}
                  className="focus:outline-none"
                  aria-label="프로필 메뉴 열기"
                >
                  <Avatar className="h-9 w-9 border-2 border-purple-200 hover:border-purple-400 transition-all">
                    <AvatarImage
                      src="/placeholder.svg?height=36&width=36"
                      alt="프로필"
                    />
                    <AvatarFallback>MZ</AvatarFallback>
                  </Avatar>
                </button>
              ) : (
                <Link
                  href="/signin"
                  className="px-4 py-2 text-sm font-semibold rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  로그인
                </Link>
              )}
              {session && isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 rounded-xl shadow-lg py-2 z-50 border border-gray-100 dark:border-gray-800">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    프로필
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setIsProfileMenuOpen(false);
                    }}
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div
          className="absolute left-1/2 top-16 z-50 w-full flex justify-center md:hidden"
          style={{ transform: "translateX(-50%)" }}
        >
          <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl mt-2 px-6 py-6 flex flex-col gap-4 items-center w-11/12 max-w-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 animate-dropdown">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
              onClick={() => setIsMenuOpen(false)}
              aria-label="메뉴 닫기"
            >
              <X className="h-6 w-6" />
            </button>
            {/* Main Actions: 밈, 로그인/프로필 */}
            <Link
              href="/memes"
              className="w-full px-6 py-4 rounded-full text-lg font-bold flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow hover:scale-105 active:scale-95 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-purple-400"
              onClick={() => setIsMenuOpen(false)}
              aria-label="밈 페이지로 이동"
            >
              <Sparkles className="h-6 w-6 mr-2" />밈
            </Link>
            {session ? (
              <Link
                href="/profile"
                className="w-full px-6 py-4 rounded-full text-lg font-bold flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
                onClick={() => setIsMenuOpen(false)}
                aria-label="프로필 페이지로 이동"
              >
                <Avatar className="h-7 w-7 border border-purple-200 mr-2">
                  <AvatarImage
                    src="/placeholder.svg?height=28&width=28"
                    alt="프로필"
                  />
                  <AvatarFallback>MZ</AvatarFallback>
                </Avatar>
                프로필
              </Link>
            ) : (
              <Link
                href="/signin"
                className="w-full px-6 py-4 rounded-full text-lg font-bold flex items-center justify-center bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-200 shadow hover:bg-purple-200 dark:hover:bg-purple-800 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
                onClick={() => setIsMenuOpen(false)}
                aria-label="로그인 페이지로 이동"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
