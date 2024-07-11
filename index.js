var buttons = $('div[type="button"]')
// console.log(buttons)
var pattern = [];
var userPattern = [];
var buttonList=["green","blue","red","yellow"];
var gameStart = false;
var level;
// generateRandom();



function generateRandom() {
    var random = buttonList[Math.floor(Math.random()*4)];
    // console.log(random);
    return random;   
}

function generatePattern() {
    var random = generateRandom()
    pattern.push(random);
    var btn = $("#"+random)[0];
    // console.log(btn)
    playSound(btn);
    toggleEffectClass(btn);
    // console.log(pattern)
}

function startOver() {
    gameStart = false;
    userPattern =[];
    pattern = [];
}

function toggleEffectClass(element) {

    element.classList.add("pressed");
  setTimeout(function () {
    element.classList.remove("pressed");
  }, 100);
}

function playSound(element)
{
    var audio = new Audio(`./sounds/${element.id}.mp3`)
    audio.play();
}

function checkAnswer(counter) {
    console.log(pattern,userPattern)
    if (pattern[counter] === userPattern[counter]) {
        if (userPattern.length === pattern.length){
          setTimeout(function () {
            startGame();
          }, 1000);
        }
      } else {
        var audio = new Audio(`./sounds/wrong.mp3`)
        audio.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
}

$('div[type="button"]').click((e)=>{
    var btn = e.target;
    userPattern.push(btn.id);
    // console.log(userPattern)
    playSound(btn);
    toggleEffectClass(btn);
    checkAnswer(userPattern.length-1)
    // console.log(btn.id)
})


if(gameStart===false)
    {
    $("body").keypress(()=>{
        gameStart = true;
        level = 0;
        startGame();
    })
}


function startGame() {
    if(gameStart)
    {
        level++;
        $("#level-title").text(`Level: ${level}`);
        generatePattern();
        userPattern=[];
    }

}