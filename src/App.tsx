import { BrowserRouter, Route, Routes } from "react-router";
import AccountType from "./components/Onboarding/AccountType";
import StudentOnboarding from "./pages/studentOnboarding";
import AgentOnboarding from "./pages/agentOnboarding";
import VerifyEmail from "./components/Auth/VerifyEmail";
import EmailConfirmed from "./components/Auth/EmailConfirmed";
import Payment from "./pages/Payment";
import AddNewCard from "./pages/AddNewCard";
import BankTransfer from "./components/Payment/BankTransfer";
import SuccessfulPayment from "./components/Payment/SuccessfulPayment";
import Checkout from "./components/Payment/Checkout";
import StudentHome from "./pages/StudentHome";
import HostelDetails from "./components/Hostel/HostelDetails";
import Chat from "./pages/Chat";
import AgentHome from "./pages/AgentHome";
import CreateHostel from "./components/Hostel/CreateHostel";
import WishlistOrBookmark from "./pages/Wishlist";
import AllNotifications from "./components/Notifications/AllNotifications";
import NotificationsAlert from "./pages/Notifications";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import VerifyAgent from "./components/Auth/VerifyAgent";
import ScreenLayout from "./Layout/ScreenLayout";
import SearchPage from "./pages/Search";
import AllConversationDisplay from "./components/Chat/AllConversationDisplay";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AccountType />} />
          <Route element={<ScreenLayout />}>
            <Route path="/agent" element={<AgentHome />} />
            <Route path="/student" element={<StudentHome />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/wishlist" element={<WishlistOrBookmark />} />
          </Route>
          <Route path="/account-type" element={<AccountType />} />

          {/* Student Onboarding */}
          <Route path="student">
            <Route path="/student/onboarding" element={<StudentOnboarding />} />
            {/* <Route path="/student/schoolID" element={<SchoolID />} /> */}
          </Route>

          {/* Agent Onboarding */}
          <Route path="agent">
            <Route path="/agent/onboarding" element={<AgentOnboarding />} />
            <Route path="/agent/verification" element={<VerifyAgent />} />
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

          {/* checkout */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Payment route */}

          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/add-new-card" element={<AddNewCard />} />
          <Route path="/payment/bank-transfer" element={<BankTransfer />} />
          <Route path="/payment/successful" element={<SuccessfulPayment />} />

          {/* Hostel details */}
          {/* <Route path="/hostel/:hostelId" element={<HostelDetails />} /> */}
          <Route path="hostel">
            <Route path="/hostel/:hostelId" element={<HostelDetails />} />
            <Route path="/hostel/create" element={<CreateHostel />} />
          </Route>
          {/* Chat */}

          <Route path="chat">
            <Route path="/chat" element={<AllConversationDisplay />} />
            <Route path="/chat/:userId" element={<Chat />} />
          </Route>

          {/* Wishlist & Bookmark */}
          <Route path="/wishlist" element={<WishlistOrBookmark />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
