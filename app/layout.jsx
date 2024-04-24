import React from 'react'
import '@/assets/styles/global.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'PropertyPulse | Find your perfect rental',
  description: 'Find your dream rental property',
  keywords: 'rentals, find rentals, find properties',
}

const MainLayout = ({children}) => {
  return (
    <html lang='EN'>
      <body>
        <Navbar></Navbar>
        <main>{children}</main>
      </body>
    </html>
  )
}

export default MainLayout