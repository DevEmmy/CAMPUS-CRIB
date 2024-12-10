import { BrowserRouter, Route, Routes } from "react-router";
import AccountType from "./components/Onboarding/AccountType";
import StudentOnboarding from "./pages/studentOnboarding";
import AgentOnboarding from "./pages/agentOnboarding";
import VerifyEmail from "./components/Auth/VerifyEmail";
import EmailConfirmed from "./components/Auth/EmailConfirmed";
import WishlistOrBookmark from "./pages/Wishlist";
import AllNotifications from "./components/Notifications/AllNotifications";
import NotificationsAlert from "./pages/Notifications";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import VerifyAgent from "./components/Auth/VerifyAgent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AccountType />} />
          {/* Student Onboarding */}
          <Route path="student">
            <Route path="/student/onboarding" element={<StudentOnboarding />} />
            {/* <Route path="/student/schoolID" element={<SchoolID />} /> */}
          </Route>

          {/* Agent Onboarding */}
          <Route path="agent">
            <Route path="/agent/onboarding" element={<AgentOnboarding />} />
            <Route path="/agent/verification" element={<VerifyAgent/>} />
          </Route>

          {/* Authentication */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Notification Alerts */}
          <Route path="notifications" element={<NotificationsAlert />}>
            <Route path="/notifications" element={<AllNotifications />} />
          </Route>

          {/* Email Verification */}
          {/* Implement protected routes logic */}
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/email-confirmed" element={<EmailConfirmed />} />

          {/* Wishlist & Bookmark */}
          <Route path="/wishlist" element={<WishlistOrBookmark />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
