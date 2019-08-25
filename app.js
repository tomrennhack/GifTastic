// Sports Car Gifs

// VARIABLES

var topics = ["Dodge Viper", "Corvette", "Ferrari", "Maserati", "Lamborghini", "Camaro"];

// FUNCTIONS

// function for pulling GIPHY GIFS
function displayCarGifs() {
    var sportsCar = $(this).attr("data-name"); // store data name from the button that is clicked
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        sportsCar + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10"; // construct query using sportsCar name

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) { // After data comes back from the request
            var results = response.data; // storing the data from the AJAX request in the results variable
            for (var i = 0; i < results.length; i++) { // looping through each result item
                var sportsCarDiv = $("<div>"); // create div tag for each sportsCar
                var pRating = $("<p>").text("Rating: " + results[i].rating.toUpperCase()); // create p-tag with rating
                var sportsCarImage = $("<img>"); // create and store img tag
                sportsCarImage.attr("src", results[i].images.fixed_height.url); // set src of img to property from GIPHY API
                
                sportsCarDiv.append(sportsCarImage); // append img to sportsCarDiv
                sportsCarDiv.append(pRating); // append rating to sportsCarDiv
                
                $("#gifs-view").prepend(sportsCarDiv); // prepend sportsCarDiv to the gifs page area
            }
        });
};

// function to make buttons out of topics
function makeButtons() {
    $("#buttons-view").empty(); // empty out buttons view before adding from topics to avoid dups

    for (var i = 0; i < topics.length; i++) {
        var b = $("<button class='btn btn-secondary m-2'>"); // create button tag with Bootstrap formatting
        b.attr("data-name", topics[i]); // set data-name attribute based on car name
        b.text(topics[i]); // button text set to the car
        $("#buttons-view").append(b); // add to the DOM
    }
}

// function to add new car to the buttons list
$("#add-car").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var sportsCar = $("#car-input").val().trim();

    // Adding the movie from the textbox to our array
    topics.push(sportsCar);
    console.log(topics);

    // Calling renderButtons which handles the processing of our movie array
    makeButtons();
});

$(document).on("click", "button", displayCarGifs);

makeButtons();

