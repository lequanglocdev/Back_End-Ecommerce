const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleWare = (req,res) =>{
    jwt.verify(token,'shhh',function(err,user){
        if(err){
            return res.this.status(404).json({
                message:'The authentication',
                status:'ERROR'
            })
        }
        const {payload} = user
        if(payload?.isAdmin){
            next()
        }else{
            return res.status(404).json({
                message:'The authentication',
                status:'ERROR'
            })
        }
    })

}


module.exports ={
    authMiddleWare
}