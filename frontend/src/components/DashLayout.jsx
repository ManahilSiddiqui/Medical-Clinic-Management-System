import React from 'react'
import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import '../css/dashLayout.css'

const DashLayout = () => {
  return (
    <div className='dash'>
      <DashHeader/>
      <div className="dash-container">
        <Outlet />
      </div>
      <DashFooter/>
    </div>
  )
}

export default DashLayout
