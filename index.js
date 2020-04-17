var express = require('express')   //OK
var app = express();      //OK
var bodyParser = require('body-parser') //OKE
var userRoute = require('./routes/user.route') // OK, middleware
var authRoute = require('./routes/auth.route')
var cookieParser = require('cookie-parser') 

var port = process.env.PORT || 3000;  //ok

app.set('view engine', 'pug') //ok
app.set('views', './views')  //ok

app.use(bodyParser.json()) // for parsing application/json  /OKE
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded //OKE
app.use(cookieParser())
app.use(express.static('public'))

app.use('/users', userRoute);
app.use('/auth', authRoute)

app.get('/', function(req, res) {
    res.render('index', {
        name: 'AAA'
    });
})    //oke
//COOKIE
app.get('/cookie', function(req, res, next) {
    res.cookie('user-id', 123456);
    res.send('Hello');
})
app.listen(port, function() {
    console.log('Server listening on port' + port);
})

// - EXPRESS: is a fast, unopinionated and minimalist web framework for Node.js, is a "server-side" or "back-end" framework. It is not comparable to client-side frameworks like React, Angular & Vue. It can be used in combination with those frameworks to build full stack apps
// - WHY: Makes building web app with Node.js MUCH easier, Used for both server redered apps as well as API/Microservices, Extremely light, fast, free, Full control of request and response, By far the most pupular Node framework, Great to use with client side framworks as it's all JS

//Template engine: pug(jade), ejs, mustache
//  app.set(name, value): special name: views, view engine, app.set('view engine', 'pug'), app.set('views', './views')

// res.status(403).end() Sets the HTTP status for the response 
// res.status(400).send('Bad Request') Sends the HTTP response. res.send('<p>some html</p>') res.send({ user: 'tobi' }) res.send([1, 2, 3]), res.sendStatus(500) // equivalent to res.status(500).send('Internal Server Error')
// res.status(404).sendFile('/absolute/path/to/404.png')

//res.json(array, object): Sends a JSON response
//res.json(null)  res.status(500).json({ error: 'message' })

//app.get(path..) <==> res.render('index',{...}),app.set('views', './views') <==> res.send 

// app.get(post, put, delete)(path, callback [, callback ...])
// app.set () -> app.get()
 
//app.listen(port, [callback])

//app.use([path,] callback [, callback...]), Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path. MIDDLEWARE, dùng 2 case

// Query parameters: console(req.query) => {q: 'th', age: '10'} /search?q=th&age=10

//params: Route path: /users/:userId/books/:bookId(parseInt)
// Request URL: http://localhost:3000/users/34/books/8989
// req.params: { "userId": "34", "bookId": "8989" }

//req.body(postman) (phải có form name, value ...., ) Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as body-parser and multer.
// $ npm install body-parser, đọc dữ liệu do client gửi lên(POST)
// var bodyParser = require('body-parser') /
// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//res.redirect([status,] path)
//res.redirect('http://google.com')
//Redirects can be relative to the root of the host name. For example, if the application is on http://example.com/admin/post/new, the following would redirect to the URL http://example.com/admin: res.redirect('/admin')
//Redirects can be relative to the current URL. For example, from http://example.com/blog/admin/ (notice the trailing slash), the following would redirect to the URL http://example.com/blog/admin/post/new. res.redirect('post/new')
//Path-relative redirects are also possible. If you were on http://example.com/admin/post/new, the following would redirect to http://example.com/admin/post: res.redirect('..')

//Static folder
// To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express. 
//express.static(root, [options]):This is a built-in middleware function in Express. It serves static files and is based on serve-static.
// For example, use the following code to serve images, CSS files, and JavaScript files in a directory named public:
// app.use(express.static('public')) ->Now, you can load the files that are in the public directory:
// http://localhost:3000/images/kitten.jpg
// http://localhost:3000/css/style.css
// http://localhost:3000/js/app.js
// http://localhost:3000/images/bg.png
// http://localhost:3000/hello.html

//express Router
//Create a router file named birds.js in the app directory, with the following content:
//var router = express.Router()
// middleware that is specific to this router
//router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })
// define the home page route
// router.get('/', function (req, res) {
//   res.send('Birds home page')
// })
// define the about route
// router.get('/about', function (req, res) {
//   res.send('About birds')
// })
// module.exports = router
//App.js
// var birds = require('./birds')
// app.use('/birds', birds)

//MIDDLEWARE:  functions that have access to req/res object. Express has built in middleware but middleware also comes from 3rd party packages as wall as custom middleware.Execute any code, Make changes to the req/res objects, End response cycle, Call next middleware in the stack, VILBO

//MVC: Model thao tác với data, Views(user, auths(auth.login.pug), layouts(common.pug)), Controller(user.controller), Public(images, styles), routes(auth.route, user.route), validates(user.validate)
// Chia thành các routes(trong có các controllers(các phần trong views(.., layouts), module.export.name=function(req, res){})) + index, view chứa các routers public, validates

//Cross-Origin Resource Sharing (CORS): tranh chấp tài nguyên chéo giữa 2 domain khác nhau, vilbo(copy hoặc npm install --save cors)

// const morgan = require('morgan') app.use(morgan('dev'))
// const multer:
// md5, bcrypt, jsonwebtoken
// express-session
//moment, joi, uuid, postman, nodemonjson(ignore...)

//AUTHENTICATION(Bcrypt(md5).hash,genSalt,compareHash)

// AUTHORIZATION(Header: authorization: Barear <token> JWT(header, payload, verify signature).sign,decode,verify)
//session(cookie)Based Authentication vs token based authentication

//MONGOOSE
// Lên copy về, mongoose.connect('mongodb://localhost/db', {..}); let db = mongoose.connection; db.on, db.once
// Create Schema tại 1 folder models: 
// var studentSchema = new mongoose.Schema({..}); let Student = module.export = mongoose.model('Student', studentSchema);     var Student = require('/..') -> Student.find(),findOneAndUpdate()... : document

//TEMPLATE LAYOUT

// - Node actually is a platform which allows us to run JS on a computer/server, read delete and update files, easily communicate with a db, JS Runtime(not a language or a framework), built on the V8 JS engine(same a google chrome) Popular: use JS, very fast(runs on the V8 engine & uses non-blocking code), huge ecosystem of open source packages(npm). great for real-time services(like chats), non-blocking I/O model, same language on the front and back end(JS)
// - JS engines: computers do not understand JS, takes JS, and converts it into something its does understand - machine code -> Node.is is written C++, at the heart of Node is V8 engine, V8 engine converts our JS into machine code  JS ----- Nodejs(C++, V8) ----- Machine code
// -Protocols: a set of communication rules, that two sides agree to use when communicating. Hoạt động của server: client - socker - server, TCP:  <- socket---- packets
// - Best types of projects for node: REST API & Microservices, real time services(chat, live updates), CRUD apps - blogs, shopping cart, social network, tools & utillities




