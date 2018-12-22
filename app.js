//Setting up the jquery function 
$(document).ready(function () {

  $("#add-food").on("click", function(event) {

    event.preventDefault();
 
    //Taking value of input from submit box and calling it ingredient
    var ingredient = $("#recipe-input").val().trim();
    console.log("ingredient== "+ ingredient);


    //Linking to url with my API key and a variable for the ingredient, using parameters of 2 recipes
    var queryURL = "https://api.edamam.com/search?q=" + ingredient +"&app_id=119b1f5d&app_key=b02acfd3fb2ab3a0d297e1099f1c5743&from=0&to=3";
    console.log(queryURL);
    
      //Empties any pictures that may be there
    //$("#recipe-view").empty();

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
        //  var titleDiv = $("<div class='recipeName'>");
        //  titleDiv.attr("style", "display: inline-block");

        // Storing the recipe title
        var title = response.hits[j].recipe.label;
        console.log(title);

        // Creating an element to have the recipe title displayed
        var pOne = $("<p>").text("Recipe: " + title);

        // Displaying the title
        titleDiv.append(pOne);
        console.log(pOne);

        // Retrieving the URL for the images, a still one and an animated one
       
        var link = response.hits[j].recipe.url;        
        
        //ingredDiv.append(link);
        
        

        //Setting up the button to link to recipe instructions
        //var link = response.hits[j].recipe.url;
        //<input id="instructions" type="submit" href="response.hits[j].recipe.url" value="Submit ingredient!"></input>

        //var instructions = $("<btn");
        //instructions.attr("src", link)
        //instructions.attr("type", "button");
        //console.log("Link=  "+ link);
        //<a class="btn btn-primary" href = "link" role="button">Instructions</a>

        //ingredDiv.append(instructions);

        // Putting the pictures above the previous pictures
        // $("#recipe-view").prepend(ingredDiv);

        // append columns to row
        row.append(ingredDiv, titleDiv);

        // append row to recipe-view
        $('#recipe-view').append(row);

      }


    });

  });

 

  // Function to take input from the text box and create a new button with a new location
 
     

  });


  // Adding a click event listener to all elements with a class of "vacation-btn"
  //$(document).on("click", "#add-food", displayRecipe);

  // Calling the renderButtons function to display the intial buttons
 // renderButtons();



