//Setting up the jquery function 
$(document).ready(function () {


  //Getting input from session storage
  var ingredientNew = sessionStorage.getItem("ingredient");
  console.log("ingredient " + ingredientNew);
  var titleNew = sessionStorage.getItem("title");
  console.log("titleNew " + titleNew);

  //var url_new = "https://www.youtube.com/embed/" + response2.items[j].id.videoId;
    // $(".dump").html(url_new + "<p>" + response1.items[j].snippet.title + "</p>");
     //$(".video").html("<iframe width='640' height='360' src='" + url_new + "' frameborder='0' allowfullscreen autoplay='1'></iframe>");

  //Linking to url with my API key and a variable for the ingredient, using parameters of 2 recipes
  var queryURL = "https://api.edamam.com/search?q=" + titleNew + "&app_id=119b1f5d&app_key=b02acfd3fb2ab3a0d297e1099f1c5743&from=0&to=3";
  
  // This is  youtube API key
  var APIKey = "AIzaSyBUk3vcxA5iXsgPtxMF2S1RJr04STFnNI0";
  var request = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&order=viewCount&q=" + titleNew + "&key=" + APIKey;

  // Creating an AJAX call for recipe info
  $.ajax({
    url: request,
    method: "GET"
  }).then(function (response2) {
    console.log("response2 " + response2);
    console.log(request);


    //For loop to go through and display 3 recipes and images
    for (var j = 0; j < 3; j++) {
      // Create a row div
     /* var row = $("<div>", {
        class: "row"
      }); */

        // Creating a div to hold the recipe image
     /* var ingredDiv = $("<div>", {
        class: "col-12 col-md-4 ingredients"
      });

      //var imgRecipe = response1.hits[j].recipe.image;

      // Creating an element to hold the image and assigning attributes to it
      //var image = $("<img>");
      //image.attr("src", imgRecipe);
      //image.attr("style", "padding:10px");

      // Appending the image
      //ingredDiv.append(image);


      // Creating a div to hold the recipe information
      var titleDiv = $("<div>", {
        class: "col-12 col-md-4 recipeName"
      });
      
       
      // Storing the recipe title
      //var title = response1.hits[j].recipe.label;
      //var calories = response1.hits[j].recipe.calories;
      //var numIngredients = response1.hits[j].recipe.ingredientLines.length;
      //var time = response1.hits[j].recipe.totalTime;
      //var servings = response1.hits[j].recipe.yield;
      //var link = response1.hits[j].recipe.url;

      // Creating an element to have the recipe information displayed
      //var pSpace = $("<p>").text(" ");
      //var pOne = $("<p>").text("Recipe: " + title);
      //var pTwo = $("<p>").text("Calories: " + calories);
      //var pThree = $("<p>").text("Number of ingredients: " + numIngredients);
      //var pFour = $("<p>").text("Time to make: " + time + " minutes");
      //var pFive = $("<p>").text(" Number of servings: " + servings);
      ////var pSix = $("<a>").val("Instructions " + link);
      //<a class="link2" href="link">Instructions</a>
      //console.log("link"+pSix);

      // Displaying the information
     // titleDiv.append(pSpace);
      /*titleDiv.append(pOne);
      titleDiv.append(pTwo);
      titleDiv.append(pThree);
      titleDiv.append(pFour);
      titleDiv.append(pFive);
      titleDiv.append(pSix);
      var instr = $("<a>");
      $(instr).attr('href', 'link');
      $(instr).attr("text", "Instructions");
      titleDiv.append(instr);
      //console.log(href);

      // Creating a link to go to the instructions
      var link = response1.hits[j].recipe.url;*/

      // Creating a div to hold the recipe image */
     var videoDiv = $("<div>", {
        class: "col-12 col-md-4 video"
      });

        var url_new = "https://www.youtube.com/embed/" + response2.items[j].id.videoId;
        $(".dump").html(url_new + "<p>" + response2.items[j].snippet.title + "</p>");
        $(".video").html("<iframe width='340' height='340' src='" + url_new + "' frameborder='0' allowfullscreen autoplay='1'></iframe>");

        videoDiv.append(url_new); 
       // $("#recipe-view").prepend(ingredDiv);

      // append columns to row
     // row.append(videoDiv);
      console.log(videoDiv);

      // append row to recipe-view
      $('#recipe-view').append(videoDiv);

    } //ends for loop

  }); //ends first AJAX for recipe info

  
  // This is  youtube API key
  var APIKey = "AIzaSyBUk3vcxA5iXsgPtxMF2S1RJr04STFnNI0";
  var request = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&order=viewCount&q=" + ingredientNew + "&key=" + APIKey;

  // Creating an AJAX call for you tube video
  $.ajax({
    url: request,
    method: "GET"
  }).then(function (response2) {
    console.log("response2" + response2);
    console.log(request);


    //For loop to go through and display 3 recipes and images
    for (var j = 0; j < 3; j++) {
      // Create a row div
     var row = $("<div>", {
       class: "row"
      });

      //var ingredDiv = $("<div>", {
       // class: "col-12 col-md-4 ingredients"
      //});

      // Creating a div to hold the recipe information
      //var titleDiv = $("<div>", {
        //class: "col-12 col-md-4 recipeName"
      //});

      // Creating a div to hold the recipe image
      var videoDiv = $("<div>", {
        class: "col-12 col-md-4 video"
      });

      var url_new = "https://www.youtube.com/embed/" + response2.items[j].id.videoId;
      $(".dump").html(url_new + "<p>" + response2.items[j].snippet.title + "</p>");
      $(".video").html("<iframe width='320' height='320' src='" + url_new + "' frameborder='0' allowfullscreen autoplay='1'></iframe>");
       console.log("url_new " + url_new);
      // $("#recipe-view").prepend(ingredDiv);

      videoDiv.append(url_new);      
      // append columns to row
      row.append(videoDiv);
      console.log("videoDiv in response2 " + videoDiv);

      // append row to recipe-view
     // $('#recipe-view').append(row);

    } //ends for loop

  }); //ends you-tube AJAX


    $("#add-food").on("click", function (event) {

      event.preventDefault();

      //Taking value of input from submit box and calling it ingredient
      var ingredient = $("#recipe-input").val().trim();
      //console.log("ingredient== "+ ingredient);

      sessionStorage.clear();

      sessionStorage.setItem("ingredient", ingredient);
      var ingredientNew = sessionStorage.getItem("ingredient")


    }); // ends on click




  });



 



