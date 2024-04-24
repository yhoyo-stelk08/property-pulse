import React from 'react'
import '@/assets/styles/global.css'

export const metadata = {
  title: 'PropertyPulse | Find your perfect rental',
  description: 'Find your dream rental property',
  keywords: 'rentals, find rentals, find properties',
}

const MainLayout = ({children}) => {
  return (
    <html lang='EN'>
      <body>
        <div>{children}</div>
      </body>
    </html>
  )
}

export default MainLayout