import { Route, Routes } from "react-router";
import { useState, useEffect, useCallback } from "react";
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
import HostelDetails from "./components/Hostel/HostelDetails";
import Chat from "./pages/Chat";
import CreateHostel from "./components/Hostel/CreateHostel";
import WishlistOrBookmark from "./pages/Wishlist";
import NotificationsAlert from "./pages/Notifications";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import VerifyAgent from "./components/Auth/VerifyAgent";
import ScreenLayout from "./Layout/ScreenLayout";
import SearchPage from "./pages/Search";
import Review from "./components/Review/Review";
import ChatList from "./pages/ChatList";
import Profile from "./pages/Profile";
import PersonalDetails from "./pages/Profile/PersonalDetails";
import MyBookings from "./pages/Profile/MyBookings";
import Settings from "./pages/Profile/Settings";
import SavedHostels from "./pages/Profile/SavedHostels";
import PaymentHistory from "./components/Payment/PaymentHistory";
import PaymentDetails from "./components/Payment/PaymentDetails";
import HomepageLayout from "./Layout/HomepageLayout.tsx";
import Report from "./components/Report/Report.tsx";
import Withdraw from "./pages/Withdraw/Withdraw.tsx";
import WithdrawalStatus from "./pages/Withdraw/WithdrawalStatus.tsx";
import CreateInvoice from "./pages/Invoice/CreateInvoice.tsx";
import SuccessfulInvoice from "./pages/Invoice/SuccessfulInvoice.tsx";
import ViewInvoice from "./pages/Invoice/ViewInvoice.tsx";
import BookingsList from "./pages/Bookings/Bookings.tsx";
import BookingsDetails from "./pages/Bookings/BookingsDetails.tsx";
import RecentTransactions from "./pages/Profile/RecentTransactions.tsx";
import CreateRoommate from "./components/Hostel/CreateRoommate.tsx";
import RoommateRequestDetails from "./components/Hostel/RoommateRequestDetails.tsx";
import FindRoommate from "./pages/Roommate/index.tsx";
import ForgotPassword from "./components/Auth/ForgotPassword.tsx";
import ResetPassword from "./components/Auth/ResetPassword.tsx";
import Pricing from "./pages/Pricing/index.tsx";
import SplashScreen from "./components/Ui/SplashScreen.tsx";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if user has seen splash before
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = useCallback(() => {
    console.log('Splash complete called');
    setShowSplash(false);
    localStorage.setItem('hasSeenSplash', 'true');
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <>
      <Routes>
        <Route element={<ScreenLayout />}>
          <Route path="/" element={<HomepageLayout />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/chat" element={<ChatList />} />
          <Route path="/wishlist" element={<WishlistOrBookmark />} />
          <Route path="/profile" element={<Profile />} />
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
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        

        {/* Notification Alerts */}
        <Route path="/notifications" element={<NotificationsAlert />} />

        {/* Email Verification */}
        {/* Implement protected routes logic */}
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/email-confirmed" element={<EmailConfirmed />} />

        {/* checkout */}
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/create/invoice" element={<CreateInvoice />} />
        <Route path="/successful/invoice" element={<SuccessfulInvoice />} />
        <Route path="/invoice/:invoiceType" element={<ViewInvoice />} />

        {/* Payment route */}

        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/add-new-card" element={<AddNewCard />} />
        <Route path="/payment/bank-transfer" element={<BankTransfer />} />
        <Route path="/payment/successful" element={<SuccessfulPayment />} />

        {/* Pricing */}
        <Route path="/pricing" element={<Pricing />} />



        {/* Hostel details */}
        {/* <Route path="/hostel/:hostelId" element={<HostelDetails />} /> */}
        <Route path="hostels">
          <Route path="/hostels/:hostelId" element={<HostelDetails />} />
          <Route path="/hostels/create" element={<CreateHostel />} />
        </Route>

        {/* Feeds - find roommate */}
        <Route path="/find-roommate" element={<FindRoommate />} />
        <Route path="/find-roommate/create" element={<CreateRoommate />} />
        <Route path="/find-roommate/:id" element={<RoommateRequestDetails />} />

        {/* Chat */}

        <Route path="chat">
          <Route path="/chat/:userId" element={<Chat />} />
        </Route>

        {/* Wishlist & Bookmark */}
        <Route path="/wishlist" element={<WishlistOrBookmark />} />

        <Route path="/review/:hostelId" element={<Review />} />

        {/* Report */}
        <Route path="/report" element={<Report />} />

        {/* Withdraw */}
        <Route path="/withdraw" element={<Withdraw />} />
        <Route
          path="/withdrawal-status/:isSuccess/:price"
          element={<WithdrawalStatus />}
        />

        <Route path="/personal-details" element={<PersonalDetails />} />

        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/bookings" element={<BookingsList />} />
        <Route path="/bookings/:bookingId" element={<BookingsDetails />} />

        <Route path="/setting/:settingsType" element={<Settings />} />

        <Route path="/saved-hostels" element={<SavedHostels />} />

        <Route path="/payment-history" element={<PaymentHistory />} />

        <Route path="/payment-details" element={<PaymentDetails />} />

        <Route path="/recent-transactions" element={<RecentTransactions />} />
      </Routes>
    </>
  );
}

export default App;
