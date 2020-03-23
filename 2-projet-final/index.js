//--------------------------------------------------
//  Bi-Directional OSC messaging Websocket <-> UDP
//--------------------------------------------------
var osc = require("osc"),
    WebSocket = require("ws");

var getIPAddresses = function () {
    var os = require("os"),
    interfaces = os.networkInterfaces(),
    ipAddresses = [];

    for (var deviceName in interfaces){
        var addresses = interfaces[deviceName];

        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i];

            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address);
            }
        }
    }

    return ipAddresses;
};

var udp = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 7400,
    remoteAddress: "127.0.0.1",
    remotePort: 12345
});

udp.on("ready", function () {
    var ipAddresses = getIPAddresses();
    console.log("Listening for OSC over UDP.");
    ipAddresses.forEach(function (address) {
        console.log(" Host:", address + ", Port:", udp.options.localPort);
    });
    console.log("Broadcasting OSC over UDP to", udp.options.remoteAddress + ", Port:", udp.options.remotePort);
});

udp.open();

var wss = new WebSocket.Server({
    port: 8081
});

wss.on("connection", function (socket) {
    console.log("A Web Socket connection has been established!");
    var socketPort = new osc.WebSocketPort({
        socket: socket
    });

    var relay = new osc.Relay(udp, socketPort, {
        raw: true
    });
});


/*************************/
/** PROGRAMME PRINCIPAL **/
/*************************/

$(document).ready(function () {
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
  $('#list').html('');
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





