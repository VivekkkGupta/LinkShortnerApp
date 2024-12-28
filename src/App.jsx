import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import PageLayout from './pages/PageLayout'

function App() {
  const router = createBrowserRouter([
    {
      element:<PageLayout/>,
      children:[
        {
          path:"/",
          element:<Home/>
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App