import React from 'react'
import { LuWallet, LuTrendingUp, LuShieldCheck, LuZap } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className='flex min-h-screen bg-[#0b0f1a] font-sans text-slate-200 overflow-hidden relative'>
      {/* Animated Background Orbs */}
      <div className='absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse' />
      <div className='absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] animate-pulse' style={{ animationDelay: '2s' }} />

      {/* Left Side: Form */}
      <div className='w-full lg:w-[45%] flex flex-col px-8 md:px-20 py-12 relative z-10 bg-[#0b0f1a]/50 backdrop-blur-sm border-r border-white/5'>
        <div className="flex items-center gap-3 mb-16 group cursor-pointer">
          <div className="bg-gradient-to-br from-primary to-primary-dark p-3 rounded-[1.25rem] shadow-2xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
            <LuWallet className="text-white text-3xl" />
          </div>
          <h1 className='text-3xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent tracking-tighter font-display'>
            Nexus<span className="text-primary-light">Pay</span>
          </h1>
        </div>
        
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          {children}
        </div>

        <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between">
          <p className="text-slate-500 text-sm font-semibold tracking-wide">
            &copy; 2026 NEXUS CORP
          </p>
          <div className="flex gap-4">
            <LuShieldCheck className="text-slate-600 hover:text-primary transition-colors cursor-help" size={20} />
            <LuZap className="text-slate-600 hover:text-accent transition-colors cursor-help" size={20} />
          </div>
        </div>
      </div>

      {/* Right Side: Visual Masterpiece */}
      <div className='hidden lg:flex lg:w-[55%] relative items-center justify-center p-20 overflow-hidden bg-[url("https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop")] bg-cover bg-center'>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f1a]/95 via-[#0b0f1a]/80 to-transparent z-0" />
        
        <div className='relative z-10 w-full max-w-2xl'>
          <div className='glass-card p-12 relative overflow-hidden group hover:border-primary/30 transition-all duration-700'>
            {/* Decorative Grid */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
            
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-all duration-700" />
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-xs font-bold uppercase tracking-widest mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Next-Gen Finance
            </div>

            <h2 className='text-6xl font-black text-white leading-[1.1] font-display tracking-tight'>
              The future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-accent to-primary-light bg-[length:200%_auto] animate-gradient">Wealth Management</span>
            </h2>
            
            <p className='text-slate-400 text-xl mt-8 leading-relaxed font-medium'>
              Experience the most advanced financial ecosystem. Secure, lightning-fast, and designed for the elite.
            </p>
            
            <div className='mt-12 grid grid-cols-2 gap-6'>
              <StatsCard 
                icon={<LuTrendingUp className="text-emerald-400" />} 
                label="Growth Efficiency"
                value="+42.8%"
              />
              <StatsCard 
                icon={<LuZap className="text-amber-400" />} 
                label="Processing Speed"
                value="< 2ms"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout

const StatsCard = ({ icon, label, value }) => (
  <div className='bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-300'>
    <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl mb-4">
      {icon}
    </div>
    <p className='text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1'>{label}</p>
    <p className='text-2xl font-bold text-white'>{value}</p>
  </div>
)

