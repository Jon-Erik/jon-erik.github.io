var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var request = require("request");

var PORT = process.env.PORT || 3000;
var app = express();

var credentials = require("./mailgun-credentials/mailgun-credentials.js")
var reCAPTCHAcredentials = require("./reCAPTCHA-credentials.js");
var secret_key = reCAPTCHAcredentials.secret_key;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));
app.use(express.static("."));

var mailgun = require('mailgun-js')({apiKey: credentials.api_key, domain: credentials.domain});

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/public/index.html"));
})

app.post("/newmessage", function(req, res) {
	var newMessage = req.body;

	var data = {
		from: "" + newMessage.name + " <" + newMessage.email + ">",
		to: 'symphonyconcertante@gmail.com',
		subject: 'Portfolio website email from ' + newMessage.name,
		text: "Name of contact: " + newMessage.name +
		"\n\nEmail address of contact: " + newMessage.email + 
		"\n\nMessage: " + newMessage.message + 
		"\n\nREMEMBER TO RESPOND WITH jonerik.chandler@gmail.com ACCOUNT"
	};

	if (req.body.captcha === undefined ||
		req.body.captcha === "" ||
		req.body.captcha === null
	 ) {
		return res.json({"success": false, "msg": "Please select CAPTCHA"})
	}

	var verifyURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + 
		secret_key + "&response=" + req.body.captcha + "&remoteip=" + 
		req.connection.remoteAddress;

	request(verifyURL , function(err, response, body) {
		body = JSON.parse(body);
		if (body.success !== undefined && !body.success) {
			return res.json({"success": false, "msg": "Failed CAPTCHA verification"})
		}
			mailgun.messages().send(data, function (error, body) {
			console.log(body);
			if (!error) {
				res.status(200).send("Captcha passed and email submitted");
			} else {
				console.log(error);
				res.send("Captcha passsed but mail could not submit");
			}
		});
	})
});

app.listen(PORT, function() {
	console.log("Server listening on: http://localhost:" + PORT);
});