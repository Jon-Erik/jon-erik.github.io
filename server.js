var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var PORT = process.env.PORT || 3000;
var app = express();
var credentials = require("./mailgun-credentials/mailgun-credentials.js")

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));
app.use(express.static("."));

var mailgun = require('mailgun-js')({apiKey: credentials.api_key, domain: credentials.domain});

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/public/index.html"));
})

app.post("/newmessage", function(req, res) {
	var newMessage = req.body;
	//console.log(newMessage);

	var data = {
		from: "" + newMessage.name + " <" + newMessage.email + ">",
		to: 'symphonyconcertante@gmail.com',
		subject: 'Portfolio website email from ' + newMessage.name,
		text: "Name of contact: " + newMessage.name +
		"\n\nEmail address of contact: " + newMessage.email + 
		"\n\nMessage: " + newMessage.message + 
		"\n\nREMEMBER TO RESPOND WITH jonerik.chandler@gmail.com ACCOUNT"
	};

	mailgun.messages().send(data, function (error, body) {
		console.log(body);
		if (!error) {
			res.status(200).send("Mail submitted");
		} else {
			console.log(error);
			res.status(200).send("Mail could not submit");
		}
	});
})

app.listen(PORT, function() {
	console.log("Server listening on: http://localhost:" + PORT);
});