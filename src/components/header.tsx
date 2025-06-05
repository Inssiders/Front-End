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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { TooltipProvider } from "./ui/tooltip";

const navItems = [
  {
    category: "트렌드",
    items: [
      {
        name: "밈",
        href: "/posts",
        icon: <Sparkles className="size-4" />,
        description: "최신 트렌드와 밈을 발견하세요",
      },
      {
        name: "공감밈",
        href: "/empathy-meme",
        icon: <Sparkles className="size-4" />,
        description: "공감할 수 있는 밈들을 찾아보세요",
      },
    ],
  },
];

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a ref={ref} className={cn(styles.listItem, className)} {...props}>
            <div className={cn("text-sm font-medium leading-none", styles.listItemTitle)}>
              {title}
            </div>
            <span className={cn("line-clamp-2 text-sm leading-snug", styles.listItemDescription)}>
              {children}
            </span>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default function Header() {
  const { status, data: session } = useSession();
  const pathname = usePathname();
  const isMobile = useMobile();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [openCommandDialog, setOpenCommandDialog] = useState(false);
  const isScrollingUp = useScrollDirection();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  function handleSearchSubmit(e?: React.FormEvent) {
    if (e) {
      e.preventDefault();
    }
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setOpenCommandDialog(false);
    }
  }

  function handleCommandSelect(query: string) {
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setOpenCommandDialog(false);
  }

  return (
    <TooltipProvider>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isScrollingUp ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className={cn("fixed inset-x-0 top-0 z-50", styles.header)}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-18 w-full items-center justify-between gap-3">
            {/* Logo */}
            <Link href="/" className={cn(styles.logoContainer, "flex-shrink-0")}> ... (생략) ... </Link>
            {/* 이하 생략: 검색, 네비, 드롭다운, 버튼 등 개선된 UI/UX */}
          </div>
        </div>
      </motion.header>
    </TooltipProvider>
  );
}
