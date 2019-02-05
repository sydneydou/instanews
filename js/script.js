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

$(function () {
  $("#drop-down").on("change", function () {
    const section = $(this).val();
    console.log(section);


    $(".stories").empty();

    $(".main").removeClass("main").addClass("mainAdd");


    $(".stories").append("<img class='loader' src='/images/ajax-loader.gif'>");


    //Make ajax request:
    $.ajax({
        method: "GET",

        url: "https://api.nytimes.com/svc/topstories/v2/" +
          section +
          ".json?api-key=G4Hh9bDJTFGbGm3KSPEJqqh6KqZf9GoA",

        dataType: "json"
      })


      .done(function (data) {

        const results = (data.results).filter(function (imgSearch) {

          return imgSearch.multimedia.length > 4;

        }).slice(0, 12);

        console.log(results);

        $.each(results, (key, value) => {


        

            $(".stories").append(
              
              `<a href="${value.url}" class="abstract" style="background-image:url(${value.multimedia[4].url})"> 

         
            
                   <p> ${value.abstract} </p>

              </a>`);



        });


      })
      .fail( () => {
        $(".stories").append("<p> Sorry, there was an error with your request </p>");
      })

      .always( () => {
        $(".loader").hide();

      });
  });
});