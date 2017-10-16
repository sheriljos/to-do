var express = require('express');
var todoController = require('./controllers/todoController');
							//path to the controller

//Set up the express app by firing express()
var app = express();

//Set up template engine
app.set('view engine', 'ejs');

//use static files
//set up middleware to do that
// app.use('/assets',express.static('./public'));---->Take away the route
app.use(express.static('./Public'));	

//fire controllers, by passing the parameter 'app'
todoController(app);
//now app is available in controller


//listen to a port
app.listen(process.env.PORT || 3000, function(){
console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});



