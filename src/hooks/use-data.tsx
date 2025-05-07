"use client"

import { useState, useEffect } from "react"
import { useDataSource } from "@/contexts/data-source-context"

type DataType =
  | "posts"
  | "trending"
  | "memes"
  | "challenges"
  | "celebrities"
  | "live"
  | "profile"
  | "points"
  | "creator-studio"

type FetchParams = {
  id?: string
  type?: string
  filter?: string
  page?: number
  limit?: number
}

/**
 * Custom hook to fetch data with fallback to local mock data
 * @param dataType The type of data to fetch
 * @param params Additional parameters for the fetch
 * @returns The fetched data, loading state, and error state
 */
export function useData<T>(dataType: DataType, params: FetchParams = {}) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { dataSource } = useDataSource()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // If we're in loading state, wait
        if (dataSource === "loading") {
          return
        }

        // If we're using the API and we're online
        if (dataSource === "api") {
          try {
            const apiUrl = buildApiUrl(dataType, params)
            const response = await fetch(apiUrl, {
              signal: AbortSignal.timeout(5000),
            })

            if (!response.ok) {
              throw new Error(`API responded with status: ${response.status}`)
            }

            const apiData = await response.json()
            setData(apiData)
            setIsLoading(false)
            return
          } catch (apiError) {
            console.warn("API fetch failed, falling back to local data:", apiError)
            // Continue to local data fallback
          }
        }

        // If API fetch failed or we're using local data
        const mockDataUrl = `/mock-data/${dataType}.json`
        const mockResponse = await fetch(mockDataUrl)

        if (!mockResponse.ok) {
          throw new Error(`Failed to load mock data: ${mockResponse.status}`)
        }

        const mockData = await mockResponse.json()

        // Extract the relevant part of the mock data based on params
        let result = mockData

        if (params.id) {
          // If we're looking for a specific item detail
          const detailKey = getDetailKey(dataType)
          if (detailKey && mockData[detailKey]) {
            result = mockData[detailKey]
          } else if (Array.isArray(mockData[dataType])) {
            // Try to find the item in the array
            const item = mockData[dataType].find((item: any) => item.id === params.id)
            if (item) {
              result = item
            }
          }
        } else if (params.type) {
          // If we're filtering by type
          if (Array.isArray(mockData[dataType])) {
            result = {
              ...mockData,
              [dataType]: mockData[dataType].filter(
                (item: any) =>
                  item.category?.toLowerCase() === params.type?.toLowerCase() ||
                  item.type?.toLowerCase() === params.type?.toLowerCase(),
              ),
            }
          }
        }

        setData(result as T)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError(error instanceof Error ? error : new Error(String(error)))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dataType, JSON.stringify(params), dataSource])

  return { data, isLoading, error }
}

/**
 * Build the API URL based on the data type and parameters
 */
function buildApiUrl(dataType: DataType, params: FetchParams): string {
  // This would be replaced with your actual API URL structure
  let baseUrl = `/api/${dataType}`

  if (params.id) {
    baseUrl += `/${params.id}`
  }

  const queryParams = new URLSearchParams()

  if (params.type) {
    queryParams.append("type", params.type)
  }

  if (params.filter) {
    queryParams.append("filter", params.filter)
  }

  if (params.page) {
    queryParams.append("page", params.page.toString())
  }

  if (params.limit) {
    queryParams.append("limit", params.limit.toString())
  }

  const queryString = queryParams.toString()
  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}

/**
 * Get the detail key for a specific data type
 */
function getDetailKey(dataType: DataType): string | null {
  const detailKeys: Record<DataType, string> = {
    posts: "postDetail",
    trending: "trendingDetail",
    memes: "memeDetail",
    challenges: "challengeDetail",
    celebrities: "celebrityDetail",
    live: "liveDetail",
    profile: "profileDetail",
    points: "pointsDetail",
    "creator-studio": "creatorStudioDetail",
  }

  return detailKeys[dataType] || null
}
