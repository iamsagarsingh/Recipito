import { Outlet } from "react-router-dom"
import { Navbar } from "./react-components/Navbar"


function App() {

  return (
   <>
   <Navbar />
   <Outlet />
   </>
  )
}

export default App
