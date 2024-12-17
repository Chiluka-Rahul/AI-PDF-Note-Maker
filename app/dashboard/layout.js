import React from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'

const DashboardLayout = ({children}) => {
  return (
    <div className='w-full flex min-h-screen'>
        <div className='w-[18%]  min-h-screen'>
            <SideBar />
        </div>
        <div className='w-[82%] '>
            <Header />
            <div className='p-10'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout