import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { token, navigate, setToken, setCartItems, backendUrl } = useContext(ShopContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setUser(res.data.user);
        } else {
          toast.error(res.data.message || 'Failed to fetch user profile.');
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || 'Error fetching profile.');
      }
    };

    if (token) {
      fetchProfile();
    } else {
      navigate('/login');
    }
  }, [token, navigate, backendUrl]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-10 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

      {user ? (
        <div className="space-y-4">
          <div>
            <p className="text-gray-700">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => navigate('/orders')}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              View Orders
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
