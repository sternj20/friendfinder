var path = require("path");
var friends = require("../data/friends.js");

module.exports = function(app){
	app.get("/api/friends", function(req, res){
		res.json(friends);
	});

	// Create a new friend from JSON data
	app.post("/api/friends", function(req, res) {
		var newFriend = req.body;
		console.log(req.body)

		console.log(newFriend)
		friends.push(newFriend);

		res.json(newFriend);
	});
};