import React from 'react'

const AdminContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='w-full m-2'>
        {children}
    </div>
  )
}

export default AdminContainer