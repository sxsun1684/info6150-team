import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home";
export default function App() {
    return (
       <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/*<Route path="/trip" element={<Flights />} />*/}
        {/*<Route path="/weather" element={<Weather />} />*/}
        {/*<Route path="/outfit" element={<Outfit />} />*/}
      </Routes>
    </Router>
    );
}
