import { useState } from "react"
import TitleHead from "../../components/Ui/TitleHead"
import { formatDate } from "../../utils/dateFormat"
import Modal from "../../components/Ui/Modal"
import OTPForm from "./OtpForm"
import { useNavigate } from "react-router"

const Withdraw = () => {
  const [show, setShow] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleContinue = () => {
    const isSuccessful = true 
    const price = 50.0 
    navigate(`/withdrawal-status/${isSuccessful}/${price}`)
  }

  return (
    <main>
      <TitleHead title="Withdraw funds" />
      <section className="p-5 h-full w-full mt-14 dark:bg-gray-900">
        <div>
          <p className="text-[#636363] dark:text-gray-400">Wallet balance</p>
          <p className="text-primary font-semibold text-xl">$5,200.00</p>
          <p className="text-[#636363] dark:text-gray-400 italic text-xs">{formatDate()}</p>
        </div>

        {!show && (
          <button className="p-2.5 text-white rounded-lg w-full my-2.5 bg-[#1B85A6] hover:bg-[#156B85] dark:hover:bg-[#1A7A9A]">
            View Transaction History
          </button>
        )}

        <div className="flex flex-col gap-3 my-3 py-5">
          <div className="flex flex-col gap-1">
            <label className="dark:text-gray-300">Amount to Withdraw</label>
            <input
              type="number"
              placeholder="Enter Amount (e.g., $500)"
              className="w-full p-3 rounded-xl bg-[#FCFCFC] dark:bg-gray-800 dark:border dark:border-gray-600 text-dark dark:text-white dark:placeholder-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="dark:text-gray-300">Withdrawal Method</label>
            <select
              className="border dark:border-gray-600 w-full p-3 rounded-xl bg-[#FCFCFC] dark:bg-gray-800 text-dark dark:text-white"
              onChange={(e) => setShow(e.target.value === "bank")}
            >
              <option value="">Withdrawal Method</option>
              <option value="bank">Bank Transfer</option>
              <option value="card">Card Payment</option>
            </select>
          </div>

          {show && (
            <>
              <div className="flex flex-col gap-1">
                <label className="dark:text-gray-300">Bank name</label>
                <select className="border dark:border-gray-600 w-full p-3 rounded-xl bg-[#FCFCFC] dark:bg-gray-800 text-dark dark:text-white">
                  <option value="">Uba</option>
                  <option value="">Paycom (Opay)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="dark:text-gray-300">Account Holder Name</label>
                <input
                  type="text"
                  placeholder="e.g John Does"
                  className="w-full p-3 rounded-xl bg-[#FCFCFC] dark:bg-gray-800 dark:border dark:border-gray-600 text-dark dark:text-white dark:placeholder-gray-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="dark:text-gray-300">Account Number</label>
                <input
                  type="text"
                  placeholder="e.g XXXX-1234"
                  className="w-full p-3 rounded-xl bg-[#FCFCFC] dark:bg-gray-800 dark:border dark:border-gray-600 text-dark dark:text-white dark:placeholder-gray-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="dark:text-gray-300">Withdrawal Fee</label>
                <input
                  type="text"
                  placeholder="$5 withdrawal fee"
                  className="w-full p-3 rounded-xl bg-[#FCFCFC] dark:bg-gray-700 dark:border dark:border-gray-600 text-dark dark:text-gray-300 dark:placeholder-gray-500"
                  disabled
                />
              </div>

              <button
                className="bg-primary p-3 rounded-xl text-white mt-4 hover:bg-primary/90"
                onClick={() => setIsOpen(true)}
              >
                Continue
              </button>
            </>
          )}
        </div>
      </section>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="text-center flex flex-col gap-2 dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-base text-dark dark:text-white font-semibold">
            An OTP has been sent to your registered phone/email
          </p>
          <p className="mt-2 text-variant-500 dark:text-gray-400 text-xs">
            Ensure that bank details are correct before submitting. Funds cannot be reversed once transferred
          </p>

          <OTPForm />

          <button onClick={handleContinue} className="bg-primary p-2.5 rounded-lg text-white hover:bg-primary/90">
            Continue
          </button>
        </div>
      </Modal>
    </main>
  )
}

export default Withdraw
