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
    // validate the form data
    let msg;
    if (!isSignInForm) {
      // When it's a sign-up form, include the name in the validation
      msg = checkValidDataForSignUp(email.current.value, password.current.value, name.current.value);
    } else {
      // When it's a sign-in form, no need to include the name
      msg = checkValidDataForSignIn(email.current.value, password.current.value);
    }
    
    setErrorMessage(msg);

    if(msg) return;

    if(!isSignInForm){
        //sign up 
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: Photo_Url
          }).then(() => {
            // Profile updated!
            const {uid, email, displayName, photoURL}  = auth.currentUser;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    }
    else{
        //sign in logic
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    
    }
  }
  return (
    <div>
      <Header />
      <Hero />
      <div className='absolute inset-0 overflow-hidden flex flex-col items-center justify-center bg-black bg-opacity-50 text-white'>
        <div className='mt-24 flex flex-col bg-black bg-opacity-70 w-[450px] h-[641px]'>
          <h1 className='text-white text-3xl font-bold mb-6 mt-12 ml-16'>{isSignInForm? "SignIn" : "SignUp" }</h1>
          <form onSubmit={(e) => e.preventDefault()}>
              <div className='flex flex-col ml-14'>
                {!isSignInForm? 
                  <input ref={name} type='text' placeholder='Full Name' className='p-2 m-2 w-[314px] h-[56px] bg-gray-800 bg-opacity-20 border border-white border-opacity-35 rounded-md' /> : "" 
                }
                <input ref={email} type='text' placeholder='Email or mobile address' className='p-2 m-2 w-[314px] h-[56px] bg-gray-800 bg-opacity-20 border border-white border-opacity-35 rounded-md' />
                <input ref={password}  type='password' placeholder='Password' className='p-2 m-2 w-[314px] h-[56px] bg-gray-800 bg-opacity-20 border border-white border-opacity-35 rounded-md' />
              </div>
              <p className='ml-16 text-red-600 font-bold'>{errorMessage}</p>
                <div className='flex flex-col justify-center items-center'>
                  <button 
                    className='bg-red-600 w-[314px] h-[39px] mr-2 rounded-md mt-2'
                    onClick={handleButtonClick}>
                    {isSignInForm? 
                      "Sign In" : "Sign Up"
                    }
                  </button>
                  {isSignInForm? 
                    <h5 className='mt-4 text-slate-400'>OR</h5>: ""
                  }
                  {isSignInForm? 
                    <button className='bg-gray-500 bg-opacity-40 w-[314px] h-[39px] mr-2 rounded-md mt-4'>Use a sign-in code</button> : ""
                  } 
                  <h5 className='mt-4'>
                    {isSignInForm? "Forgot password?" : ""}
                  </h5>
                  
                  <div className='flex flex-row mt-8'>
                    <h5
                      onClick ={toggleSignInForm} 
                      className='font-bold -ml-28 mt-3 cursor-pointer'>
                      {isSignInForm?
                        "New to Netflix? Sign up now." : "Already a User? Sign in now."
                      }
                    </h5>
                  </div>
                  <h5 className='text-sm text-slate-500 mt-5 -ml-12'>This page is protected by Google reCAPTCHA 
                  </h5>
                  <h5 className='text-sm text-slate-500 mr-40'>to ensure you're not a bot.</h5>
                </div>
          </form>
        </div>
      </div>
    </div>
  )
} 

export default Login;
