import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSignOutButton = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/');
    }).catch((error) => {
      // An error happened.
      navigate('/error');
    });
  }
  return (
    <div className='absolute w-screen px-40 py-1.5 bg-gradient-to-b from-black z-10 flex flex-row justify-between'>
      <img
        className='w-48'
        src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='logo'
      />      
      {user && (
          <div className='flex justify-evenly mt-4'>
            <img
              className='w-[40px] h-[40px]'
              src={user?.photoURL} alt='signed-in-logo' 
            />
            <button onClick={handleSignOutButton} className='ml-4 mt-2 w-[80px] h-[30px] text-white font-bold text-[15px] rounded-md bg-red-600'>Sign Out</button>
          </div>
      )}
    </div>
  )
}
export default Header