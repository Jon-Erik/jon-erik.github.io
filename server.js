var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var PORT = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));
app.use(express.static("."));

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/public/index.html"));
})

app.listen(PORT, function() {
	console.log("Server listening on: http://localhost:" + PORT);
});