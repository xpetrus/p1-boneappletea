var APIKey = "AIzaSyBUk3vcxA5iXsgPtxMF2S1RJr04STFnNI0";  
var url_new;

//Firebase
var config = {
  apiKey: "AIzaSyD5hZwW9Nq_GHhRiPodz6O0gKlgg4MWftU",
  authDomain: "firstproject-f9c80.firebaseapp.com",
  databaseURL: "https://firstproject-f9c80.firebaseio.com",
  projectId: "firstproject-f9c80",
  storageBucket: "firstproject-f9c80.appspot.com",
  messagingSenderId: "702580346589"
};
firebase.initializeApp(config);

var database = firebase.database();

function youtube(title){
  title="How to make " + '\"'+title+'\"' + " recipe";
      //console.log(title);
      var request = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&order=relevance&relevanceLanguage=en&q=" + title +"&key="+APIKey;
      console.log(request);
      $.ajax({
      url: request,
      method: "GET",
      async:false,
      //global:true
      }).success(function(data) 
      { 
          url_new = "https://www.youtube.com/embed/"+data.items[0].id.videoId;
          sessionStorage.setItem("youtube",url_new);
          var youtubeNew = sessionStorage.getItem("youtube");
      });
      return url_new;
}
$(document).ready(function () {   
    console.log(sessionStorage.getItem("ingredient"));
    //Taking value of input from submit box and calling it ingredient    
    var min = sessionStorage.getItem("min");
    var max = sessionStorage.getItem("max");
    var ingredientNew = sessionStorage.getItem("ingredient");
    console.log("ingredientNew=="+ingredientNew);
    console.log("min = " + min);
    var queryURL = "https://api.edamam.com/search?q=" + ingredientNew +"&app_id=119b1f5d&app_key=b02acfd3fb2ab3a0d297e1099f1c5743&from=" + min + "&to=" + max;
    console.log("queryURL==="+queryURL);
    
      //Empties any pictures that may be there
    
    // Creating an AJAX call for the button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).success(function (response) 
    {   console.log(response);
      //For loop to go through and display 3 recipes and images
      for (var j = 0; j < 3; j++) 
      {          
        // Create a row div
        var row = $("<div>", {
          class: "row"
        });

        /// Creating a div to hold the recipe
        var ingredDiv = $("<div>", {
          class: "col-12 col-md-4 ingredients"
        });
        var imgRecipe = response.hits[j].recipe.image;
        // Creating an element to hold the image and assigning attributes to it
        var image = $("<img>");
        image.attr("src", imgRecipe);
        image.attr("style", "padding:10px");
         // Appending the image
        ingredDiv.append(image);
        

         /// Creating a div to hold the recipe
        var titleDiv = $("<div>", {
          class: "col-12 col-md-4 recipeName"
        });

      // Storing the recipe title
      var title = response.hits[j].recipe.label;
      var calories = response.hits[j].recipe.calories;
      calories = Math.floor(calories);
      var numIngredients = response.hits[j].recipe.ingredientLines.length;
      var time = response.hits[j].recipe.totalTime;
      var servings = response.hits[j].recipe.yield;
      var link = response.hits[j].recipe.url;
      var mins = " Minutes";
      console.log("link=="+link);
      if (time === 0) {
        time = "Time is not available!!";
        mins = "";
      }  
      sessionStorage.setItem("title",title);
      var titleNew = sessionStorage.getItem("title");

      // Creating an element to have the recipe information displayed

      var pSpace = $("<p>").text(" ");

      var pSix = $("<a href='"+ link +"' target='_blank'>Instructions</a>");

      // Displaying the information
      titleDiv.append(pSpace);
      titleDiv.append("<p><b>Recipe: </b>"+ title + "</p>");
      titleDiv.append("<p><b>Calories: </b>"+ calories + "</p>");
      titleDiv.append("<p><b>Number of ingredients: </b>"+ numIngredients + "</p>");
      titleDiv.append("<p><b>Time to make: </b>"+ time + mins + "</p>");
      titleDiv.append("<p><b>Number of servings: </b>"+ servings + "</p>");
      //titleDiv.append(p);
      titleDiv.append(pSix);

      //Start Youtube div
      var youtubeDiv = $("<div>", {
      class: "col-12 col-md-4 youtube"
      });
      youtube(title);
      //youtube      
      var video = $("<iframe  src='" + url_new + "' frameborder='0' width='90%' height='90%' allowfullscreen autoplay='1'></iframe>");
      youtubeDiv.append(video);        
      row.append(ingredDiv, titleDiv,youtubeDiv);
      $('#recipe-view').append(row); 
      }
    });
   
  $("#add-food").on("click", function(event) {
    event.preventDefault();    
    console.log("min = " + min);
    //Taking value of input from submit box and calling it ingredient
    var ingredient = $("#recipe-input").val().trim();
    //Form validation
    if(ingredient == ""){
      $("#alert").text("Add an ingredient");
    }
    else{
      location.href = "results.html";
    //Firebase
    // Creates local "temporary" object for holding recipe data
    var newRecipe = {
      ingredient: ingredient
  };
   // Uploads recipe data to the database
   database.ref().push(newRecipe);
  
   // Logs ingredient to console
   console.log(newRecipe.ingredient);

   // Clears all of the text-boxes
   $("#recipe-input").val("");

    //sessionStorage.clear();

    sessionStorage.setItem("ingredient", ingredient);
    var ingredientNew = sessionStorage.getItem("ingredient")

    if (sessionStorage !== "undefined") {
      if (sessionStorage.clickcount) {
        sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
      }//ends second if
       else {
        sessionStorage.clickcount = 1;
      }//ends else
      var min = (sessionStorage.clickcount - 1) * 3;
      var max = (sessionStorage.clickcount) * 3;
      sessionStorage.setItem("min", min);
      sessionStorage.setItem("max", max);
    }
    console.log("min = " + min);

   var queryURL = "https://api.edamam.com/search?q=" + ingredientNew +"&app_id=119b1f5d&app_key=b02acfd3fb2ab3a0d297e1099f1c5743&from=" + min + "&to=" + max;
    
      //Empties any pictures that may be there
    $("#recipe-view").empty();
    // Creating an AJAX call for the button being clicked
   $.ajax({
      url: queryURL,
       method: "GET"
    }).then(function (response) {
      
      //For loop to go through and display 3 recipes and images
     for (var j = 0; j < 3; j++) {
        // Create a row div
        var row = $("<div>", {
          class: "row"
        });
        // Creating a div to hold the recipe
        var ingredDiv = $("<div>", {
          class: "col-12 col-md-4 ingredients"
        });
        // ingredDiv.attr("style", "display: inline-block");
        var imgRecipe = response.hits[j].recipe.image;
         // Creating an element to hold the image and assigning attributes to it
         var image = $("<img>");
         image.attr("src", imgRecipe);
         image.attr("style", "padding:10px");
         // Appending the image
        ingredDiv.append(image);
         // Creating a div to hold the recipe
         var titleDiv = $("<div>", {
          class: "col-12 col-md-4 recipeName"
        });
        // Storing the recipe title

      // Storing the recipe title
      var title = response.hits[j].recipe.label;
      var calories = response.hits[j].recipe.calories;
      calories = Math.floor(calories);
      var numIngredients = response.hits[j].recipe.ingredientLines.length;
      var time = response.hits[j].recipe.totalTime;
      var servings = response.hits[j].recipe.yield;
      var link = response.hits[j].recipe.url;
      

      sessionStorage.setItem("title",title);
      var titleNew = sessionStorage.getItem("title");
      // Creating an element to have the recipe information displayed
      var pSpace = $("<p>").text(" ");
      var pOne = $("<p>").text("Recipe: " + title);
      var pTwo = $("<p>").text("Calories: " + calories);
      var pThree = $("<p>").text("Number of ingredients: " + numIngredients);
      var pFour = $("<p>").text("Time to make: " + time + " minutes");
      var pFive = $("<p>").text(" Number of servings: " + servings);
      var pSix = $("<a href="+link+">Instructions</a>");

      // Displaying the information
      titleDiv.append(pSpace);
      titleDiv.append(pOne);
      titleDiv.append(pTwo);
      titleDiv.append(pThree);
      titleDiv.append(pFour);
      titleDiv.append(pFive);
      titleDiv.append(pSix);      

    //Start Youtube div
      var youtubeDiv = $("<div>", {
      class: "col-12 col-md-4 youtube"
      });
      //youtube
      youtube(title);
      
      var video = $("<iframe  src='" + url_new + "' frameborder='0' width='90%' height='90%' allowfullscreen autoplay='1'></iframe>");
      youtubeDiv.append(video); 
      ///-- Youtube video fetching
        // append columns to row
        row.append(ingredDiv, titleDiv,youtubeDiv);
        // append row to recipe-view
        $('#recipe-view').append(row);
      }
    });
  }
    });
    //Firebase Section
    database.ref().limitToLast(5).once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        var ingrad =  childData.ingredient;
        var final_ingrad = ingrad.charAt(0).toUpperCase()+ ingrad.slice(1).toLowerCase();
        var newRow = $("<p>").append($("<p>").text(final_ingrad)
        );
        // Append the new row to the table
        $('#videos').append(newRow);
      });
    });
  });

