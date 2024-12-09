import { BrowserRouter, Route, Routes } from "react-router";
import AccountType from "./components/Onboarding/AccountType";
import StudentOnboarding from "./pages/studentOnboarding";
import AgentSignup from "./components/Auth/AgentSignup";
import AgentLogin from "./components/Auth/AgentLogin";
import AgentOnboarding from "./pages/agentOnboarding";
import StudentSignup from "./components/Auth/StudentSignup";
import VerifyEmail from "./components/Auth/VerifyEmail";
import EmailConfirmed from "./components/Auth/EmailConfirmed";
import SchoolID from "./components/Auth/SchoolID";
import StudentLogin from "./components/Auth/StudentLogin";
import WishlistOrBookmark from "./pages/Wishlist";
import AllNotifications from "./components/Notifications/AllNotifications";
import NotificationsAlert from "./pages/Notifications";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AccountType />} />
          {/* Students Routes */}
          <Route path="student">
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
