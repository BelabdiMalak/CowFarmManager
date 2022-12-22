let express = require('express');
let server  = express();


//use express to convert the request body into a JSON object
server.use(express.urlencoded({ extended: true }));


//require the router where we handle requests
const cowRoutes = require('./routes/cowRoutes');


//set up template engines
server.set('view engine', 'ejs');


//use express to load static files (styles, images, fonts)
server.use(express.static('./public/assets'));


//handler for the home page
server.get('/', (req, res) => res.render('home'));
server.get('/home', (req, res) => res.render('home'));


//fire the router functions
server.use('/', cowRoutes);


//for the not-found url
server.use((req, res) => res.status(404).render('404'));


//listen to port 3000
server.listen(3000, 'localhost', () => console.log('the server is listening to port 3000'));

