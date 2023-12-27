const  User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")
const createUser = (newUser) =>{
    return new Promise(async(resolve,reject) =>{
      const {name , email , password , confirmPassword, phone} = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser !== null){
                resolve({
                    status: 'OK',
                    message: " The email is all already"
                })
            }
            const hashPassword = bcrypt.hashSync(password, 10)
           const createdUser  = await User.create({
            name,
            email,
            password: hashPassword,
            phone
           })
           if(createdUser){
            resolve({
                status: "OK",
                message: "SUCCESS",
                data:createdUser
            })
           }
        } 
        catch (error) {
            reject(error)
        }
    })
}
const loginUser = (userLogin) =>{
    return new Promise(async(resolve,reject) =>{
      const {name , email , password , confirmPassword, phone} = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            // email ko to
            if(checkUser === null){
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password or user is incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })
        } 
        catch (error) {
            reject(error)
        }
    })
}

const updateUser = (id,data) =>{
    return new Promise(async(resolve,reject) =>{
    
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            console.log('checkUser',checkUser)
            if(checkUser === null){
                resolve({
                    status:'OK',
                    message:'The user is not define'
                })
            }
            // email ko to
            // if(checkUser === null){
            //     resolve({
            //         status: 'ERR',
            //         message: 'The user is not defined'
            //     })
            // }
            // const comparePassword = bcrypt.compareSync(password, checkUser.password)

            // if (!comparePassword) {
            //     resolve({
            //         status: 'ERR',
            //         message: 'The password or user is incorrect'
            //     })
            // }
            // const access_token = await genneralAccessToken({
            //     id: checkUser.id,
            //     isAdmin: checkUser.isAdmin
            // })

            // const refresh_token = await genneralRefreshToken({
            //     id: checkUser.id,
            //     isAdmin: checkUser.isAdmin
            // })
            const updateUser  = await User.findByIdAndUpdate(id,data,{new: true})
            console.log("updateUser",updateUser)
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data:updateUser
               
            })
        } 
        catch (error) {
            reject(error)
        }
    })
}
const deleteUser = (id) =>{
    return new Promise(async(resolve,reject) =>{
    
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            console.log('checkUser',checkUser)
            if(checkUser === null){
                resolve({
                    status:'OK',
                    message:'The user is not define'
                })
            }
        
           await User.findByIdAndDelete(id)
         
            resolve({
                status: 'OK',
                message: 'Delete User Success ',
               
            })
        } 
        catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser
}