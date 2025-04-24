"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { isOnline, isApiReachable } from "@/utils/network"

type DataSource = "api" | "local" | "loading"

interface DataSourceContextType {
  dataSource: DataSource
  isOffline: boolean
  isApiDown: boolean
  checkConnectivity: () => Promise<void>
}

const DataSourceContext = createContext<DataSourceContextType | undefined>(undefined)

export function DataSourceProvider({ children }: { children: ReactNode }) {
  const [dataSource, setDataSource] = useState<DataSource>("loading")
  const [isOffline, setIsOffline] = useState(false)
  const [isApiDown, setIsApiDown] = useState(false)

  const checkConnectivity = async () => {
    const online = isOnline()
    setIsOffline(!online)

    if (online) {
      const apiReachable = await isApiReachable()
      setIsApiDown(!apiReachable)
      setDataSource(apiReachable ? "api" : "local")
    } else {
      setDataSource("local")
    }
  }

  useEffect(() => {
    // Check connectivity on mount
    checkConnectivity()

    // Set up event listeners for online/offline status
    const handleOnline = () => {
      setIsOffline(false)
      checkConnectivity()
    }

    const handleOffline = () => {
      setIsOffline(true)
      setDataSource("local")
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Set up periodic connectivity check
    const intervalId = setInterval(checkConnectivity, 30000) // Check every 30 seconds

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      clearInterval(intervalId)
    }
  }, [])

  return (
    <DataSourceContext.Provider value={{ dataSource, isOffline, isApiDown, checkConnectivity }}>
      {children}
    </DataSourceContext.Provider>
  )
}

export function useDataSource() {
  const context = useContext(DataSourceContext)
  if (context === undefined) {
    throw new Error("useDataSource must be used within a DataSourceProvider")
  }
  return context
}
