import React, { useState, useRef } from 'react'
import Header from './Header'
import Hero from './Hero'
import { checkValidDataForSignIn, checkValidDataForSignUp } from '../utils/validate'
import { auth } from '../utils/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { addUser } from '../utils/userSlice'
import { useDispatch } from 'react-redux'
import { Photo_Url } from '../utils/constants'

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, isSetSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const toggleSignInForm = () => {
    isSetSignInForm(!isSignInForm);
  };
  
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    let msg;
    if (!isSignInForm) {
      msg = checkValidDataForSignUp(email.current.value, password.current.value, name.current.value);
    } else {
      msg = checkValidDataForSignIn(email.current.value, password.current.value);
    }
    
    setErrorMessage(msg);
    if (msg) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: Photo_Url
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid, email, displayName, photoURL }));
          }).catch((error) => {
            setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          setErrorMessage(error.code + '-' + error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then(() => {})
        .catch((error) => {
          setErrorMessage(error.code + '-' + error.message);
        });
    }
  }

  return (
    <div className="min-h-screen bg-black bg-opacity-50 text-white">
      <Header />
      <Hero />
      {/* Fixed Login Form */}
      <div className='fixed inset-0 flex items-center justify-center'>
        <div className='flex flex-col bg-black bg-opacity-70 w-[450px] h-[641px] p-6 rounded-lg'>
          <h1 className='text-white text-3xl font-bold mb-6 text-center'>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className='flex flex-col items-center'>
              {!isSignInForm && (
                <input ref={name} type='text' placeholder='Full Name' className='p-2 m-2 w-[314px] h-[56px] bg-gray-800 bg-opacity-20 border border-white border-opacity-35 rounded-md' />
              )}
              <input ref={email} type='text' placeholder='Email or mobile address' className='p-2 m-2 w-[314px] h-[56px] bg-gray-800 bg-opacity-20 border border-white border-opacity-35 rounded-md' />
              <input ref={password} type='password' placeholder='Password' className='p-2 m-2 w-[314px] h-[56px] bg-gray-800 bg-opacity-20 border border-white border-opacity-35 rounded-md' />
            </div>
            <p className='text-red-600 font-bold text-center'>{errorMessage}</p>
            <div className='flex flex-col items-center'>
              <button 
                className='bg-red-600 w-[314px] h-[39px] rounded-md mt-2'
                onClick={handleButtonClick}
              >
                {isSignInForm ? "Sign In" : "Sign Up"}
              </button>
              {isSignInForm && <h5 className='mt-4 text-slate-400'>OR</h5>}
              {isSignInForm && (
                <button className='bg-gray-500 bg-opacity-40 w-[314px] h-[39px] rounded-md mt-4'>
                  Use a sign-in code
                </button>
              )}

              {/* Guest Login Button */}
              {isSignInForm && (
                <button
                  type="button"
                  onClick={() => {
                    email.current.value = "test12@gmail.com";
                    password.current.value = "Test@123";
                  }}
                  className="w-[314px] h-[39px] mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg"
                >
                  Guest Login
                </button>
              )}

              <h5 className='mt-4'>{isSignInForm ? "Forgot password?" : ""}</h5>
              <div className='mt-6'>
                <h5 onClick={toggleSignInForm} className='font-bold cursor-pointer text-center'>
                  {isSignInForm ? "New to Netflix? Sign up now." : "Already a User? Sign in now."}
                </h5>
              </div>
              <h5 className='text-sm text-slate-500 mt-5 text-center'>
                This page is protected by Google reCAPTCHA to ensure you're not a bot.
              </h5>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 

export default Login;
