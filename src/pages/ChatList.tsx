"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router"
import { SearchNormal, ArrowLeft, Message, Filter } from "iconsax-react"
import ChatComponent from "../components/Ui/ChatComponent"
import { fetchConversations } from "../lib/fetchConversations"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { type ConversationType, useConversationStore } from "../store/useConversationStore"

const ChatList = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")

  const { storedConversations, setStoredConversations } = useConversationStore()

  const [conversationList, setConversationList] = useState<ConversationType[] | null>(null)

  const { data: fetchedConversations, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  })

  useEffect(() => {
    if (!isLoading) {
      // Conversations loaded
    }
  }, [isLoading, fetchedConversations])

  useEffect(() => {
    if (fetchedConversations && JSON.stringify(fetchedConversations) !== JSON.stringify(storedConversations)) {
      setStoredConversations(fetchedConversations)
    }

    const convoData = fetchedConversations || storedConversations
    setConversationList(convoData)
  }, [fetchedConversations, storedConversations, setStoredConversations])

  const filteredConversations = conversationList?.filter(
    (convo: any) =>
      convo.hostelName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      convo.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <main className="min-h-dvh bg-white dark:bg-theme">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-theme border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3 px-4 py-6">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center w-8 h-8">
            <ArrowLeft size={20} className="text-gray-900 dark:text-gray-100" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex-1">Messages</h1>
          <button className="flex items-center justify-center w-8 h-8">
            <Filter size={20} className="text-gray-900 dark:text-gray-100" />
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="px-4 py-5 border-b border-gray-100 dark:border-gray-800">
        <div className="relative">
          <SearchNormal
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-4 bg-gray-50 dark:bg-[#222] border-0 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-gray-700 transition-all duration-200"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center space-y-3">
              <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-primary rounded-full animate-spin mx-auto"></div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading conversations...</p>
            </div>
          </div>
        ) : filteredConversations?.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-3 max-w-sm">
              <div className="w-16 h-16 bg-gray-100 dark:bg-[#222] rounded-full flex items-center justify-center mx-auto">
                <Message size={24} className="text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No messages</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {searchQuery ? "No conversations match your search." : "Start a conversation to see messages here."}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => navigate("/search")}
                  className="mt-3 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg"
                >
                  Find Hostels
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredConversations?.map((item: any, i: number) => (
              <Link key={i} to={`/chat/${item.otherUser?._id}`} className="block">
                <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors duration-150">
                  <ChatComponent item={item} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default ChatList
