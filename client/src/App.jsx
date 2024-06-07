import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import { GlobalProvider } from './contexts/GlobalContext'
import Homepage from './pages/Homepage'
import Login from './pages/Login'

function App() {
const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Homepage/>
      },
      {
        path: '/login',
        element: <Login/>
      }
    ]
  }
])
  return (
    <>
    <GlobalProvider>
      <RouterProvider router={router}/>
    </GlobalProvider>
    </>
  )
}

export default App
