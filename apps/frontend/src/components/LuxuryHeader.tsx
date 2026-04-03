import { useState } from "react";
import logo from "/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

export default function LuxuryHeader() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-50 bg-black/90 backdrop-blur border-b border-white/5 mb-96">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand */}
          <img src={logo} alt="" width={132} />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 text-sm text-white/80">
            <Link to="/" className="hover:text-gold">
              الرئيسية
            </Link>
            <Link to="/story" className="hover:text-gold">
              قصتنا
            </Link>
            <Link to="/contact" className="hover:text-gold">
              تواصل معنا
            </Link>
            <Link to="/builder" className="hover:text-gold">
              صمّم ثوبك
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/track">
              <button className="px-5 py-2 border-2 border-gold! text-white hover:bg-gold hover:text-black transition">
                تتبع طلبك
              </button>
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2 text-white/60 hover:text-white transition text-sm"
              >
                تسجيل الخروج
              </button>
            ) : (
              <Link to="/login">
                <button className="px-5 py-2 bg-gold text-black font-semibold hover:bg-yellow-400 transition text-sm">
                  تسجيل الدخول
                </button>
              </Link>
            )}
          </div>

          {/* Burger */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-gold focus:outline-none"
            aria-label="Open menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[80%] max-w-sm bg-black text-white
        transform transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <span className="text-gold font-heading text-lg">وسم</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-gold transition"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-6 text-lg">
            <Link
              onClick={() => setOpen(false)}
              to="/"
              className="hover:text-gold"
            >
              الرئيسية
            </Link>
            <Link
              onClick={() => setOpen(false)}
              to="/builder"
              className="hover:text-gold"
            >
              صمّم ثوبك
            </Link>
            <Link
              onClick={() => setOpen(false)}
              to="/story"
              className="hover:text-gold"
            >
              قصتنا
            </Link>
            <Link
              onClick={() => setOpen(false)}
              to="/contact"
              className="hover:text-gold"
            >
              تواصل معنا
            </Link>
          </nav>

          {/* CTA */}
          <div className="mt-auto space-y-3">
            <Link to="/track" onClick={() => setOpen(false)}>
              <button className="w-full py-3 border border-gold text-gold rounded-md font-medium">
                تتبع طلبك
              </button>
            </Link>
            {user ? (
              <button
                onClick={() => { handleLogout(); setOpen(false); }}
                className="w-full py-3 bg-white/10 text-white rounded-md font-medium"
              >
                تسجيل الخروج
              </button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)}>
                <button className="w-full py-3 bg-gold text-black rounded-md font-medium">
                  تسجيل الدخول
                </button>
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
