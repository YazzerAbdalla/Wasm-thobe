import { Routes, Route } from "react-router-dom";

import LuxuryHeader from "./components/LuxuryHeader";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./features/auth/AuthContext";
import Home from "./pages/Home";
import Story from "./pages/Story";
import Contact from "./pages/Contact";
import Track from "./pages/Track";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import Builder from "./features/builder/Builder";
import OrderSuccess from "./features/orders/OrderSuccess";

export default function App() {
  return (
    <AuthProvider>
      <LuxuryHeader />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/track" element={<Track />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/builder" element={<Builder />} />
          <Route path="/orders/success/:orderId" element={<OrderSuccess />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
