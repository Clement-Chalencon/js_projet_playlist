/*************************/
/** PROGRAMME PRINCIPAL **/
/*************************/
var listOfMovie = [];

// Affichage
$(document).ready(function () {

  $.get("playlist.txt", function (data) {

    var list = splitFile(data);
    for (i = 0; i < list.length; i++) {
      var movie = createMovie(list[i][0], list[i][1], list[i][2]);
      addMovie(movie);
    }
    htmlDivElement(listOfMovie);
  });

  $('.divFilm').click(function(){
    console.log('youpi');
  });

// Boutons plays
  $(document).on('click','.play',function(){
    id = $(this).attr('id');
    console.log(id);
    listOfMovie.forEach(function (value, index) {
      if (value.index == id){
        blabla=value;
      }
    });
    createPlayCallback(blabla);
  });

});


/***************/
/** FONCTIONS **/
/***************/
function htmlDivElement(movie) {
  $.each(movie, function (index) {
    $("#list").append('\
    <div class="divFilm">\
      <div class="divIndex">'+ movie[index].index + '</div>\
      <div class="divTitle">'+ movie[index].name + ' (' + movie[index].duration + ') </div>\
      <button  id="'+movie[index].index+'" class="play btn waves-effect deep-purple accent-2" type="submit" name="action">\
      <i class="material-icons">play_arrow</i>\
    </button></div>');
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

function createPlayCallback(movie) {
  console.log(movie);
}









