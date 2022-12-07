const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	serverless = require("serverless-http"),
	authAPIRout = require("./routes/users"),
	cors = require("cors");
// GraphQL
// const { graphqlHTTP } = require("express-graphql");
// const schema = require("./graphQl/schema");
// Mongoose Setup
const mongoose = require("mongoose");
const uri =
	"mongodb+srv://SHARK:XJ9WcIYAV5UmFJjc@cluster0.qibbwql.mongodb.net/?retryWrites=true&w=majority";
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(async () => {
		console.log("fdssssssssssssssssssssssssssssssssssssssssssssss");
		// app.use("/graphql", graphqlHTTP({ schema, graphiql: true })); // here disable graphial = false
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
// app.use("/auth", authAPIRout);
app.use("/api", authAPIRout);
// listening
const PORT = process.env.PORT || 5000;
const listener = app.listen(PORT, function () {
	console.log("Listening on port " + listener.address().port); //Listening on port 8888
});
module.exports = app;
// module.exports.handler = serverless(app);
