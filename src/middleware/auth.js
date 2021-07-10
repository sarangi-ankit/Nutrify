const jwt=require("jsonwebtoken")
const User=require("../model/userSchema")

const auth=async(req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Basic ', '')
        const data = jwt.verify(token, "mynameisankitsarangifullstackdeveloper")

        const user=await User.findOne({
            _id:data._id,
            "tokens.token":token
        })

        if (!user){
            throw new Error("user not found")
        }

        req.token=token
        req.user=user
        req.userID=user._id

        next()

    } catch (error) {
        res.send(error)
        console.log(error)
    }
}
module.exports=auth