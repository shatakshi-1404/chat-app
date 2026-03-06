import { useState } from "react"
import socket from "../services/socket.js";

export default function ChatWindow(){

const [message,setMessage] = useState("")
const [messages,setMessages] = useState([])

const sendMessage = ()=>{

socket.emit("sendMessage",{
text:message
})

setMessages([...messages,{text:message}])

setMessage("")

}

return(

<div className="flex flex-col h-full">

<div className="flex-1 p-4 overflow-y-auto">

{messages.map((m,i)=>(
<div
key={i}
className="bg-green-200 p-2 rounded mb-2 w-fit"
>
{m.text}
</div>
))}

</div>

<div className="flex border-t p-3">

<input
className="flex-1 border p-2 rounded"
value={message}
onChange={(e)=>setMessage(e.target.value)}
placeholder="Type a message"
/>

<button
className="ml-2 bg-green-500 text-white px-4 rounded"
onClick={sendMessage}
>
Send
</button>

</div>

</div>

)

}
