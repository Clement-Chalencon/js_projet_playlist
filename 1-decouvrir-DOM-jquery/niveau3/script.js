/*************************/
/** PROGRAMME PRINCIPAL **/
/*************************/
var listOfMovie = [];

$(document).ready(function () {

  $.get("playlist.txt", function (data) {

    list = splitFile(data);
    for (i = 0; i < list.length; i++) {
      var movie = createMovie(list[i][0], list[i][1], list[i][2])
      addMovie(movie);
    }
    console.log(listOfMovie[1].name);

    htmlDivElement(listOfMovie);
  });
});


/***************/
/** FONCTIONS **/
/***************/
function htmlDivElement(li) {

  // listOfMovie.forEach(function(value,index){
  //   $("#list > ul").append('<div class="film">' + value + '</div>');
  // });

  // $.each(li, function (index, value) {
  //   $("#list > ul").append('<div class="film">' + value + '</div>');
  // });

  $.each(li, function (index) {
    $("#list > ul").append('<div class="divFilm"><div class="divIndex">' 
    + li[index].index + '</div><div class="divTitle">' 
    + li[index].name + ' (' + li[index].duration + ') </div></div>');
  });

}

function splitFile(data) {
  data = data.split('\n');
  $.each(data, function (key, value) {
    data[key] = value.split(',');
  });


  return data;
}


function splitFile1(data) {
  data = data.split('\n');
  data.forEach(function (value, index) {
    data[index] = value.split(',');
  });
  return data;
}




function createMovie(i, n, d) {

  var movie = {
    index: i,
    name: n,
    duration: d,
  };
  return movie;
}



function addMovie(m) {

  listOfMovie.push(m);

}









