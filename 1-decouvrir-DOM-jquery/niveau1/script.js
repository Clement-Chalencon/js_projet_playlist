$(document).ready(function () {
    
    $("#list > ul").css("background-color","red")
    $.get("playlist.txt", function (data) {
        salut = data.split("\n");
        console.log(salut);
        for (i = 0; i < salut.length; i++) {
            $('<li>#list > ul</li>').insertAfter($('li:nth-child(2)'+salut[i]));
            //$("#list > ul").html(salut[i]);
        }

    }, "text");





    //$.get(URL,data,function(data,status,xhr),dataType)


    // $("#list > span > button").last().click(function () {
    //     console.log("OKEY!");
    // });
    // console.log("ready!");

    // $("button").click(function () {
    //     $("button").css("background-color", "red");
    //     $("button").html("youpi");



});
