define(function(require) {
	var $ = require("jquery");
	var Q = require("q");
	var firebase = require("firebase");

	//Assigns a bolean value of true to the "Deleted" key 
	// ??and then does not return that movie in the array?? -ssk
	return function (userid, movieID) {
	var deferred = Q.defer();
		var ref = new Firebase("https://movie-history-enm.firebaseio.com/collections/" + userid + "/" + movieID);
			var movieRef = ref.child(movieID);
			movieRef.update({
				"Deleted": true
			});
		};

});
