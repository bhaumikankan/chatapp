const socket=io()
let name;
const textarea=document.querySelector("#msg")
const chatfild=document.querySelector("#chat-fild")
do{
    name=prompt("please enter your name")
}
while(!name);
document.querySelector("button").addEventListener("click",()=>{
    
      sendmessage(textarea.value)
      textarea.value=""
    
})

function sendmessage(msg){
    let mesg={
        user:name,
        message:msg
    }
    //append
    appendmessage(mesg,"outgoing")

    //send to server
    socket.emit("message",mesg)
}

function appendmessage(msg,type){
    if(type=="outgoing")
    {
        
        let HTML=`
        <div
              class="m-4 ml-auto p-4"
              id="outgoing"
              style="border: 1px solid blue; border-radius: 25px; width: 300px"
            >
              <span style="border-radius: 25px"
                ><h3>${msg.user}</h3>
                ${msg.message}</span
              >
            </div>
        `
        chatfild.insertAdjacentHTML("beforeend",HTML)
    }
}

//get the msg
socket.on("message",(msg)=>{
    console.log(msg)
   let HTML=`
   <div
              class="m-4 p-4"
              id="incomeing"
              style="border: 1px solid blue; border-radius: 25px; width: 300px"
            >
              <span style="border-radius: 25px" class="">
                <h3>${msg.user}</h3>
                ${msg.message}</span
              >
            </div>
   `
   chatfild.insertAdjacentHTML("beforeend",HTML)
})