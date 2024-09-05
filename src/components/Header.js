import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice';
import { Logo_Url } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/langSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearchView)

  const handleSignOutButton = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/')
    }).catch((error) => {
      // An error happened.
      navigate('/error')
    });
  }

  const handleGptSearchButton = () => {
    dispatch(toggleGptSearchView(true));
  }

  const handleChangeOfLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user){
        // User is signed in
        const {uid, email, displayName, photoURL}  = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
        navigate('/browse');
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate('/');
      }
    });    
    //unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);


  return (
    <div className='absolute w-screen px-40 py-1.5 bg-gradient-to-b from-black z-10 flex flex-row justify-between'>
      <img
        className='w-48'
        src={Logo_Url} alt='logo'
      />      
      {user && (
          <div className='flex justify-evenly mt-4'>
            {showGptSearch?
              <select
                onChange={handleChangeOfLanguage}
                className='mt-1 px-3 bg-black h-[30px] w-[110px] bg-opacity-70 border border-white rounded-lg text-white'
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Japanese</option>
                <option>French</option>
                <option>Italian</option>
              </select> 
                  :
              <></>
            }
            <button 
              onClick={handleGptSearchButton}
              className='ml-4 mr-3 mt-0.5 w-[100px] h-[35px] text-white font-bold text-[15px] rounded-md bg-purple-800 hover:bg-opacity-80'
            >
            {showGptSearch? "Homepage" : "Gpt Search"}
            </button>
            <img
              className='w-[40px] h-[40px]'
              src={user?.photoURL} alt='signed-in-logo' 
            />
            <button onClick={handleSignOutButton} className='ml-4 mt-1 w-[80px] h-[30px] text-white font-bold text-[15px] rounded-md bg-red-600 hover:bg-opacity-80'>Sign Out</button>
          </div>
      )}
    </div>
  )
}
export default Header