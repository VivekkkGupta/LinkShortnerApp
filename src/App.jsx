import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import Settings from './pages/Settings/Settings'
import PageLayout from './pages/PageLayout'
import Auth from './pages/Auth/Auth'
import UrlProvider from './context/context'
import Dashboard from './pages/Dashboard/Dashboard'
import RedirectLink from './pages/RedirectLink/RedirectLink'
import Link from './pages/Link/Link'
import RequireAuth from './components/require-auth'

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
          path: "/dashboard",
          element: <RequireAuth>
            <Dashboard />
          </RequireAuth>
        },
        {
          path: "/auth",
          element: <Auth />
        },
        {
          path: "/link/:id",
          element: <RequireAuth>
            <Link />
          </RequireAuth>
        },
        {
          path: "/:id",
          element: <RedirectLink />
        },
        {
          path: "/settings",
          element: <Settings />
        },
      ]
    }
  ])
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  )
}

export default App