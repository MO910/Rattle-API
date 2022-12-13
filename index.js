const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	authAPIRout = require("./routes/users"),
	cors = require("cors");
// GraphQL
const { graphqlHTTP } = require("express-graphql"),
	schema = require("./graphQl/schema");
// Mongoose Setup
const mongoose = require("mongoose");
const url =
	"mongodb+srv://SHARK:XJ9WcIYAV5UmFJjc@cluster0.qibbwql.mongodb.net/?retryWrites=true&w=majority";
mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(async () => {
		app.use("/graphql", graphqlHTTP({ schema, graphiql: true })); // here disable graphial = false
		console.log("fssssssssssssssssssssssssssssssssssssssssssssss");
	});
// bodyParser
app.use(cors());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	}),
);
// Routs
app.use("/api", authAPIRout);
app.get("/", (req, res) => {
	res.json({
		msg: "helllo",
	});
});
// listening
const PORT = process.env.PORT || 5000;
const listener = app.listen(PORT, function () {
	console.log("Listening on port " + listener.address().port); //Listening on port 8888
});
module.exports = app;
