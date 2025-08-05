import { useEffect, useState } from 'react'
import './css/App.css'
import { validate } from './functions/validate'
import { loginContext } from './context/LoginContext'
import { RouterProvider } from 'react-router-dom'
import { router } from './components/Router'
import Spinner from './components/Spinner'

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

  if(loading)
  {
    return <Spinner/>
  }

  return (
    <loginContext.Provider value={{ islogin, setlogin }}>

      <RouterProvider router={router}>
      </RouterProvider>

    </loginContext.Provider>
  )
}

export default App
