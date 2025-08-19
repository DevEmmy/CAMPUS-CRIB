"use client"

import type React from "react"
import { useState } from "react"
import back from "/icons/back.svg"
import mastercard from "/icons/mastercard.png"
import { PiCaretDown, PiCaretRight, PiPlus } from "react-icons/pi"
import BankCard from "../components/Payment/BankCard"
import { Link } from "react-router"

const Payment: React.FC = () => {
  const [isCreditCard, setIsCreditCard] = useState<boolean>(true)
  return (
    <section className="size-full p-5 dark:bg-gray-900 dark:text-white">
      {/* <!-- Header --> */}
      <div className="flex items-center justify-between mb-4 pt-5 pb-3">
        <div className="rounded-full bg-primary size-7 flex items-center justify-center">
          <img src={back || "/placeholder.svg"} alt="back" className="size-3.5" />
        </div>
        <h1 className="text-xl font-bold dark:text-white">Payment Methods</h1>
        <div className="w-6"></div>
      </div>

      <div className="flex overflow-scroll gap-1">
        {[1, 2, 3, 4, 5].map((i: number) => (
          <BankCard key={i} />
        ))}
      </div>

      {/* <!-- Bank Transfer Section --> */}
      <div className="border-[0.5px] border-[#aaa] dark:border-gray-600 rounded-lg p-4 mb-4 flex justify-between items-center dark:text-white">
        <span>Bank Transfer</span>
        <PiCaretRight size={18} className="dark:text-white" />
      </div>

      {/* <!-- Credit Cards Section --> */}
      <div className="border-[0.5px] border-[#aaa] dark:border-gray-600 rounded-lg p-4 mb-4 dark:text-white">
        <div className="flex justify-between items-center">
          <span>Credit Cards</span>
          {isCreditCard ? (
            <PiCaretDown
              size={16}
              onClick={() => setIsCreditCard(!isCreditCard)}
              className="dark:text-white cursor-pointer"
            />
          ) : (
            <PiCaretRight
              size={16}
              onClick={() => setIsCreditCard(!isCreditCard)}
              className="dark:text-white cursor-pointer"
            />
          )}
        </div>

        {isCreditCard && (
          <div className="space-y-4 my-4">
            <div className="flex items-center justify-between border-[0.5px] border-[#DFBFAD] dark:border-gray-600 rounded-lg p-2">
              <div className="flex items-center">
                <img alt="Mastercard logo" className=" h-8 w-fit mr-2" src={mastercard || "/placeholder.svg"} />
                <span className="dark:text-white">First Bank **** 4567</span>
              </div>

              <input type="radio" name="" id="" className="checked:bg-primary checked:text-primary" />
            </div>

            <div className="flex items-center justify-between border-[0.5px] border-[#DFBFAD] dark:border-gray-600 rounded-lg p-2">
              <div className="flex items-center">
                <img alt="Mastercard logo" className=" h-8 w-fit mr-2" src={mastercard || "/placeholder.svg"} />
                <span className="dark:text-white">Wema Bank **** 4567</span>
              </div>
              <input type="radio" name="" id="" className="checked:bg-primary checked:text-primary" />
            </div>
            <Link to={"/payment/add-new-card"} className="flex gap-2 items-center">
              <span className="bg-[#D1A388] rounded-full size-6 flex items-center justify-center">
                <PiPlus className="text-primary font-bold" />
              </span>
              <span className="text-sm dark:text-gray-300">add new card</span>
            </Link>
          </div>
        )}
      </div>

      {/* <!-- Amount to Pay Section --> */}
      <div className="text-center mb-4">
        <span className="text-gray-500 dark:text-gray-400">Amount to Pay:</span>
        <span className="font-bold dark:text-white">#250,000</span>
      </div>

      {/* <!-- Pay Now Button --> */}
      <button className="w-full bg-primary text-white p-3 mt-5 rounded-lg font-bold">Pay Now</button>
    </section>
  )
}

export default Payment
