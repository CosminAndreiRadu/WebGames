var game, level, color = ["red", "blue", "yellow", "green", "purple", "lightgreen", "lightblue", "orange", "brown", "pink"];
var water = [], w = [], currentLevel, clicked = [], transferring = false, t = false, size = 1, sizechange = 0.05, won = false, moves = 0;

var testTubePosition = {
    0: [[-110, 130], [-20, 130], [70, 130], [-65, 320], [15, 320]],
    1: [[-110, 130], [-20, 130], [70, 130], [-110, 130], [-20, 320], [70, 320]],
    2: [[-140, 130], [-60, 130], [20, 130], [100, 130], [-110, 320], [-20, 320], [70,320]],
    3: [[-140, 130], [-60, 130], [20, 130], [100, 130], [-140, 320], [-60, 320], [20, 320], [100,320]],
    7: [[-140, 100], [-60, 100], [20, 100], [100, 100], [-140, 275], [-60, 275], [20, 275], [100, 275], [-140, 450], [-60, 450], [20, 450], [100,450]],

}

window.onload = function(){
    game = document.getElementById("game");
    level = document.getElementById("level");
}

window.OpenLevel = function(x){
    moves = 0;
    currentLevel = x;
    won = false;
    level.style.display = "block";
    level.innerHTML = "";
    water = [];
    let a = [], c = 0;
    for(let i = 0; i<x+3; i++){
      for(let j = 0; j < 4; j++){
          a.push(color[i]);
      }
    }

    a = shuffle(a);
    for(let i = 0 ; i<x+3; i++){
      water[i] = [];
      for(let j = 0; j < 4; j++){
        water[i].push(a[c]);
        c++;
      }
    }

    water.push(["transparent", "transparent", "transparent", "transparent"], ["transparent", "transparent", "transparent", "transparent"]);
    w = water.map((a)=>[...a]);

    //console.log water = 0
    ApplyInfo();

}


function ApplyInfo(a = water){
    if(!won) {
      let d=0, heading = ["LAME", "BEGINNER", "AVERAGE", "ADVANCED","", "", "", "PRO"][currentLevel];
      level.innerHTML = `<div id='lvl-heading'>${heading}</div>`;
      for(let i of testTubePosition[currentLevel]){
        level.innerHTML += `<div class="test-tube" style="top:${i[1]}px; left: calc(50vw + ${i[0]}px); transform: rotate(0deg);" onclick="clicked(${d});">
        <div class="colors" style="background-color:${a[d][0]}; top=100px;"> </div>
        <div class="colors" style="background-color:${a[d][1]}; top=100px;"> </div>
        <div class="colors" style="background-color:${a[d][2]}; top=100px;"> </div>
        <div class="colors" style="background-color:${a[d][3]}; top=100px;"> </div>
        </div>`;

        d++;
      }

      level.innerHTML += `<div id = "restart" class="game-buttons" onclick="Restart();"> Restart </div>
      <div id="home" class="game-buttons" onclick="showMenu();"> </div>
      <div id="moves"> Moves: ${moves} </div>`;

    }
}


window.Clicked = function(x){
    if(!transferring) {
        if(clicked.length == 0) {
          clicked.push(x);
          document.getElementByClassName("test-tube").[x].style.translation = "0.2s linear";
          document.getElementByClassName("test-tube").[x].style.transform = "scale(1.08)";
        }
        else {
          clicked.push(x);
          let el = document.getElementByClassName("test-tube")[clicked[0]];
          el.style.transform = "scale(1) rotate(0deg)";
          if (clicked[0] != clicked[1]){
            el.style.transition = "1s linear";
            moves++;
            document.getElementById("moves").innerHTML = "Moves: "+moves;
            Transfer(...clicked);
          }
          clicked = [];
        }
    }
}
