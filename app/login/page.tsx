"use client"

import { login, signup } from "./actions";

export default function Page() {
    return (
    <div className="min-h-screen">
        <section className="h-screen flex items-center justify-center bg-stone-950 text-white">
          <section id="login_box" className="border-2 border-white rounded-lg w-full max-w-96 p-8 flex flex-col">
            <h1 className="text-4xl text-center mb-8">Login</h1>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-xl">Email:</label>
                <input id="email" name="email" className="border-2 border-white rounded-lg p-2 bg-transparent" required />
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="password" className="text-xl">Password:</label>
                <input id="password" name="password" type="password" className="border-2 border-white rounded-lg p-2 bg-transparent" required />
              </div>

              <div className="flex gap-4 mt-4">
                <button formAction={login} className="border-2 border-white rounded-lg px-4 py-2 flex-1">Log In</button>
                <button formAction={signup} className="border-2 border-white rounded-lg px-4 py-2 flex-1">Sign Up</button>
              </div>
            </form>
          </section>
        </section>
    </div>    
  );
};