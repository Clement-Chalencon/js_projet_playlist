/*************************/
/** PROGRAMME PRINCIPAL **/
/*************************/
var listOfMovie = [];

$(document).ready(function () {

  $.get("playlist.txt", function (data) {

    listOfMovie = splitFile(data);
    console.log(listOfMovie);
    htmlDivElement(listOfMovie);
  });
});


/***************/
/** FONCTIONS **/
/***************/
function htmlDivElement(listOfMovie) {

  listOfMovie.forEach(function(value,index){
    $("#list > ul").append('<div class="film">' + value + '</div>');
  });

  // $.each(listOfMovie, function (index, value) {
  //   $("#list > ul").append('<div class="film">' + value + '</div>');
  // });

}

function splitFile(data) {
  data = data.split('\n');
  data.forEach(function (value, index) {
    data[index] = value.split(',');
  });
    return data;
  }
  



function createMovie(i, n, d) {

      var movie = {};

      // completer le code ici
      return movie;
    }



function addMovie(m) {

      listOfMovie.push(m);

    }









