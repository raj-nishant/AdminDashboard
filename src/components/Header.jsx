import React, { useState, useEffect, useRef } from "react";
import dropdown from "../assets/dropdown.svg";
import { getUserDetails, deleteUserAccount } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "../services/Authcontext";

function Header() {
  const [userDetails, setUserDetails] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user, logout } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          const userData = await getUserDetails(userId, user.hashed_password);
          setUserDetails(userData);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
    fetchData();
  }, [userId, user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="top-0 flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="text-white ml-4 focus:outline-none"
        >
          {userDetails && <span className="font-bold">{userDetails.name}</span>}
          <img className="h-7" src={dropdown} alt="" />
        </button>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="right-0 mt-2 bg-white rounded-md shadow-lg z-10"
          >
            <div className="py-1">
              {userDetails && (
                <div className="px-4 py-2">
                  <p className="text-gray-700">{userDetails.name}</p>
                  <p className="text-gray-700">{userDetails.email}</p>
                </div>
              )}

              <Link to={`/profile/${userId}`}>
                <button className="block w-full bg-red-600 text-left px-4 py-2 text-sm border-black border-2 text-white hover:bg-gray-500 hover:text-black">
                  Manage Profile
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full bg-red-600 text-left px-4 py-2 text-sm border-black border-2 text-white hover:bg-gray-500 hover:text-black"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
