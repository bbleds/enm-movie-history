define(function(require) {
	var $ = require("jquery");
	var Q = require("q");
	var _ = require("lodash");
	var firebase = require("firebase");

		
	return function (userid) {
		var deferred = Q.defer();
		var ref = new Firebase("https://cbs-movieclone.firebaseio.com/collections/" + userid);
			ref.on("value", function(snapshot) {
				var collectionsRef = snapshot.val();
	// check to see if movie is marked as deleted, if true filter it from the array - ssk
				var filterdeleted = _.filter(collectionsRef, function(obj) {
					if (obj.Deleted !== true) {
						return obj;
					}
				});

				
				console.log("filterdeleted ", filterdeleted);
				deferred.resolve(filterdeleted);
			});
			return deferred.promise;
		};
});


