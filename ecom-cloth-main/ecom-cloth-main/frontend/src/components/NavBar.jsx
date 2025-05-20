import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  return (
    <div className="relative z-50 flex items-center justify-between py-5 px-4 sm:px-8 font-medium bg-white shadow">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>

      {/* Navigation Links (Desktop) */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {['/', '/collection', '/about', '/contact'].map((path, index) => {
          const label = ['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'][index];
          return (
            <li key={path}>
              <NavLink
                to={path}
                className="flex flex-col items-center gap-1 group"
              >
                <p>{label}</p>
                <hr className="w-2/4 border-none h-1.5 bg-gray-700 group-hover:block hidden" />
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-6">
        {/* Search */}
       

        {/* Profile */}
        <div className="relative group">
          <img
            onClick={() => {
              if (!token) navigate('/login');
            }}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="Profile"
          />
          {token && (
            <div className="hidden group-hover:block absolute right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md">
                <p
                  onClick={() => navigate('/profile')}
                  className="cursor-pointer hover:text-black"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('/orders')}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Mobile Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-white transition-all duration-300 ease-in-out z-40 sm:hidden ${
          visible ? 'w-64' : 'w-0'
        } overflow-hidden shadow-lg`}
      >
        <div className="flex flex-col text-gray-600 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 cursor-pointer border-b"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180"
              alt="Close"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
