"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface LiveChatProps {
  id: string
}

export function LiveChat({ id }: LiveChatProps) {
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    // Simulate initial chat messages
    const initialMessages = Array(10)
      .fill(0)
      .map((_, i) => ({
        id: `msg-${i}`,
        user: {
          name: `사용자${i + 1}`,
          avatar: `/placeholder.svg?height=30&width=30`,
        },
        text:
          i % 3 === 0
            ? "안녕하세요! 오늘 방송 재밌네요 😊"
            : i % 3 === 1
              ? "질문 있어요! 다음 방송은 언제인가요?"
              : "좋아요 누르고 갑니다~",
        timestamp: new Date().toISOString(),
      }))

    setMessages(initialMessages)

    // Simulate new messages coming in
    const interval = setInterval(() => {
      const newMsg = {
        id: `msg-${Date.now()}`,
        user: {
          name: `사용자${Math.floor(Math.random() * 100)}`,
          avatar: `/placeholder.svg?height=30&width=30`,
        },
        text: ["안녕하세요!", "재밌어요!", "좋아요 누르고 갑니다~", "다음 방송도 기대할게요!"][
          Math.floor(Math.random() * 4)
        ],
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, newMsg])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    const userMessage = {
      id: `msg-${Date.now()}`,
      user: {
        name: "나",
        avatar: `/placeholder.svg?height=30&width=30`,
      },
      text: newMessage,
      timestamp: new Date().toISOString(),
      isCurrentUser: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
  }

  return (
    <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-bold">라이브 채팅</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex items-start ${message.isCurrentUser ? "justify-end" : ""}`}>
            {!message.isCurrentUser && (
              <img
                src={message.user.avatar || "/placeholder.svg"}
                alt={message.user.name}
                className="w-6 h-6 rounded-full mr-2"
              />
            )}
            <div className={`max-w-[80%] ${message.isCurrentUser ? "bg-blue-100" : "bg-gray-100"} p-2 rounded-lg`}>
              {!message.isCurrentUser && <p className="text-xs font-medium">{message.user.name}</p>}
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지 입력..."
            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 text-sm">
            전송
          </button>
        </form>
      </div>
    </div>
  )
}
