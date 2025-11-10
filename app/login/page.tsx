"use client"

import { login, signup } from "./actions";

export default function Page() {
    // const [username, setUsername] = useState("")
    // const [password, setPassword] = useState("")

    // const handleLogin = () => {
    //     console.log("Username:", username);
    //     console.log("Password:", password);
        
    //     if (username === "admin" && password === "1234") {
    //         alert("Login successful!");
    //     } else {
    //         alert("Invalid credentials");
    //     }
    // };

    return (
    <div className="min-h-screen">
        <section className="h-screen flex items-center justify-center bg-stone-950 text-white">
          <section id="login_box" className="border-2 border-white rounded-lg size-[50vh]">
              <h1 className="flex items-center justify-center text-4xl mt-[5%] mb-[10%]">
                  Login
              </h1>
              <form className="mx-[5%]">
                <label htmlFor="email" className="text-2xl">Email:</label>
                <input id="email" name="email" type="email" className="border-2 border-white rounded-lg w-[95%] h-[10%]" required />
                <label htmlFor="password" className="text-2xl">Password:</label>
                <input id="password" name="password" type="password" className="border-2 border-white rounded-lg w-[95%] h-[10%]" required />
                <button formAction={login} className="flex justify-center mt-[10%] border-2 border-white rounded-lg text-2xl px-6 py-2">Log In </button>
                <button formAction={signup} className="flex justify-center mt-[10%] border-2 border-white rounded-lg text-2xl px-6 py-2">Sign Up </button>
              </form>
          </section>
        </section>
    </div>    
  );
}