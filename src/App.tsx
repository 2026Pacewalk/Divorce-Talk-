import { Routes, Route } from "react-router";
import DemoBanner from "@/components/DemoBanner";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import BottomNav from "@/components/BottomNav";
import PacewalkCredit from "@/components/PacewalkCredit";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Guidelines from "./pages/Guidelines";
import Safety from "./pages/Safety";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Emergency from "./pages/Emergency";
import Rooms from "./pages/Rooms";
import Journal from "./pages/Journal";
import HearMe from "./pages/HearMe";
import CheckIn from "./pages/CheckIn";
import Stories from "./pages/Stories";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <DemoBanner />
      <div className="pb-24 lg:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/hear-me" element={<HearMe />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <PacewalkCredit />
      </div>
      <BottomNav />
    </>
  );
}
