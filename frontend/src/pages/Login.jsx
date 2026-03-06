import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import useAuthStore from "../store/useAuthStore";

export default function Login() {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const login=useAuthStore((state)=>state.login)

  const navigate = useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()

    try{

      const res = await API.post("/auth/login",{email,password})

      login(res.data.token)

      navigate("/chat") // ⭐ redirect to chat page

    }catch(error){
      alert("Login failed")
      console.log(error.response.data)
    }
  }

  return (

<div className="flex items-center justify-center h-screen bg-gray-100">

<form
onSubmit={handleSubmit}
className="bg-white p-8 rounded shadow w-80"
>

<h2 className="text-2xl mb-4">Login</h2>

<input
className="border w-full mb-3 p-2"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
className="border w-full mb-3 p-2"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="bg-green-500 text-white w-full p-2"
>
Login
</button>

</form>

</div>

  )
}
