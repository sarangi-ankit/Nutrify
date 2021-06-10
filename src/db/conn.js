const mongoose=require("mongoose")
const DB="mongodb+srv://ankitsarangi21:ankit123@cluster0.kunws.mongodb.net/nutrify?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{
    console.log("connection is successful")
}).catch((err)=>{
    console.log("not successful")
})