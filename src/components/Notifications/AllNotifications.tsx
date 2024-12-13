import React from 'react'
import EmptyNotifications from '../Reuseables/EmptyNotifications'

const AllNotifications: React.FC = () => {
  return (
    <div className='h-full w-full'>
      {/* Fetch notificstion from the backend and display them */}
      <EmptyNotifications/>
    </div>
  )
}

export default AllNotifications