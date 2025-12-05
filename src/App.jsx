import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home";
import TripPage from "./pages/TripPage.jsx";
import ExplorePage from "./pages/ExplorePage";

export default function App() {
    return (
       <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trips" element={<TripPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        {/*<Route path="/outfit" element={<Outfit />} />*/}
      </Routes>
    </Router>
    );
}
