export default function MessageBubble({message,isOwn}){

return(

<div className={`flex ${isOwn?"justify-end":"justify-start"} mb-2`}>

<div
className={`p-2 rounded-lg max-w-xs ${
isOwn?"bg-green-500 text-white":"bg-gray-200"
}`}
>

{message.content}

</div>

</div>

)
}
