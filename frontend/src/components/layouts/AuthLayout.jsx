import React from 'react'
import { LuSprout } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className='flex min-h-screen bg-[#0a0a0a] font-sans text-neutral-200 overflow-hidden'>
      {/* Left Side: Form */}
      <div className='w-full lg:w-[45%] flex flex-col px-8 md:px-20 py-12 bg-[#0a0a0a] border-r border-neutral-900'>
        <div className="flex items-center gap-3 mb-16">
          <div className="bg-primary p-2.5 rounded-xl">
            <LuSprout className="text-black text-2xl" />
          </div>
          <h1 className='text-2xl font-bold text-white tracking-tight font-display'>
            Cash<span className="text-primary">Sprout</span>
          </h1>
        </div>
        
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          {children}
        </div>

        <div className="mt-auto pt-8 border-t border-neutral-900">
          <p className="text-neutral-600 text-xs font-medium tracking-wider uppercase">
            &copy; 2026 CashSprout Systems
          </p>
        </div>
      </div>

      {/* Right Side: Minimal & Proper */}
      <div className='hidden lg:flex lg:w-[55%] bg-neutral-900/50 items-center justify-center p-20'>
        <div className='max-w-md'>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
            Refined Finance
          </div>
          <h2 className='text-5xl font-bold text-white leading-tight font-display'>
            Simple tracking. <br />
            <span className="text-neutral-500 text-4xl">Proper growth.</span>
          </h2>
          <p className='text-neutral-500 text-lg mt-6 leading-relaxed'>
            A minimal approach to financial management. No distractions, just your data organized perfectly.
          </p>
          
          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-neutral-800 pt-12">
            <div>
              <p className="text-white text-2xl font-bold">100%</p>
              <p className="text-neutral-600 text-sm font-medium mt-1">Data Sovereignty</p>
            </div>
            <div>
              <p className="text-white text-2xl font-bold">0</p>
              <p className="text-neutral-600 text-sm font-medium mt-1">Unnecessary Clutter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout


