// Sports Car Gifs

// VARIABLES

var topics = [
    "Dodge Viper", 
    "Corvette",
    "Ferrari",
    "Maserati",
    "Lamborghini",
    "Camaro"
];

// FUNCTIONS

// switch betweeen still and animated GIF
function playPauseGif (gifItem) {
    var state = $(gifItem).attr("data-state"); // var to capture data state
    
    // check current state of GIF and animate or make still, will be activated by a click
    if (state === "still") {
        var animateURL = $(gifItem).attr("data-animate");
        $(gifItem).attr("src", animateURL);
        $(gifItem).attr("data-state", "animate");
    } else {
        var stillImageURL = $(gifItem).attr("data-still");
        $(gifItem).attr("src", stillImageURL);
        $(gifItem).attr("data-state", "still");
    }
}

// function for pulling from GIPHY
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
                var sportsCarImage = $("<img>").addClass("gif mr-4").attr({ // create img tag with class, margin, and attributes
                    "src": results["images"]["fixed_height_still"]["url"], // original src should be still image
                    "data-still": results["images"]["fixed_height_still"]["url"], // attr for still image URL
                    "data-animate": results["images"]["fixed_height"]["url"], // attr for animated image URL
                    "data-state": "still" // default data-state set to still
                });
                
                // recognize click
                sportsCarImage.on("click", function(event) {
                    playPauseGif(event.currentTarget);
                }
                
                sportsCarDiv.append(sportsCarImage); // append img to sportsCarDiv
                sportsCarDiv.append(pRating); // append rating to sportsCarDiv

                $("#gifs-view").prepend(sportsCarDiv); // prepend sportsCarDiv to the gifs page area
            }
        });
};

// function to makeButtons using the topics array
function makeButtons() {
    $("#buttons-view").empty(); // empty out buttons view before adding from topics to avoid dups

    for (var i = 0; i < topics.length; i++) {
        var b = $("<button>"); // create button tag
        b.addClass("btn btn-secondary m-2"); // add Bootstrap formatting
        b.attr("data-name", topics[i]); // set data-name attribute based on car name
        b.text(topics[i]); // button text set to the car
        $("#buttons-view").append(b); // add to the DOM
    }
};

// function to add new car to the buttons list
$("#add-car").on("click", function (event) {
    event.preventDefault();
    var sportsCar = $("#car-input").val().trim(); // grab input from the textbox
    topics.push(sportsCar); // add car from user-input to the topics array

    makeButtons(); // call makeButtons function to generate in buttons-view area
});

// function to switch between still and animated images
$(".gif").on("click", function() {
    console.log("click test");
    if (state === "still") {
        $(this).attr("src", animatedURL);
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", stillImageURL);
        $(this).attr("data-state", "still");
    }
});

// displayCarGifs when a button is clicked
$(document).on("click", "button", displayCarGifs);

// have page makeButtons even when nothing has been clicked yet, based on the default array to begin
makeButtons();

