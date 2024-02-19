import { useState, useEffect } from "react";
import { deleteUserAccount, getUserDetails } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "../services/Authcontext";

const ManageProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
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

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount(userId, user.hashed_password);
      alert("Your Account has been deleted");
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const copyReferralLink = () => {
    const referralLink = `http://localhost:5173/register?referral=${userDetails.referral_code}`;
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Manage Your Profile
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Your Details
          </h2>
          {userDetails && (
            <div className="border border-gray-300 rounded-md p-4">
              <p className="text-gray-700">
                <span className="font-semibold">Name:</span> {userDetails.name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span>{" "}
                {userDetails.email}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Referral Code:</span>{" "}
                {userDetails.referral_code}
              </p>
            </div>
          )}
        </div>

        <div className="mb-4">
          <button
            onClick={handleLogout}
            className="block w-full bg-red-600 text-white px-4 py-2 text-sm rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
          >
            Logout
          </button>
        </div>
        <div className="mb-4">
          <button
            onClick={handleDeleteAccount}
            className="block w-full bg-red-600 text-white px-4 py-2 text-sm rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
          >
            Delete Account
          </button>
        </div>
        <div>
          <button
            onClick={copyReferralLink}
            className="block w-full bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Copy Referral Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
