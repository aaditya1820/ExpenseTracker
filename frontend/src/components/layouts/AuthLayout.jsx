import React from 'react'
import { LuWallet, LuTrendingUp } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className='flex min-h-screen bg-white font-sans'>
      {/* Left Side: Form */}
      <div className='w-full lg:w-[45%] flex flex-col px-6 md:px-16 py-12'>
        <div className="flex items-center gap-2.5 mb-16">
          <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/20">
            <LuWallet className="text-white text-2xl" />
          </div>
          <h1 className='text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight font-display'>
            Expensy
          </h1>
        </div>
        
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          {children}
        </div>

        <div className="mt-auto pt-8 border-t border-slate-100">
          <p className="text-slate-400 text-sm font-medium">
            &copy; 2026 Expensy Inc. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side: Visual */}
      <div className='hidden lg:flex lg:w-[55%] bg-slate-50 relative overflow-hidden items-center justify-center p-12'>
        {/* Animated Background Elements */}
        <div className='absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '2s' }} />
        
        <div className='relative z-10 w-full max-w-xl'>
          <div className='card glass-effect border-white/40 p-10 relative overflow-hidden group'>
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <LuWallet size={120} className="text-primary rotate-12" />
            </div>
            
            <h2 className='text-4xl font-bold text-slate-900 leading-tight font-display'>
              Take control of your <span className="text-primary">finances</span> effortlessly.
            </h2>
            <p className='text-slate-600 text-lg mt-6 leading-relaxed'>
              Join thousands of users who track their expenses and save more every month with our intuitive platform.
            </p>
            
            <div className='mt-10 space-y-4'>
              <StatsInfoCard 
                icon={<LuTrendingUp className="text-emerald-600" />} 
                label="Average user savings"
                value="₹12,450"
                sublabel="per month"
              />
            </div>
          </div>
          
          {/* Decorative floating card */}
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-2xl -z-10" />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout

const StatsInfoCard = ({ icon, label, value, sublabel }) => {
  return (
    <div className='flex items-center gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/60 shadow-xl shadow-slate-200/50 transform transition-all hover:scale-[1.02] duration-300'>
      <div className={`w-12 h-12 flex items-center justify-center text-2xl bg-white rounded-xl shadow-sm`}>
        {icon}
      </div>
      <div>
        <p className='text-xs font-bold text-slate-400 uppercase tracking-wider'>{label}</p>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className='text-xl font-bold text-slate-900'>{value}</span>
          <span className="text-xs font-semibold text-emerald-500">{sublabel}</span>
        </div>
      </div>
    </div>
  )
}
