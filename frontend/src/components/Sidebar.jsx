import { useEffect, useState } from "react"
import API from "../services/api"

export default function Sidebar(){

const [conversations,setConversations] = useState([])

useEffect(()=>{

const fetchConversations = async ()=>{

const res = await API.get("/conversations")

setConversations(res.data)

}

fetchConversations()

},[])

return(

<div className="h-full overflow-y-auto">

<h2 className="p-4 font-bold text-lg border-b">
Chats
</h2>

{conversations.map((c)=>(
<div
key={c._id}
className="p-4 border-b hover:bg-gray-100 cursor-pointer"
>

{c.groupName || c.members[1]?.name}

</div>
))}

</div>

)

}
