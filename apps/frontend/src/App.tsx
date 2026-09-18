import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import LuxuryHeader from "./components/LuxuryHeader";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./features/auth/AuthContext";
import { BookingContext } from "./hooks/useBooking";
import Home from "./pages/Home";
import Story from "./pages/Story";
import Contact from "./pages/Contact";
import Track from "./pages/Track";
import Builder from "./features/builder/Builder";
import OrderSuccess from "./features/orders/OrderSuccess";

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <AuthProvider>
      <BookingContext.Provider value={{ openBooking: () => setBookingOpen(true) }}>
        <ScrollToTop />
        <LuxuryHeader />
        <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />

        <main
          style={{
            paddingTop: isHome ? 0 : "var(--header-h)",
            minHeight: "calc(100vh - var(--header-h))",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<Story />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/track" element={<Track />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/orders/success/:orderId" element={<OrderSuccess />} />
            <Route path="/login" element={<Home />} />
            <Route path="/register" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </BookingContext.Provider>
    </AuthProvider>
  );
}
