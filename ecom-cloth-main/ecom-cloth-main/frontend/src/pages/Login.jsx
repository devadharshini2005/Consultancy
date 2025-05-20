import React, { useState } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState]= useState('Sign Up');
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try{
      if(currentState === 'Sign Up'){
        const response = await axios.post(backendUrl + '/api/user/register', {name, email, password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
      else{
        const response = await axios.post(backendUrl + '/api/user/login', {email, password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
    }
    catch (error){
      console.log(error);
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  })
 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">{currentState}</h1>
        <div className="w-12 h-1 bg-gray-800 mx-auto rounded"></div>
      </div>

      <form onSubmit={onSubmitHandler} className="space-y-5">
        {currentState === 'Login' ? null : (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
        />

        <div className="flex justify-between text-sm text-gray-600">
          
          {currentState === 'Login' ? (
            <p
              onClick={() => setCurrentState('Sign Up')}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              Create account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState('Login')}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              Login Here
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition"
        >
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  </div>
);

}

export default Login;
