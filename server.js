var bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// app.use(express.static(__dirname + "/public"));
// app.use(express.static("."));

app.get("/", function(req, res) {
	res.sendFile("public/index.html");
})