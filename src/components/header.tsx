"use client";

import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LogOut, Menu, Search, Settings, Sparkles, Star, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { TooltipProvider } from "./ui/tooltip";

const navItems = [
  {
    category: "🔥 트렌드",
    items: [
      {
        name: "밈",
        href: "/posts",
        icon: <Sparkles className="h-5 w-5" />,
        description: "최신 트렌드와 밈을 발견하세요",
        emoji: "🎭",
      },
      {
        name: "공감밈",
        href: "/empathy-meme",
        icon: <Star className="h-5 w-5" />,
        description: "공감할 수 있는 밈들을 찾아보세요",
        emoji: "💕",
      },
    ],
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & {
    title?: string;
  }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <Link ref={ref} href={href || "#"} className={cn(styles.listItem, "hover:scale-105", className)} {...props}>
        <div className={styles.listItemTitle}>{title}</div>
        <span className={styles.listItemDescription}>{children}</span>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { status, data: session } = useSession();
  const pathname = usePathname();
  const isMobile = useMobile();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const isScrollingUp = useScrollDirection();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isMobile) {
          setOpen((open) => !open);
        } else {
          searchInputRef.current?.focus();
        }
      }
      if (e.key === "Escape") {
        setOpen(false);
        setOpenMobileMenu(false);
        setIsSearchFocused(false);
      }
    },
    [isMobile]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => setMounted(true), []);

  const handleSearchSubmit = useCallback(
    (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      // 이미 검색 중이면 중복 실행 방지
      if (isSearching) return;

      const trimmedSearch = search.trim();
      if (!trimmedSearch) return;

      setIsSearching(true);

      router.push(`/search?q=${encodeURIComponent(trimmedSearch)}`);
      setOpen(false);
      setSearch("");
      setIsSearchFocused(false);

      // 검색 상태 리셋
      setTimeout(() => setIsSearching(false), 1000);
    },
    [search, router, isSearching]
  );

  const handleLogout = useCallback(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  if (!mounted) return null;

  return (
    <TooltipProvider>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isScrollingUp ? 0 : -100,
          opacity: isScrollingUp ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className={styles.header}
      >
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            {/* Logo with Enhanced Animations */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Link href="/" className={`${styles.logoContainer} group`}>
                <div className={styles.logoGlowWrapper}>
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
                    <Image
                      src="/logo.png"
                      alt="인싸이더"
                      width={48}
                      height={48}
                      className={styles.logoImage}
                      priority
                    />
                  </motion.div>
                </div>
                <motion.span
                  className={styles.logoText}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  인싸이더
                </motion.span>
              </Link>
            </motion.div>

            {/* Enhanced Search Command Center */}
            <div className={styles.searchContainer}>
              {/* PC 검색창 - Enhanced with animations */}
              <div className={styles.searchDesktop}>
                <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                  {/* 검색 입력 그룹 - 아이콘과 버튼 개선 */}
                  <motion.div
                    className={`${styles.searchGroup} group`}
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <motion.div transition={{ duration: 0.5 }}>
                      <Search className={styles.searchIcon} />
                    </motion.div>
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="트렌드 검색... ✨"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                      검색
                    </button>
                  </motion.div>
                </form>
              </div>

              {/* 모바일 검색 버튼 with enhanced animations */}
              {isMobile && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button variant="outline" className={styles.searchMobile} onClick={() => setOpen(true)}>
                    <Search className="mr-3 h-4 w-4" />
                    <span>검색... ✨</span>
                  </Button>
                </motion.div>
              )}
            </div>

            {/* 데스크톱 네비게이션 - 안정적인 레이아웃 */}
            <div className={styles.navActions}>
              {!isMobile && (
                <NavigationMenu>
                  <NavigationMenuList>
                    {navItems.map((category) => (
                      <NavigationMenuItem key={category.category}>
                        <NavigationMenuTrigger className={styles.navTrigger}>{category.category}</NavigationMenuTrigger>
                        <NavigationMenuContent className={styles.navContent}>
                          <ul className={styles.navItemsList}>
                            {category.items.map((item) => (
                              <ListItem key={item.name} title={`${item.name} ${item.emoji}`} href={item.href}>
                                <div className={styles.navItemContent}>
                                  <div className={styles.navItemIcon}>{item.icon}</div>
                                  <div className="flex flex-col">
                                    <span className={styles.navItemDescription}>{item.description}</span>
                                  </div>
                                </div>
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}

              {/* Enhanced Profile Menu */}
              {status === "authenticated" ? (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={`${styles.profileTrigger} group`}>
                      <div className={styles.profileGlow} />
                      <Avatar className={styles.profileAvatar}>
                        <AvatarImage
                          src={session.user?.profileImage || "/placeholder.svg"}
                          alt={session.user?.nickname || "프로필"}
                          className="object-cover"
                        />
                        <AvatarFallback className={styles.profileFallback}>
                          {session.user?.nickname?.substring(0, 2) || "사용자"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className={styles.profileDropdown} align="end" sideOffset={12} alignOffset={0}>
                    <DropdownMenuLabel className={styles.profileHeader}>
                      <div className={styles.profileInfo}>
                        <div className={styles.profileName}>{session.user?.nickname} ✨</div>
                        <div className={styles.profileEmail}>{session.user?.email}</div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className={styles.profileSeparator} />

                    <DropdownMenuItem asChild className={styles.profileMenuItem}>
                      <Link href={`/profile/${session.user?.id}`} className={styles.profileMenuLink}>
                        <div className={`${styles.profileMenuIcon} ${styles.profileMenuIconProfile}`}>
                          <User className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-semibold">프로필 🙋‍♂️</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className={styles.profileMenuItem}>
                      <Link href="/settings" className={styles.profileMenuLink}>
                        <div className={`${styles.profileMenuIcon} ${styles.profileMenuIconSettings}`}>
                          <Settings className="w-4 h-4 text-cyan-600" />
                        </div>
                        <span className="font-semibold">설정 ⚙️</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className={styles.profileSeparator} />

                    <DropdownMenuItem className={styles.logoutMenuItem} onClick={handleLogout}>
                      <div className={styles.logoutContent}>
                        <div className={`${styles.profileMenuIcon} ${styles.profileMenuIconLogout}`}>
                          <LogOut className="w-4 h-4 text-red-500" />
                        </div>
                        <span className={styles.logoutText}>로그아웃 👋</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button asChild className={styles.loginButton}>
                    <Link href="/auth/signin">
                      <span className="font-bold">로그인 ✨</span>
                    </Link>
                  </Button>
                </motion.div>
              )}

              {/* Enhanced Mobile Menu */}
              {isMobile && (
                <Sheet open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
                  <SheetTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Button variant="ghost" size="icon" className={styles.mobileMenuTrigger}>
                        <motion.div
                          animate={openMobileMenu ? { rotate: 90 } : { rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Menu className={styles.mobileMenuIcon} />
                        </motion.div>
                      </Button>
                    </motion.div>
                  </SheetTrigger>
                  <SheetContent side="right" className={styles.mobileMenuContent} asChild>
                    <motion.div
                      initial={{ x: 320, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 320, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <SheetHeader>
                        <SheetTitle className={styles.mobileMenuTitle}>메뉴 ✨</SheetTitle>
                      </SheetHeader>
                      <div className={styles.mobileMenuSection}>
                        {navItems.map((category, categoryIndex) => (
                          <motion.div
                            key={category.category}
                            className={styles.mobileMenuCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: categoryIndex * 0.1 }}
                          >
                            <h3 className={styles.mobileMenuCategoryTitle}>{category.category}</h3>
                            <div className={styles.mobileMenuItems}>
                              {category.items.map((item, itemIndex) => (
                                <motion.div
                                  key={item.name}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: categoryIndex * 0.1 + itemIndex * 0.05 }}
                                  whileHover={{ x: 6, scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Link
                                    href={item.href}
                                    className={cn(
                                      styles.mobileMenuItem,
                                      pathname === item.href
                                        ? styles.mobileMenuItemActive
                                        : styles.mobileMenuItemInactive
                                    )}
                                    onClick={() => setOpenMobileMenu(false)}
                                  >
                                    <motion.div
                                      className={cn(
                                        styles.mobileMenuItemIcon,
                                        pathname === item.href
                                          ? styles.mobileMenuItemIconActive
                                          : styles.mobileMenuItemIconInactive
                                      )}
                                      whileHover={{ rotate: 5, scale: 1.1 }}
                                    >
                                      {item.icon}
                                    </motion.div>
                                    <div>
                                      <div className={styles.mobileMenuItemText}>
                                        {item.name} {item.emoji}
                                      </div>
                                      <div
                                        className={cn(
                                          styles.mobileMenuItemDesc,
                                          pathname === item.href
                                            ? styles.mobileMenuItemDescActive
                                            : styles.mobileMenuItemDescInactive
                                        )}
                                      >
                                        {item.description}
                                      </div>
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Search Modal */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <motion.div
          className={styles.searchModalContainer}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <form onSubmit={handleSearchSubmit}>
            <CommandInput
              placeholder="트렌드 검색... ✨"
              value={search}
              onValueChange={setSearch}
              className={styles.searchModalInput}
            />
          </form>
          <CommandList className={styles.searchModalList}>
            <CommandEmpty className={styles.searchModalEmpty}>
              <motion.div
                className={styles.searchModalEmptyContent}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className={styles.searchModalEmptyIcon}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Search className="h-8 w-8 text-purple-500" />
                </motion.div>
                <span className={styles.searchModalEmptyText}>검색 결과가 없습니다 😢</span>
              </motion.div>
            </CommandEmpty>
            <CommandGroup heading="✨ 추천 검색어">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <CommandItem
                  onSelect={() => {
                    setSearch("최신 트렌드");
                    handleSearchSubmit();
                  }}
                  className={styles.searchModalItem}
                >
                  <motion.div
                    className={styles.searchModalItemContent}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <motion.div
                      className={`${styles.searchModalItemIcon} ${styles.searchModalItemIconSearch}`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <Search className="h-4 w-4 text-purple-600" />
                    </motion.div>
                    <span className={styles.searchModalItemText}>최신 트렌드 🔥</span>
                  </motion.div>
                </CommandItem>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <CommandItem
                  onSelect={() => {
                    setSearch("인기 밈");
                    handleSearchSubmit();
                  }}
                  className={styles.searchModalItem}
                >
                  <motion.div
                    className={styles.searchModalItemContent}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <motion.div
                      className={`${styles.searchModalItemIcon} ${styles.searchModalItemIconSparkles}`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <Sparkles className="h-4 w-4 text-cyan-600" />
                    </motion.div>
                    <span className={styles.searchModalItemText}>인기 밈 🎭</span>
                  </motion.div>
                </CommandItem>
              </motion.div>
            </CommandGroup>
          </CommandList>
        </motion.div>
      </CommandDialog>
    </TooltipProvider>
  );
}
