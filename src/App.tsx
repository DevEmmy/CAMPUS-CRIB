import { BrowserRouter, Route, Routes } from "react-router"
import AccountType from "./components/Onboarding/AccountType"
import StudentOnboarding from "./pages/StudentOnboarding"
import VerifyAgent from "./components/Auth/VerifyAgent"


function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<AccountType/>} />
          <Route path='/onboarding' element={<StudentOnboarding/>} />
          <Route path='/signup' element={<VerifyAgent/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
