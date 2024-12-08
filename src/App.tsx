import { BrowserRouter, Route, Routes } from "react-router";
import AccountType from "./components/Onboarding/AccountType";
import StudentOnboarding from "./pages/StudentOnboarding";
import AgentSignup from "./components/Auth/AgentSignup";
import AgentLogin from "./components/Auth/AgentLogin";
import AgentOnboarding from "./pages/AgentOnboarding";
import StudentSignup from "./components/Auth/StudentSignup";
import VerifyEmail from "./components/Auth/VerifyEmail";
import EmailConfirmed from "./components/Auth/EmailConfirmed";
import SchoolID from "./components/Auth/SchoolID";
import StudentLogin from "./components/Auth/StudentLogin";
import Payment from "./pages/Payment";
import AddNewCard from "./pages/AddNewCard";
import BankTransfer from "./components/Payment/BankTransfer";
import SuccessfulPayment from "./components/Payment/SuccessfulPayment";
import Checkout from "./components/Payment/Checkout";
import StudentHome from "./pages/StudentHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AccountType />} />
          {/* Students Routes */}
          <Route path="student">
            <Route path="/student" element={<StudentHome />} />
            <Route path="/student/onboarding" element={<StudentOnboarding />} />
            <Route path="/student/signup" element={<StudentSignup />} />
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/schoolID" element={<SchoolID />} />
          </Route>
          {/* Agents Routes */}
          <Route path="agent">
            <Route path="/agent/onboarding" element={<AgentOnboarding />} />
            <Route path="/agent/signup" element={<AgentSignup />} />
            <Route path="/agent/login" element={<AgentLogin />} />
          </Route>
          {/* Email Verification */}
          {/* Implement protected routes logic */}
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/email-confirmed" element={<EmailConfirmed />} />

          {/* checkout */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Payment route */}

          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/add-new-card" element={<AddNewCard />} />
          <Route path="/payment/bank-transfer" element={<BankTransfer />} />
          <Route path="/payment/successful" element={<SuccessfulPayment />} />


          

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
