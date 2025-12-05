import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <section className="max-w-screen-xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <h2 className="text-2xl font-bold text-blue-600">
          GoodTrip
        </h2>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">

          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600"
                  : "hover:text-blue-600"
              }
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/trips"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600"
                  : "hover:text-blue-600"
              }
            >
              Trip
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600"
                  : "hover:text-blue-600"
              }
            >
              Explore
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/outfit"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600"
                  : "hover:text-blue-600"
              }
            >
              Outfit
            </NavLink>
          </li>
        </ul>

        {/* Login Button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Login
        </button>
      </section>
    </nav>
  );
}
