define(function(require) {
	var $ = require("jquery");
	var Q = require("q");
	var _ = require("lodash");
	var firebase = require("firebase");
	var populateAllPage = require("get-users-movie-collection");
	var getposter = require("get-movie-poster-data");



// passing in the range # from the slider input to determine what movies to display - ssk

	return function (userid, range) {
	var deferred = Q.defer();
			var ref = new Firebase("https://cbs-movieclone.firebaseio.com/collections/" + userid);
			ref.on("value", function(snapshot) {
				var collectionsRef = snapshot.val();
				console.log("collectionsRef", collectionsRef);
				if (range === "0") {
					populateAllPage(userid)
			        .then(function(data) {
			          var allUserMovies = Object.keys( data ).map(function(key) { return data[key];});
			          var sortedResults = _.sortBy(allUserMovies, "Title");
			          getposter.requestData(sortedResults);
			        });

				}
				else {
					var filteredWatched = _.filter(collectionsRef, function(obj) {
						if (obj.Rating === range) {
							return obj;
						}
					});
					deferred.resolve(filteredWatched);
					console.log("FilteredWatched", filteredWatched);
					
				}
			});
			return deferred.promise;
		};//--end return function
});