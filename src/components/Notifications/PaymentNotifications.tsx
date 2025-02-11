import React from 'react'
import EmptyNotifications from '../Reuseables/EmptyNotifications'

const PaymentNotifications: React.FC = () => {
  return (
    <div className="h-full w-full">
    {/* Fetch notification from the backend and display them */}
    <EmptyNotifications />
  </div>
  )
}

export default PaymentNotifications