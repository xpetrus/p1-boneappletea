var APIKey = "AIzaSyBUk3vcxA5iXsgPtxMF2S1RJr04STFnNI0";  
/*function youtube(recipes) {
    ///-- Youtube video fetching
    var url_new = "";
    var request = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=viewCount&q=" + recipes +"&key="+APIKey;
    $.ajax({
            url: request,
            method: "GET"          
            }).success(function(response) 
            {   
                url_new = "https://www.youtube.com/embed/"+response.items[0].id.videoId;
                console.log("in_azax_funtcion_url===="+url_new);
            });
    console.log("before_return_funtcion_url===="+url_new);
        return url_new;
    }*/
//Setting up the jquery function 
$(document).ready(function () {   
    console.log(sessionStorage.getItem("ingredient"));
    //Taking value of input from submit box and calling it ingredient    

    var ingredientNew = sessionStorage.getItem("ingredient");
    console.log("ingredientNew=="+ingredientNew);

    //Linking to url with my API key and a variable for the ingredient, using parameters of 2 recipes
    var queryURL = "https://api.edamam.com/search?q=" + ingredientNew +"&app_id=119b1f5d&app_key=b02acfd3fb2ab3a0d297e1099f1c5743&from=0&to=3";
    console.log(queryURL);
    
      //Empties any pictures that may be there
    
    // Creating an AJAX call for the button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).success(function (response) 
    {   
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
    //    var title = response.hits[j].recipe.label;


    //    var link = response.hits[j].recipe.url;


///Dina

      // Storing the recipe title
      var title = response.hits[j].recipe.label;
      var calories = response.hits[j].recipe.calories;
      var numIngredients = response.hits[j].recipe.ingredientLines.length;
      var time = response.hits[j].recipe.totalTime;
      var servings = response.hits[j].recipe.yield;
      var link = response.hits[j].recipe.url;

      console.log("link======>>>>>>>"+link);
      //var str = "Instructions ";
      //var link = str.link("response1.hits[j].recipe.url");
      sessionStorage.setItem("title",title);
      var titleNew = sessionStorage.getItem("title");
      // Creating an element to have the recipe information displayed
      var pSpace = $("<p>").text(" ");
      var pOne = $("<p>").text("Recipe: " + title);
      var pTwo = $("<p>").text("Calories: " + calories);
      var pThree = $("<p>").text("Number of ingredients: " + numIngredients);
      var pFour = $("<p>").text("Time to make: " + time + " minutes");
      var pFive = $("<p>").text(" Number of servings: " + servings);
      //var txt = "Instructions";
      //var pSix = (txt.link("link"));
     // var pSix = (txt.link("http://www.marthastewart.com/332664/chicken-gravy"));
      var pSix = $("<a href="+link+">Instructions</a>");
      //var pSix = $("<a href  src='" + url_new + "' frameborder='0' allowfullscreen autoplay='1'></iframe>");
      //document.write("<p>Link: " + pSix.link("link") + "</p>");
      //document.getElementById("pSix").innerHTML = link;
     // <a class="link2" href="response1.hits[j].recipe.url">Instructions</a>
      //console.log("link"+pSix);

      // Displaying the information
      titleDiv.append(pSpace);
      titleDiv.append(pOne);
      titleDiv.append(pTwo);
      titleDiv.append(pThree);
      titleDiv.append(pFour);
      titleDiv.append(pFive);
      titleDiv.append(pSix);


///Dina

     // var instr = $("<a>");
     // $(instr).attr('href', 'link');
     // $(instr).attr("text", "Instructions");
     // titleDiv.append(instr);
      //console.log(href);

        // Creating an element to have the recipe title displayed
        //var pOne = $("<p>").text("Recipe: " + title);
        // Displaying the title
        //titleDiv.append(pOne);
        // Retrieving the URL for the images, a still one and an animated one       
        // Youtube video
        console.log(j+"Start----------");
            var youtubeDiv = $("<div>", {
            class: "col-12 col-md-4 youtube"
            });
            var request = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&order=relevance&relevanceLanguage=en&q=" + title +"recipe &key="+APIKey;
            console.log(request);
            //var request = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&order=rating&q=" + title +"recipe &key="+APIKey;
            $.ajax({
            url: request,
            method: "GET"
            }).success(function(data) 
            {   
                var url_new = "https://www.youtube.com/embed/"+data.items[0].id.videoId;
                console.log("before_url_append===="+url_new);
                var video = $("<iframe  src='" + url_new + "' frameborder='0' allowfullscreen autoplay='1'></iframe>");
                sessionStorage.setItem("youtube",url_new);
                var youtubeNew = sessionStorage.getItem("youtube");
                youtubeDiv.append(video);
            });
        console.log(j+"End----------");
        
        
        row.append(ingredDiv, titleDiv,youtubeDiv);
   //});
        // append row to recipe-view
        $('#recipe-view').append(row);
 
      }
    });
   
  $("#add-food").on("click", function(event) {
    event.preventDefault();
 
    //Taking value of input from submit box and calling it ingredient
    var ingredient = $("#recipe-input").val().trim();
    //console.log("ingredient== "+ ingredient);
    sessionStorage.clear();
    sessionStorage.setItem("ingredient", ingredient);
    var ingredientNew = sessionStorage.getItem("ingredient")
    //Linking to url with my API key and a variable for the ingredient, using parameters of 2 recipes
   var queryURL = "https://api.edamam.com/search?q=" + ingredientNew +"&app_id=119b1f5d&app_key=b02acfd3fb2ab3a0d297e1099f1c5743&from=0&to=3";
    console.log(queryURL);
    
      //Empties any pictures that may be there
    $("#recipe-view").empty();
    // Creating an AJAX call for the button being clicked
   $.ajax({
      url: queryURL,
       method: "GET"
    }).then(function (response) {
      console.log(response);
      
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
        var title = response.hits[j].recipe.label;
        console.log("title===   "+title);
        // Creating an element to have the recipe title displayed
        var pOne = $("<p>").text("Recipe: " + title);
        // Displaying the title
        titleDiv.append(pOne);
        console.log(pOne);
       // Youtube video
       var youtubeDiv = $("<div>", {
        class: "col-12 col-md-4 youtube"
        });
        //var url_new= youtube(title);
        console.log("Y2");
        ///-- Youtube video fetching
        var request = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&order=viewCount&q=" + title +"&key="+APIKey;
        $.ajax({
        url: request,
        method: "GET"
        }).then(function(response) 
        {
            console.log(response);            
            var url_new = "https://www.youtube.com/embed/"+response.items[0].id.videoId;
            console.log("before_url_append===="+url_new);
            var video = $("<iframe width='100%' height='100%'  src='" + url_new + "' frameborder='0' allowfullscreen autoplay='1'></iframe>");
       
            youtubeDiv.append(video);
            //$(".video").html("<iframe width='640' height='360' src='" + url_new + "' frameborder='0' allowfullscreen autoplay='1'></iframe>");
        });
        ///-- Youtube video fetching
        // append columns to row
        row.append(ingredDiv, titleDiv,youtubeDiv);
        // append row to recipe-view
        $('#recipe-view').append(row);
      }
    });
   
    });
    
  });