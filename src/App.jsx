import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import Settings from './pages/Settings/Settings'
import PageLayout from './pages/PageLayout'
import Auth from './pages/Auth/Auth'

function App() {
  const router = createBrowserRouter([
    {
      element: <PageLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/auth",
          element: <Auth />
        },
        {
          path: "/settings",
          element: <Settings />
        },
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App