import { Routes, Route } from "react-router-dom";

import LuxuryHeader from "./components/LuxuryHeader";
import Home from "./pages/Home";
import Story from "./pages/Story";
import Contact from "./pages/Contact";
import Track from "./pages/Track";

export default function App() {
  return (
    <>
      <LuxuryHeader />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/track" element={<Track />} />
      </Routes>
    </>
  );
}
