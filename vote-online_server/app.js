const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const path = require('path')

const {scheduleCronstyle}= require('./utils/schedule') //定时任务

const login = require('./route/login')
const register = require('./route/register')
const userManagement = require('./route/userManagement')
const voteManagement = require('./route/voteManagement')
const userVote = require('./route/userVote')
const personalInfo = require('./route/personalInfo')
const app = express()

//配置跨域
app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.get('origin'))
    res.header("Access-Control-Allow-Credentials", "true")
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    next()
})
//配置session
app.use(session({
    secret: 'secret key',
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000
    },
    resave: false,//是否重复保存session
    saveUninitialized: false
}));
//解析post请求参数
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//解析cookie
app.use(cookieParser())
//配置静态资源访问路径1
app.use(express.static(path.join(__dirname, 'public')))


//一级路由
app.use('/login', login)
app.use('/register', register)
app.use('/userManagement', userManagement)
app.use('/voteManagement', voteManagement)
app.use('/userVote',userVote)
app.use('/personalInfo',personalInfo)

//定时任务
scheduleCronstyle()

const server = app.listen(4200, function () {
    const {address, port} = server.address();
    console.log((`HTTP服务已启动,ip:${address},端口号:${port}`));;
    global.baseURL = `http://localhost:${port}`
})

// 数据库005
// 失败001
// 成功000