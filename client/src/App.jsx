import { useEffect, useState } from 'react'
import './shared/css/App.css'
import { validate } from './features/auth/services/validate'
import { loginContext } from './features/auth/context/LoginContext'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'
import Spinner from './shared/ui_components/Spinner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './features/auth/services/queryClient'


function App() {

  const [islogin, setlogin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkLogin = async () => {

      const result = await validate();
      setlogin(result)
      setLoading(false)
    }

    checkLogin()

  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <loginContext.Provider value={{ islogin, setlogin }}>

        <RouterProvider router={router}>
        </RouterProvider>

      </loginContext.Provider>
    </QueryClientProvider>
  )
}

export default App
