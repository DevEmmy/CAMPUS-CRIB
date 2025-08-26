"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { fetchUserById } from "../lib/fetchUser"

import { ArrowLeft, Location, Building, Call, Calendar, Message, More } from "iconsax-react"
import HostelCard from "../components/Reuseables/HostelCard"
import ImageModal from "../components/Ui/ImageModal"
import ShareButton from "../components/Reuseables/ShareButton"
import type { Hostel } from "../types/Hostel"
import type { User } from "../types/user"

const AgentProfile = () => {
  const { agentId } = useParams()
  const navigate = useNavigate()
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")

  const { data, isLoading, error } = useQuery({
    queryKey: ["agent", agentId],
    queryFn: () => fetchUserById(agentId),
    enabled: !!agentId,
  })

  const handleImageClick = (e: React.MouseEvent, imageSrc: string) => {
    e.stopPropagation()
    setSelectedImage(imageSrc)
    setIsImageModalOpen(true)
  }

  const profileUrl = `${window.location.origin}/agent/${agentId}`

  const [agentData, setAgentData] = useState<User | null>(null)

  useEffect(() => {
    if (data) {
      setAgentData(data.user)
    }
  }, [data])

  const hostels = data?.hostels || []
  const availableHostels = hostels.filter((h: Hostel) => h.isAvailable)
  const occupiedHostels = hostels.filter((h: Hostel) => !h.isAvailable)

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading agent profile...</p>
        </div>
      </div>
    )
  }

  if (error || !agentData) {
    return (
      <div className="min-h-dvh bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building size={32} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-dark dark:text-white mb-2">Agent Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">The agent profile you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-dvh bg-white dark:bg-theme">
      {/* Header - Twitter-like */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-theme/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-900 dark:text-white" />
          </button>

          <div className="text-center">
            <h1 className="font-bold text-gray-900 dark:text-white">
              {agentData.firstName} {agentData.lastName}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{hostels.length} listings</p>
          </div>

          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <More size={20} className="text-gray-900 dark:text-white" />
          </button>
        </div>
      </div>

      {/* Profile Info - Twitter-like */}
      <div className="relative px-4 pt-6">
        {/* Profile Picture */}
        <div className="relative mb-6">
          <img
            src={
              agentData.profilePicture ||
              "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" 
            }
            alt={`${agentData.firstName} ${agentData.lastName}`}
            className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover mx-auto"
            onClick={(e) => handleImageClick(e, agentData.profilePicture)}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src =
                "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
            }}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 mb-1">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {agentData.firstName} {agentData.lastName}
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">{agentData.email}</p>
        </div>

        {/* Profile Info */}
        <div className="mb-6 text-center">
          <div className="space-y-2 flex flex-col items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mb-4 text-left max-w-md mx-auto">
            {agentData.address && (
              <div className="flex items-center gap-2">
                <Location size={16} className="text-gray-400 dark:text-gray-500" />
                <span className="text-sm">{agentData.address}</span>
              </div>
            )}

            {agentData.phoneNumber && (
              <div className="flex items-center gap-2">
                <Call size={16} className="text-gray-400 dark:text-gray-500" />
                <span className="text-sm">{agentData.phoneNumber}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400 dark:text-gray-500" />
              <span className="text-sm">
                Joined{" "}
                {new Date(agentData.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900 dark:text-white">{hostels.length}</span>
              <span className="text-gray-500 dark:text-gray-400">Listings</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900 dark:text-white">{availableHostels.length}</span>
              <span className="text-gray-500 dark:text-gray-400">Available</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900 dark:text-white">{occupiedHostels.length}</span>
              <span className="text-gray-500 dark:text-gray-400">Occupied</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-8">
          <div className="flex gap-3">
            {/* Chat Button */}
            <button
              onClick={() => navigate(`/chat/${agentData._id}`)}
              className="flex-1 bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Message size={20} />
              Start Chat
            </button>

            {/* Share Button */}
            <ShareButton text={profileUrl} variant="button" className="flex-1">
              Share Profile
            </ShareButton>
          </div>
        </div>
      </div>

      {/* Hostel Listings */}
      <div className="px-4 pb-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Hostel Listings</h3>
          <p className="text-gray-600 dark:text-gray-400">Browse all properties by this agent</p>
        </div>

        {hostels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hostels.map((hostel: Hostel) => (
              <HostelCard key={hostel._id} hostel={hostel} className="w-full" showFeatures={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building size={24} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Listings Yet</h3>
            <p className="text-gray-600 dark:text-gray-400">This agent hasn't posted any hostel listings yet.</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageSrc={selectedImage}
        imageAlt="Agent Profile"
      />
    </main>
  )
}

export default AgentProfile
