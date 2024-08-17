import React, { useState } from 'react'
import Header from './Header'
import Hero from './Hero'
const Login = () => {
  const [isSignInForm, isSetSignInForm] = useState(true);

  const toggleSignInForm = () => {
    isSetSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <Hero />
      <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white'>
        <div className='mt-24 flex flex-col bg-black bg-opacity-70 w-[450px] h-[641px]'>
          <h1 className='text-white text-3xl font-bold mb-6 mt-12 ml-16'>{isSignInForm? "SignIn" : "SignUp" }</h1>
          <form>
              <div className='flex flex-col ml-14'>
                {!isSignInForm? 
                  <input type='text' placeholder='Full Name' className='p-2 m-2 w-[314px] h-[56px] bg-gray-800 bg-opacity-20 border border-white border-opacity-35 rounded-md' /> : ""
                }
                <input type='text' placeholder='Email or mobile address' className='p-2 m-2 w-[314px] h-[56px] bg-gray-800 bg-opacity-20 border border-white border-opacity-35 rounded-md' />
                <input type='text' placeholder='Password' className='p-2 m-2 w-[314px] h-[56px] bg-gray-800 bg-opacity-20 border border-white border-opacity-35 rounded-md' />
              </div>
                <div className='flex flex-col justify-center items-center'>
                  <button className='bg-red-600 w-[314px] h-[39px] mr-2 rounded-md mt-2'>
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

export default Login