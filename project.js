$("#startScreen").animate({ top: '+=300px' }, 2000);
$("#gameStart").hide();
$("button").click(function (e) {



    //checks if the index is already exists.
    var tableVirtual = [
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
    ];

    
    var snd = new Audio("music/alert.mp3"); // buffers automatically when created
    var theme = new Audio("music/theme.mp3"); // buffers automatically when created
    var fail = new Audio("music/fail.mp3"); // buffers automatically when created

    var rowRandom; //for  calculating  random indexes
    var colRandom;

    var col; //returns and ticks clicked box
    var row;

    //saves the places of boxes
    var listOfBoxes = [];


    //default difficulty
    var difficulty = document.getElementById("userChoice").value;

    var numofclick = 0;

    var gameStatus = true;
    var start = false;



    difficulty = document.getElementById("userChoice").value;

    $('#startScreen').fadeOut('slow').hide();
    $("#gameStart").fadeIn('slow').show();

    theme.play();



    for (var i = 1; i <= difficulty; i++) {
        rowRandom = Math.floor((Math.random() * 5) + 0);
        colRandom = Math.floor((Math.random() * 5) + 0);

        while (tableVirtual[rowRandom][colRandom] == false) {
            rowRandom = Math.floor((Math.random() * 5) + 0);
            colRandom = Math.floor((Math.random() * 5) + 0);
        }
        $('#' + rowRandom).find('td:eq(' + colRandom + ')').css("background", "#4f5f76");

        tableVirtual[rowRandom][colRandom] = false;
        listOfBoxes.push([rowRandom, colRandom]);
    }


    var count = 1;

    var looper = setInterval(function () {

        $('#' + listOfBoxes[count - 1][0]).find('td:eq(' + listOfBoxes[count - 1][1] + ')').find("p").append(count).hide().fadeIn('slow').delay(300).fadeOut('slow');

        if (count >= difficulty) {
            start = true;
            clearInterval(looper);


        }
        count++;
    }, 1000);




    $("tr td").click(function (e) {
        if (start == true) {
            col = Number($(this).parent().attr('id'));
            row = $(this).index();
            if (gameStatus == true && tableVirtual[col][row] == false) {
                var arr = [col, row];

                var is_same = (arr.length == listOfBoxes[numofclick].length) && arr.every(function (element, index) {
                    return element === listOfBoxes[numofclick][index];
                });

                if (is_same) {
                    $(this).css("background", "url(img/wolf.png) no-repeat center center");
                    numofclick++;
                    snd.play();

                    if (numofclick >= difficulty) {
                        gameStatus = false;
                        $('#status').html('WON').css("color", "green");
                        $('#status2').html('You won the level ' + (numofclick));
                        $('#status3').html('Press F5 Restart');
                    }
                }
                else {

                    $(this).css("background", "url(img/fail.jpg) no-repeat center center");
                    gameStatus = false;
                    fail.play();
                    theme.pause();

                    $('#status').html('Failed').css("color", "red");
                    $('#status2').html('You failed in level ' + (numofclick + 1));
                    $('#status3').html('Press F5 Restart');

                }
            }
        }

    });

});
