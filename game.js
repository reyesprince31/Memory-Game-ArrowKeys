let arrowButtons = ["arrow-up", "arrow-left", "arrow-down",  "arrow-right"];
let arrowIcons = ["▲","◀","▼","▶"];
let gamePattern = [];
let gameIconPattern = [];
let userClickedPattern = [];
let gameStart = false;
let level = 0;

// Start the game using any keypress
$(document).ready(function() {
    $(document).keypress(function(){
        if (!gameStart){
            $('#level-title').text(`Level ${level}`);
            nextSequence();
            
            $('.arrow-keys').prop('disabled', false);
        }
    
    })

    //click arrow
    $(".btn").click(function(){
        handleButtonClick($(this).attr('id'));
    });
    //key pressed
    $(document).keydown(function(event) {
        if ($('.btn').is(':disabled')) {
            return;
        }

        if (event.keyCode === 38) {
            handleButtonClick('arrow-up');
        } else if (event.keyCode === 37) {
            handleButtonClick('arrow-left');
        } else if (event.keyCode === 40) {
            handleButtonClick('arrow-down');
        } else if (event.keyCode === 39) {
            handleButtonClick('arrow-right');
        }
    });
});

function handleButtonClick(userChosenArrow) {
    userClickedPattern.push(userChosenArrow);
    playSound(userChosenArrow);
    animatePress(userChosenArrow);
    checkAnswer(userClickedPattern.length - 1);
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $('#level-title').text(`Level ${level}`);

    const randomNumber = Math.floor(Math.random()* 4);

    let randomChosenArrow = arrowButtons[randomNumber];
    gamePattern.push(randomChosenArrow);

    // added gamearrow
    gameIconPattern.push(`<button class="btn game-arrow">${arrowIcons[randomNumber]}</button>`);
    
    if($('.game-arrow').length > 0){
        $('.game-arrow').remove();
    }
    
    for (let i = 0; i < gameIconPattern.length; i++){
        $("#play-area").append(gameIconPattern[i]);
    }

    // hide game-arrow
    setTimeout(function(){
        $('.game-arrow').animate({opacity: 0});
    },1000);

    //gamesound
    playSound(randomChosenArrow);

    //animation
    $(`.game-arrow`).fadeOut(100).fadeIn(100);
    $('.arrow-keys').prop('disabled', true);
    setTimeout(function(){
        $('.arrow-keys').prop('disabled', false);
    },1000)
   
}

function playSound(name){
    let audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentArrow){
    $(`#${currentArrow}`).addClass("pressed");

    setTimeout(function(){
        $(`#${currentArrow}`).removeClass("pressed");
    },100);   
}

function checkAnswer(currentLevel){

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        
        $('.game-arrow').eq(userClickedPattern.length-1).removeAttr('style');
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else {
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $('#level-title').text(`Game Over, Press Any Key to Restart`);
        startOver();
        console.log("wrong");
        $('.game-arrow').animate({opacity: 1});
        $('.arrow-keys').prop('disabled', true);
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameIconPattern = [];
    gameStart = false;
}