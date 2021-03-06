define(function(require) {
	var $ = require("jquery");
	var getposter = require("get-movie-poster-data");
  var getmoviedata = require("get-movie-data");
  var getaddedmoviedata = require("get-added-movie-data");
  var addMovieToFirebase = require("add-movie-to-firebase");
  var searchMyMovies = require("search-my-movies");


  var authentication = require("authentication");
  var userLogin = require("existing-user-login");
 


    // button to register new user
    $("#register-button").click(function(event) {
      event.preventDefault();
      var userEmail = $("#user-email").val();
      var userPassword = $("#user-password").val();
      authentication.createNewUser(userEmail, userPassword);
    });

    // button to login existing user
    $("#login-button").click(function(event) {
      event.preventDefault();
      var userEmail = $("#user-email").val();
      var userPassword = $("#user-password").val();
      userLogin.logUserIn(userEmail, userPassword);
    });

    // button to log out
    $("#logout-button").click(function(event) {
      userLogin.logUserOut();
    });

  	// -------- FIND MOVIES Nav button, search input in modal and submit search value ------//
  	// nav button
    $("#find-movies-button").click(function() {
        console.log("you clicked");
        $("#find-movies-modal").modal("show");
    });
    // preventing default form submit on input field
    $("#find-movies-search").keypress(function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
      }
    });

    // submit find button on find movies modal
    $("#submit-find-button").click(function() {
      var value = $("#find-movies-search").val();
      console.log("val", value);
      var movieIDarray = [];

      getmoviedata.requestData(value)
        .then(function(data) {
          console.log("get movie data", data);
          console.log("data search", data.Search);
          $.each(data.Search, function(index, value){
            console.log("each function -- ", value.imdbID);
            movieIDarray.push(value.imdbID);
            console.log("movieIDarray", movieIDarray);
          });
          getposter.requestData(movieIDarray);
        });
    }); // end submit-find-button



    // ------------ SEARCH MY MOVIES nav, input field and submit input value ---//
    // nav button
    $("#search-my-movies-button").click(function() {
      console.log("you clicked");
      $("#search-my-movies-modal").modal("show");
    });
    // preventing default form submit on input field
    $("#my-movies-search").keypress(function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
      }
    });
    // submit search button in modal
    $("#submit-search-my-movies").click(function(){
      var userid = userLogin.getUid();
      var value = $("#my-movies-search").val();

      searchMyMovies.myMovies(userid, value);


    });




    $("body").on("click", ".add-movie-to-collection", function(event) {
      console.log("this poster", $(this).attr('poster'));
      var userid = userLogin.getUid();
      var posterURL = $(this).attr('poster');
      getaddedmoviedata.requestData(this.id)
        .then(function(data){
          console.log("in-depth data", data);
          var addedMovieObj = {
            "title": data.Title,
            "year": data.Year,
            "actors": data.Actors,
            "watched": false,
            "rating": 0,
            "url" : posterURL
          };
          addMovieToFirebase.pushData(userid, addedMovieObj);
        })
        .fail(function(error){
          console.log("it's fucked", error);
        });
    }); // end body click function

}); // end define function




















