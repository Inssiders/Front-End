"use client";

import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Menu, Search, Sparkles } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
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
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <span className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </span>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { status, data: session } = useSession();
  const pathname = usePathname();
  const isMobile = useMobile();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      if (window.scrollY < 10) {
        setShowHeader(true);
        lastScrollY.current = window.scrollY;
        return;
      }
      if (window.scrollY > lastScrollY.current) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-800 backdrop-blur-md shadow-sm"
            : "bg-white/70 dark:bg-gray-900/70 border-transparent",
          showHeader ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4 w-full">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center min-w-[100px] hover:opacity-80 transition-opacity"
            >
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
                variant="outline"
                className={cn(
                  "relative w-full justify-start text-sm text-muted-foreground h-10",
                  "md:px-4",
                  "px-3 rounded-xl border-gray-200 dark:border-gray-800 hover:bg-accent"
                )}
                onClick={() => setOpen(true)}
              >
                <Search className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">트렌드 검색...</span>
                <span className="inline md:hidden">검색...</span>
                <kbd className="pointer-events-none absolute right-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 md:flex">
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
                        <NavigationMenuTrigger className="h-9">
                          {category.category}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="w-full flex flex-col items-start">
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

              {/* Profile Menu */}
              {status === "authenticated" ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={session.user?.image || "/placeholder.svg"}
                          alt={session.user?.name || "프로필"}
                        />
                        <AvatarFallback>
                          {session.user?.name?.substring(0, 2) || "사용자"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session.user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">프로필</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">설정</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-500 focus:text-red-500"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild variant="default">
                  <Link href="/signin">로그인</Link>
                </Button>
              )}

              {/* Mobile Menu */}
              {isMobile && (
                <Sheet open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80">
                    <SheetHeader>
                      <SheetTitle>메뉴</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4">
                      {navItems.map((category) => (
                        <div key={category.category} className="mb-4">
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">
                            {category.category}
                          </h3>
                          <div className="space-y-1">
                            {category.items.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                  "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                                  pathname === item.href
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                )}
                                onClick={() => setOpenMobileMenu(false)}
                              >
                                {item.icon}
                                <div>
                                  <p>{item.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Command Menu */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <form onSubmit={handleSearchSubmit}>
          <CommandInput
            placeholder="트렌드 검색..."
            value={search}
            onValueChange={setSearch}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearchSubmit();
              }
            }}
            className="border-none focus:ring-0 md:rounded-none rounded-xl px-4"
          />
        </form>
        <CommandList className="md:rounded-none rounded-xl">
          <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          <CommandGroup heading="추천 검색어">
            <CommandItem
              onSelect={() => {
                setSearch("최신 트렌드");
                handleSearchSubmit();
              }}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>최신 트렌드</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setSearch("인기 밈");
                handleSearchSubmit();
              }}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              <span>인기 밈</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </TooltipProvider>
  );
}
