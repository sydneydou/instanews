// Problem: Retrieve content from the NYT Top Stories API and add it to our site.
//  If we dont get a successful response, let the user know

// 1. Listen for the select menu to change (watching value)
// 1b. If select value is "" do nothing and return from the function immediately!
// 1c. Show a loader and clear out old stories
// 2. Send a request to the NYT API for data based on the value of the select menu
// 3. If successful, we parse the data we get back and decide what parts to append
// 4. Append that stuff to the DOM
// 5. If unsuccessful, append and show helpful error message to the user in the UI
// 6. Hide loader again

$(function() {
  $("#drop-down").on("change", function() {
    const section = $(this).val();
    // console.log(section);

    //if value is empty, return
    //show loader
    //clear stories
    $(.stories).empty();
    //make ajax request

    $.ajax({
      method: "GET",

      url:
        "https://api.nytimes.com/svc/topstories/v2/" +
        section +
        ".json?api-key=G4Hh9bDJTFGbGm3KSPEJqqh6KqZf9GoA",

      dataType: "json"
    })


      .done(function(data) {
        //steps 3 & 4
        //append all the things
        console.log(data.results);


        // 1. filter the data to only include 12 articles with images
        if ()
        // 2. create .each to run a function for each article in response.results
        // 3. for each article - create constants for image URL, title and link
        // 4. make HTML string for the article using the constants just created
        // 5. append string to stories section

      
      })
      .fail(function() {
        //do stuff here if it doesnt work out
      })
      .always(function() {
        //hide the loader
      });
  });
});
