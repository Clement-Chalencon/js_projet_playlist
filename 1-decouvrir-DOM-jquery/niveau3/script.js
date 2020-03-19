/*************************/
/** PROGRAMME PRINCIPAL **/
/*************************/

var listOfMovie = [];
var linespace = "\n";
var comma =",";

$(document).ready(function () {

  $.get("playlist.txt", function (data) {

    listOfMovie = splitFile(data);
    htmlDivElement(listOfMovie);
    

  },);

});


/***************/
/** FONCTIONS **/
/***************/


function htmlDivElement(listOfMovie) {

  $.each(listOfMovie, function(index, value){
    $("#list > ul").append('<li class="film">' + value + '</li></div>');
  });

}

function splitFile(data) {
  data = data.split('\n');
  data.forEach(function(element,index){
    data[index] = element.split(',');
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









