import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import CollectionPage from "@/pages/CollectionPage";
import MembershipPage from "@/pages/MembershipPage";
import AcademicWorksPage from "@/pages/AcademicWorksPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/academic-works" element={<AcademicWorksPage />} />
      </Routes>
    </Router>
  );
}
