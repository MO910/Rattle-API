const usersSchema = require("../models/Users/Users"),
	jwt = require("jsonwebtoken");
// SECRET_KEY
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
// login
const login = async (req, res) => {
	console.log(SECRET_KEY);
	let auth = (
		await usersSchema.find({
			username: req.body.username,
			password: req.body.password,
		})
	)[0];
	if (auth) {
		// create a token
		res.json({
			token: await jwt.sign(
				{
					user: {
						_id: auth._id,
						name: auth.name,
					},
				},
				SECRET_KEY,
			),
		});
	} else res.sendStatus(403);
};

// login
const signup = async (req, res) => {
	const newUser = await usersSchema.create({
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
	});
	res.json(newUser);
};

// verification
const verification = (req, res, next) => {
	const bearerHeader = req.headers.authorization;
	if (bearerHeader) {
		req.token = bearerHeader.split(" ")[1];
		next();
	} else {
		res.sendStatus(403);
	}
};

// user
const user = async (req, res) => {
	const data = await jwt.verify(req.token, SECRET_KEY);
	res.json(data);
};

// logout
const logout = (req, res) => {
	res.json({
		msg: "logged out",
	});
};
// Export
module.exports = { login, signup, verification, user, logout };
