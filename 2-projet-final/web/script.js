listOfMovie = [];


//NE PAS TOUCHER
var port = new osc.WebSocketPort({
    url: "ws://localhost:8081"
});


// Cette fonction est appelée lorsqu'un message provenant du logiciel vidéo est arrivé
port.on("message", function (oscMessage) {

    switch (oscMessage.address) {
        case "/addMovie":
            // Ajouter 1 film à la playlist. Les films sont envoyés un par un
            // Normalement tout est écrit 
            // console.log("Recu addMovie", oscMessage);
            var movie = createMovie(oscMessage.args);
            listOfMovie.push(movie);
            // console.log(listOfMovie);
            $("#list").append(htmlDivElement(movie));
            // createPlayCallback(movie);

            break;
        case "/playIndex":
            console.log("Recu playIndex", oscMessage);
            // A COMPLETER           
            break;

        case "/playPercentage":
            // A COMPLETER   
            break;

        default:
            break;
    }
});

//NE PAS TOUCHER
port.open();

var createMovie = function (args) {

    var movie = {
        index: args[1],
        name: args[0],
    };

    return movie;

};

//NE PAS TOUCHER - permet d'envoyer un message au logiciel vidéo
var sendOscMessage = function (oscAddress, arg) {
    port.send({
        address: oscAddress,
        args: [arg]
    });

    console.log("message OSC envoyé");
};


$(document).ready(function () {
    
    sendOscMessage("/player/refreshPlaylist", 1);
    $(document).on('click', '#refresh', function () {
        $('#list').html('');
        $('.refresh').html('');
        refreshPlaylist();
        $('.refresh').append('\
                  <a id="refresh" class="btn-floating btn-large waves-effect waves-purple red">\
                    <i class="material-icons tilt">refresh</i>\
                  </a>').hide().delay(800).fadeIn(1000);


    });

    $(document).on('click', '#playTest', function () {
        console.log('playTest');
        sendOscMessage("/player/playIndex", 3)
        
    });

});


// write the HTML of the list
function htmlDivElement(movie) {
    $("#list").append('\
      <div class="divFilm row z-depth-2 grow">\
        <div class="divIndex col s1">'+ (movie.index) + '</div>\
        <div class="divTitle col s10 ">'+ movie.name + '</div>\
        <div class=" col s1">\
          <button  id="'+ (movie.index) + '" class="playButton btn waves-effect waves-purple red" type="submit" name="action">\
            <i id="'+ (movie.index) + 'play"class="play material-icons play">play_arrow</i>\
            <i id="'+ (movie.index) + 'pause"class="pause material-icons play">pause</i>\
          </button>\
        </div>\
      </div>').hide().fadeIn(400);
    $('.pause').hide();
}

function createPlayCallback(movie) {

    // La fonction callback doit désormais envoyé un message au lecteur vidéo
    // La fonction suivante permet de réaliser l'envoi du message.  
    sendOscMessage("/player/playIndex", movie.index);

}

function refreshPlaylist() {
    console.log("Refresh playlist");
    sendOscMessage("/player/refreshPlaylist", 1);
}



/***************/
/** FONCTIONS **/
/***************/

// // show the list of movies
// function showList() {
//     $('#list').html('');
//     listOfMovie = [];
//     var list = [];
//     $.get("playlist.txt", function (data) {
//         list = splitFile(data);
//         for (i = 0; i < list.length; i++) {
//             var movie = createMovie(list[i][0], list[i][1], list[i][2]);
//             addMovie(movie);
//         }
//         htmlDivElement(listOfMovie);
//     });

//     $('.divFilm').click(function () {
//         console.log(listOfMovie);
//     });
// }


// // refresh button
// function refresh() {
//     $(document).on('click', '#refresh', function () {
//         $('.refresh').html('');
//         showList();
//         $('.refresh').append('\
//           <a id="refresh" class="btn-floating btn-large waves-effect waves-purple red">\
//             <i class="material-icons tilt">refresh</i>\
//           </a>').hide().delay(800).fadeIn(1000);
//     });
// }

// // Split the txt file in an array and splits each array's line
// function splitFile(data) {
//     data = data.split('\n');
//     $.each(data, function (key, value) {
//         data[key] = value.split(',');
//     });
//     return data;
// }

// function createMovie(i, n, d) {

//     var movie = {
//         index: i,
//         name: n,
//         duration: d,
//     };
//     return movie;
// }

// function addMovie(m) {
//     listOfMovie.push(m);
// }

// function createPlayCallback(movie) {
//     console.log(movie);
// }


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



// $(document).ready(function () {

//     showList();
//     refresh();
//     $(document).on('click', '#refresh', function (){
//         console.log("nique");
//     })

//     // play buttons
//     $(document).on('click', '.playButton', function () {
//         // check the ID
//         var id = $(this).attr('id');

//         // Play/Pause icon display
//         if ($('#' + id + 'play').is(':hidden')) {
//             showPlay(id);
//         }
//         else {
//             showPause(id);
//         }
//         // Get the movie id
//         listOfMovie.forEach(function (value, index) {
//             if (value.index == id) {
//                 movie = value;
//             }
//         });
//         createPlayCallback(movie);
//     });

// });






