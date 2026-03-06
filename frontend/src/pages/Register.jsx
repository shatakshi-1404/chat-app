import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function Register() {

  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const login = useAuthStore((state)=>state.login)

  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()

    const res = await API.post("/auth/register",{
      name,
      email,
      password
    })

    login(res.data.token)

    navigate("/chat")
  }

  return (

<div className="flex items-center justify-center h-screen bg-gray-100">

<form
onSubmit={handleSubmit}
className="bg-white p-8 rounded shadow w-80"
>

<h2 className="text-2xl mb-4">Register</h2>

<input
className="border w-full mb-3 p-2"
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

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
className="bg-blue-500 text-white w-full p-2"
>
Register
</button>

</form>

</div>
  )
}
