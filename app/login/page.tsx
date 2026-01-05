"use client"

import { login, signup } from "./actions";

export default function Page() {
    return (
    <div className="min-h-screen">
        <section className="min-h-screen flex items-center justify-center bg-stone-950 text-white px-4">
          <div id="login_box" className="w-full max-w-md p-8 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            <h1 className="text-3xl md:text-4xl text-center mb-6 font-semibold">Login</h1>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-lg mb-1">Email:</label>
                <input id="email" name="email" className="border border-white/20 rounded-md p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-400" required />
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="password" className="text-lg mb-1">Password:</label>
                <input id="password" name="password" type="password" className="border border-white/20 rounded-md p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-400" required />
              </div>

              <div className="flex gap-4 mt-4">
                <button formAction={login} className="bg-white text-black rounded-md px-4 py-2 flex-1 hover:opacity-95 transition">Log In</button>
                <button formAction={signup} className="border border-white/20 rounded-md px-4 py-2 flex-1 hover:bg-white/5 transition">Sign Up</button>
              </div>
            </form>
          </div>
        </section>
    </div>    
  );
};