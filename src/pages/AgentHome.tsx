"use client"

import type React from "react"
import { useState } from "react"
import { friendlyTimeAgo } from "../utils/dateFormat"
import { formatPrice } from "../utils/formatPrice"
import ImageModal from "../components/Ui/ImageModal"
import { Add, Location, Eye, Edit, Building } from "iconsax-react"
import { Link } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { fetchUserById } from "../lib/fetchUser"
import Head from "../components/Home/Head"

const AgentHome = ({ user }: { user: any }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")

  const { data: userDet } = useQuery({
    queryKey: ["user", user?._id],
    queryFn: () => fetchUserById(user?._id),
  })

  const handleImageClick = (e: React.MouseEvent, imageSrc: string) => {
    e.stopPropagation()
    setSelectedImage(imageSrc)
    setIsImageModalOpen(true)
  }

  const hostels = userDet?.hostels || []

  return (
    <main className="min-h-dvh bg-gray-50 dark:bg-gray-900">
      <Head user={user} isAgent />

      <section className="p-6 pt-24 pb-20">
        {hostels && hostels.length > 0 ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-dark dark:text-white">Your Listings</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your hostel properties</p>
              </div>
              {/* <Link
                to="/hostels/create"
                className="bg-primary hover:bg-primary/90 text-white p-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-custom"
              >
                <Add size={20} />
              </Link> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Building size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-dark dark:text-white">{hostels.length}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Listings</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Eye size={20} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-dark dark:text-white">
                      {hostels.filter((h: any) => h.isAvailable).length}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hostel Listings */}
            <div className="space-y-4">
              {hostels.map((item: any, i: number) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/25 transition-all duration-200"
                >
                  <div className="relative">
                    <img
                      src={item?.images[0] || "/placeholder.svg"}
                      className="w-full h-48 object-cover cursor-pointer"
                      alt={item?.hostelName}
                      onClick={(e) => handleImageClick(e, item?.images[0])}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item?.isAvailable
                            ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
                            : "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300"
                        }`}
                      >
                        {item?.isAvailable ? "Available" : "Not Available"}
                      </div>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute bottom-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {formatPrice(item?.price)}
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <h3 className="text-lg font-bold text-dark dark:text-white">{item?.hostelName}</h3>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Location size={16} className="text-gray-400 dark:text-gray-500" />
                      <span className="text-sm">{item?.location}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Last updated: {friendlyTimeAgo(item?.updatedAt)}
                      </span>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/hostels/agent/${item?._id}`}
                          className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-2 rounded-lg transition-colors duration-200"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          to={`/hostels/${item?._id}/edit`}
                          className="bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary dark:text-primary-light p-2 rounded-lg transition-colors duration-200"
                        >
                          <Edit size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-6 max-w-md">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                <Building size={40} className="text-gray-400 dark:text-gray-500" />
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-dark dark:text-white">No Listings Yet</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  You haven't added any hostels yet. Posting your first listing is easy and takes just a few minutes!
                </p>
              </div>

              <Link
                to="/hostels/create"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-custom"
              >
                <Add size={20} />
                Post Your First Hostel
              </Link>
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <Link
          to="/hostels/create"
          className="fixed bottom-20 right-6 bg-primary hover:bg-primary/90 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-custom transition-all duration-200"
        >
          <Add size={24} />
        </Link>

        {/* Image Modal */}
        <ImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          imageSrc={selectedImage}
          imageAlt="Hostel Image"
        />
      </section>
    </main>
  )
}

export default AgentHome
