const UserRouter = require('./UserRouter')

// nơi chứa router api user
const routers = (app) =>{
    app.use('/api/user',UserRouter)
}
module.exports = routers