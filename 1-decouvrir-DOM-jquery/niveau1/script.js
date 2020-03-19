var list = [];

$(document).ready(function () {

 

    $.get("playlist.txt", function (data) {
        
        splitFile(data);
        htmlDivElement();
        
    }, "text");

});

    function htmlDivElement(){
        for (i = 0; i < list.length; i++) {
            $("#list > ul").append('<li class="film">' + list[i] + '</li></div>');
        }
    }

    function splitFile(a){
        list = a.split("\n");
    }


    //$.get(URL,data,function(data,status,xhr),dataType)


    // $("#list > span > button").last().click(function () {
    //     console.log("OKEY!");
    // });
    // console.log("ready!");

    // $("button").click(function () {
    //     $("button").css("background-color", "red");
    //     $("button").html("youpi");




