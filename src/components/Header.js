import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login');
  }

  return (
    <div className='absolute w-full px-40 py-1.5 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img
        className='w-48'
        src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='logo'
      />
      <div className='flex flex-row'>
        <div className="mt-5 mr-4">
          <select
            id="options"
            name="options"
            className="w-[120px] h-[30px] p-3 text-gray-700 bg-gray-950 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
        <button 
          className='bg-red-600 w-[76.9px] h-[30px] mt-5 text-white font-semibold rounded-md'
          onClick={handleSignInClick}
        >Sign In</button>  
      </div>
    </div>
  )
}
export default Header