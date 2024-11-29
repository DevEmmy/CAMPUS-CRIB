import { BrowserRouter, Route, Routes } from "react-router"
import AccountType from "./components/Onboarding/AccountType"
import StudentOnboarding from "./pages/StudentOnboarding"
import Signup from "./components/Auth/Signup"


function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<AccountType/>} />
          <Route path='/onboarding' element={<StudentOnboarding/>} />
          <Route path='/signup' element={<Signup/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
