/*************************/
/** PROGRAMME PRINCIPAL **/
/*************************/
var listOfMovie = [];


$(document).ready(function () {
  // initial display
  $('.parallax').parallax();
  showList();
  refresh();

  // play buttons
  $(document).on('click', '.playButton', function () {
    // check the ID
    var id = $(this).attr('id');

    // Play/Pause icon display
    if ($('#' + id + 'play').is(':hidden')) {
      showPlay(id);
    }
    else {
      showPause(id);
    }
    // Get the movie id
    listOfMovie.forEach(function (value, index) {
      if (value.index == id) {
        movie = value;
      }
    });
    createPlayCallback(movie);
  });

});


/***************/
/** FONCTIONS **/
/***************/

// show the list of movies
function showList() {
  // $('#list').html('');
  listOfMovie = [];
  var list = [];
  $.get("playlist.txt", function (data) {
    list = splitFile(data);
    for (i = 0; i < list.length; i++) {
      var movie = createMovie(list[i][0], list[i][1], list[i][2]);
      addMovie(movie);
    }
    htmlDivElement(listOfMovie);
  });

  $('.divFilm').click(function () {
    console.log(listOfMovie);
  });
}

// write the HTML of the list
function htmlDivElement(movie) {
  $.each(movie, function (index) {
    $("#list").append('\
    <div class="divFilm row z-depth-2 grow">\
      <div class="divIndex col s1">'+ movie[index].index + '</div>\
      <div class="divTitle col s10 ">'+ movie[index].name + ' (' + movie[index].duration + ') </div>\
      <div class=" col s1">\
        <button  id="'+ movie[index].index + '" class="playButton btn waves-effect waves-purple red" type="submit" name="action">\
          <i id="'+ movie[index].index + 'play"class="play material-icons play">play_arrow</i>\
          <i id="'+ movie[index].index + 'pause"class="pause material-icons play">pause</i>\
        </button>\
      </div>\
    </div>').hide().fadeIn(400);
    $('.pause').hide();
  });
}

  // refresh button
function refresh() {
  $(document).on('click', '#refresh', function () {
    $('.refresh').html('');
    showList();
    $('.refresh').append('\
        <a id="refresh" class="btn-floating btn-large waves-effect waves-purple red">\
          <i class="material-icons tilt">refresh</i>\
        </a>').hide().delay(800).fadeIn(1000);
  });
}

// Split the txt file in an array and splits each array's line
function splitFile(data) {
  data = data.split('\n');
  $.each(data, function (key, value) {
    data[key] = value.split(',');
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


function showPause(id) {
  $('.play').show();
  $('.pause').hide();
  $('#' + id + 'play').hide();
  $('#' + id + 'pause').show();
}

function showPlay(id) {
  $('.play').show();
  $('.pause').hide();
  $('#' + id + 'play').show();
}





