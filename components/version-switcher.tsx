"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface VersionSwitcherProps {
  versions: string[]
  defaultVersion: string
}

export function VersionSwitcher({ versions, defaultVersion }: VersionSwitcherProps) {
  const [selectedVersion, setSelectedVersion] = useState(defaultVersion)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          버전 {selectedVersion}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        {versions.map((version) => (
          <DropdownMenuItem
            key={version}
            onClick={() => setSelectedVersion(version)}
            className={selectedVersion === version ? "bg-gray-100 dark:bg-gray-800" : ""}
          >
            버전 {version}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
