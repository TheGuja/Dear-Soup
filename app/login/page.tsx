// "use client"

// import { useState } from "react";

// export default function Page() {
//     const [username, setUsername] = useState("")
//     const [password, setPassword] = useState("")

//     const handleLogin = () => {
//         console.log("Username:", username);
//         console.log("Password:", password);
        
//         if (username === "admin" && password === "1234") {
//             alert("Login successful!");
//         } else {
//             alert("Invalid credentials");
//         }
//     };

//     return (
//     <div className="min-h-screen">
//         <section className="h-screen flex items-center justify-center bg-stone-950 text-white">
//         <section id="login_box" className="border-2 border-white rounded-lg size-[50vh]">
//             <h1 className="flex items-center justify-center text-4xl mt-[5%] mb-[10%]">
//                 Login
//             </h1>
//             <div id="username_field" className="mx-[5%] mb-[10%]">
//                 <h1 className="text-2xl">
//                     Username
//                 </h1>
//             <input type='text' value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} className="border-2 border-white rounded-lg w-[95%] h-[10%]"/>
//             </div>
//             <div id="password_field" className="mx-[5%]">
//                 <h1 className="text-2xl">
//                     Password
//                 </h1>
//                 <input type='password' value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} className="border-2 border-white rounded-lg w-[95%] h-[10%]"/>
//             </div>
//             <div className="flex justify-center mt-[10%]">
//                 <button onClick={handleLogin} className="border-2 border-white rounded-lg text-2xl px-6 py-2">
//                     Login
//                 </button>
//             </div>
//         </section>
//         </section>
//     </div>    
//   );
// }
import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  )
}