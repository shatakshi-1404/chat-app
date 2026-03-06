import Sidebar from "../components/Sidebar"
import ChatWindow from "../components/ChatWindow"

export default function Chat(){

return(

<div className="flex h-screen bg-gray-100">

<div className="w-1/3 border-r bg-white">
<Sidebar/>
</div>

<div className="flex-1">
<ChatWindow/>
</div>

</div>

)
}
