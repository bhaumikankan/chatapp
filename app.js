const express=require("express")
const app=express()
const http=require("http").createServer(app)
app.use(express.static(__dirname+"/public"))

app.use("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

//socket
const io=require("socket.io")(http)

io.on("connection",(socket)=>{
    console.log("clinet connected")
    socket.on("message",(msg)=>{
         socket.broadcast.emit("message",msg)
    })
})

http.listen(process.env.PORT|| 3000,()=>{
    console.log("server is running on port 3000")
})
