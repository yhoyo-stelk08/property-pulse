import React from 'react'

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