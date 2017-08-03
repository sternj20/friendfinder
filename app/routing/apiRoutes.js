var path = require("path");
var friends = require("../data/friends.js");

module.exports = function(app){
	app.get("/api/friends", function(req, res){
		res.json(friends);
	});

	// Create a new friend from JSON data
	app.post("/api/friends", function(req, res) {
		//friend that is being added
		var newFriend = req.body;
		//scores from friend being added
		var newFriendScores = JSON.stringify(newFriend.scores);
		//array that will hold the score difference between the friend being added and each friend in storage
		var differenceAmtArray = [];
		//keeps track of difference amount per person
		var totalDifferenceAmt;
		var differenceAmt;
		// iterate through the friends array
		for(var i = 0; i < friends.length; i++){
				for(var j = 0; j < 10; j++){
				//for each friend in array, subtract new friends scores from their scores and push to a new array
				differenceAmt = newFriend.scores[j] - friends[i].scores[j];
				// if the difference amount is a negative number
				if(differenceAmt < 0){
					//convert to positive
					differenceAmt = Math.abs(differenceAmt);
				}
				totalDifferenceAmt = 0;
				//add each scores difference to total
				totalDifferenceAmt += differenceAmt;
			}
			//push each persons difference amount to their specific object in friends array
			friends[i].totalDiff += differenceAmt;
		}
		friends.push(newFriend);
		//sort the friends array by who has the lowest difference amount in score with the newest friend added
		friends.sort(function(a,b){
			return a.totalDiff - b.totalDiff;
		});
		//return the closest match
		console.log(friends[0]);
		res.json(newFriend);
	});
};