// require express
var express = require("express");
var path = require("path");
var app = express();
app.use(express.static(path.join(__dirname,'./static')));
app.set('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');
app.get('/',function(rq,rs){
    
	rs.render("index");
})
app.post('/process',function(rq,rs){
	var check = rq.body;

	rs.redirect('/');
})
var server = app.listen(8000,function(){
	console.log('localhost:8000')
})

var io = require('socket.io').listen(server);
io.sockets.on('connection',function(socket){

	console.log("We are using sockets");
	console.log(socket.id);
	socket.on("button_clicked", function (data){
    	socket.emit('random_number', data);
        console.log(data);
})

})
