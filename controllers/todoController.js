var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database we created in mlab
mongoose.connect('mongodb://test:test@ds113445.mlab.com:13445/todo');

//Create a schema. This is like a blueprint
//What kind of information its gonna expect
var todoSchema = new mongoose.Schema({
	item:String
});

//Create a model
var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item:'buy flowers'}).save(function(err){
// 	if(err) throw err;
// 	console.log('item saved');
// });---- we don't want a new item creating and adding to the database

//var data = [{item: 'walk dog'}, {item: 'learn coding'}];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

//we are exporting function(app) so that we can fire it in app.js
//once it is fired, app is available in here
module.exports = function(app){
	
	app.get('/todo', function(req,res){
	//get data from mongodb and pass it to view
		Todo.find({}, function(err, data){
			if(err) throw err;
			res.render('todo', {todo: data});
		});
		//get data from mongodb and pass it to view
	});

	app.post('/todo', urlencodedParser, function(req,res){
		//get data from the view and add it to mongodb
		var newTodo = Todo(req.body).save(function(err,data){
			if(err) throw err;
			res.json(data);
		})
		//data.push(req.body);
		// console.log(data);
		
	});

	app.delete('/todo/:item', function(req,res){
		//delete the requested item from mongodb
		Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
			if(err) throw err;
			res.json(data);
		});
		// data = data.filter(function(todo){
		// 	return todo.item.replace(/ /g, '-') !==req.params.item;
		// });
		// res.json(data);
	});

};