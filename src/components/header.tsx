"use client";

import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Menu, Search, Sparkles } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { useEffect, useState } from "react";
import styles from "./header.module.css";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
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
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { TooltipProvider } from "./ui/tooltip";

const navItems = [
  {
    category: "트렌드",
    items: [
      {
        name: "밈",
        href: "/posts",
        icon: <Sparkles className="h-4 w-4" />,
        description: "최신 트렌드와 밈을 발견하세요",
      },
      {
        name: "공감밈",
        href: "/empathy-meme",
        icon: <Sparkles className="h-4 w-4" />,
        description: "공감할 수 있는 밈들을 찾아보세요",
      },
    ],
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a ref={ref} className={cn(styles.listItem, className)} {...props}>
          <div className="text-sm font-medium leading-none text-readable-bright">
            {title}
          </div>
          <span className="line-clamp-2 text-sm leading-snug text-readable-muted">
            {children}
          </span>
        </a>
      </NavigationMenuLink>
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
  const isScrollingUp = useScrollDirection();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  function handleSearchSubmit(e?: React.FormEvent) {
    if (e) {
      e.preventDefault();
    }
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
      setOpen(false);
      setSearch("");
    }
  }

  return (
    <TooltipProvider>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isScrollingUp ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className={cn("fixed top-0 left-0 right-0 z-50", styles.header)}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4 w-full">
            {/* Logo */}
            <Link href="/" className={styles.logoContainer}>
              <Image
                src="/logo.png"
                alt="인싸이더"
                width={40}
                height={40}
                className="rounded-xl"
              />
            </Link>

            {/* Search Command Center */}
            <div className="flex-1 max-w-2xl mx-auto">
              <Button
                variant="ghost"
                className={cn(
                  "relative w-full justify-start text-sm h-10 rounded-xl",
                  styles.searchButton
                )}
                onClick={() => setOpen(true)}
              >
                <Search className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">트렌드 검색...</span>
                <span className="inline md:hidden">검색...</span>
                <kbd
                  className={cn(
                    "pointer-events-none absolute right-2 hidden h-6 select-none items-center gap-1 md:flex",
                    styles.kbd
                  )}
                >
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </div>

            {/* Desktop Nav & Actions */}
            <div className="flex items-center gap-2">
              {!isMobile && (
                <NavigationMenu>
                  <NavigationMenuList>
                    {navItems.map((category) => (
                      <NavigationMenuItem key={category.category}>
                        <NavigationMenuTrigger
                          className={cn("h-9", styles.navTrigger)}
                        >
                          {category.category}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className={styles.navContent}>
                          <ul className="grid w-[400px] gap-3 grid-1 p-4 md:w-[300px]">
                            {category.items.map((item) => (
                              <ListItem
                                key={item.name}
                                title={item.name}
                                href={item.href}
                              >
                                <div className="flex items-center gap-2">
                                  {item.icon}
                                  <span>{item.description}</span>
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

              {/* User Menu */}
              {status === "authenticated" && session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn("p-0", styles.avatarContainer)}
                    >
                      <Avatar className={cn("h-8 w-8", styles.avatar)}>
                        <AvatarImage
                          src={session.user.image || ""}
                          alt={session.user.name || "User"}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-pink)] text-white">
                          {session.user.name?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className={styles.dropdownContent}
                  >
                    <DropdownMenuLabel className="text-neon-cyan">
                      내 계정
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className={styles.dropdownItem}>
                        프로필
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className={styles.dropdownItem}>
                        설정
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className={styles.dropdownItem}
                    >
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    asChild
                    className={cn(
                      "transition-all duration-300 ease-out",
                      "hover:bg-white/10 hover:text-neon-cyan hover:shadow-lg",
                      "hover:shadow-cyan-500/20 hover:border-cyan-500/30",
                      "border border-transparent rounded-lg px-4 py-2",
                      "backdrop-filter backdrop-blur-sm"
                    )}
                  >
                    <Link href="/auth/signin">로그인</Link>
                  </Button>
                  <Button
                    asChild
                    className={cn(
                      "bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)]",
                      "hover:from-[var(--neon-pink)] hover:to-[var(--neon-purple)]",
                      "hover:shadow-lg hover:shadow-pink-500/30",
                      "transition-all duration-300 ease-out",
                      "border-0 text-white font-medium"
                    )}
                  >
                    <Link href="/auth/signup">회원가입</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu */}
              {isMobile && (
                <Sheet open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={styles.mobileMenuButton}
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className={styles.mobileSheet}>
                    <SheetHeader className={styles.mobileSheetHeader}>
                      <SheetTitle className="text-gradient-neon">
                        인싸이더
                      </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 mt-6">
                      {navItems.map((category) =>
                        category.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg transition-all",
                              styles.dropdownItem
                            )}
                            onClick={() => setOpenMobileMenu(false)}
                          >
                            {item.icon}
                            <div className="flex flex-col">
                              <span className="font-medium text-readable-bright">
                                {item.name}
                              </span>
                              <span className="text-sm text-readable-muted">
                                {item.description}
                              </span>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className={styles.commandContent}>
          <CommandInput
            placeholder="트렌드, 밈, 사용자 검색..."
            value={search}
            onValueChange={setSearch}
            className={styles.commandInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
          />
          <CommandList>
            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
            <CommandGroup heading="빠른 탐색">
              <CommandItem
                onSelect={() => {
                  router.push("/posts");
                  setOpen(false);
                }}
                className={styles.commandItem}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                <span>인기 밈</span>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push("/empathy-meme");
                  setOpen(false);
                }}
                className={styles.commandItem}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                <span>공감밈</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </div>
      </CommandDialog>
    </TooltipProvider>
  );
}
