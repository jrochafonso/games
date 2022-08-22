//###               PANTRY               ###//

const cells = $(".cell");
const board = $(".board");
const startDisplay = $(".get-players-name");
const startButton = $("#start-button");
const xoPlayers = $(".xoPlayers");
const winMessage = $(".winning-message-text");
const winDisplay = $(".winning-message");
const restartButton = $("#restart-button");
const menuButton = $("#back-to-menu");

let restartSwap;
let winner;

let player1val;
let player2val;
let is_o = true; // before: let is_o;

//##               TIMER (startTimer()) VARs               ##// l.383

let timer;
let setTime;
let m = '00';
let s = '00';

//##              midScreen() VAR              ##//

let animeDelay;

//##              SCORE (scoresCount()) VARs              ##//

let score1UP = 0;
let score2UP = 0;
let draw = 0;
let gameCount = 1;
const player1Score = $("#player1-score");
const player2Score = $("#player2-score");
const roundScore = $("#game-count");

player1Score.text("", score1UP);
player2Score.text("", score2UP);
roundScore.text("", gameCount);

//###                           DATE                           ###//

//##              ft to convert DATE FORMAT:              ##//

function dateFormat(date) {
    let x = new Date(date),
        year = x.getFullYear(),
        month = '' + (x.getMonth() + 1),
        day = '' + x.getDate();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('/');
}

//##              ft to convert TIME FORMAT:              ##//

function timeFormat(time) {
    let y = new Date(time),
        hour = y.getHours(),
        min = '' + y.getMinutes(),
        sec = '' + y.getSeconds();

    if (min.length < 2)
        min = '0' + min;
    if (sec.length < 2)
        sec = '0' + sec;

    return [hour, min, sec].join(':');
}

//###          WINNING MOVES COMBINATION LIST (OF ARRAYS, since we're using arrays)          ###//

const winComb = [
    [0, 1, 2],          // <- ROWS
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],          // <- COLUMNS
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],          // <- DIAGONALS
    [2, 4, 6]
];

//###          CREATING SCORES HISTORY (using localStorage, *in case it doesn't exist already*)          ###//

let loadCache = localStorage.getItem('scores'); // <- pull from localStorage
let scores = JSON.parse(loadCache);                 //     in the form of object;
if(!scores) { // <- *in case it doesn't exist already*
    scores = [];  // <- we create;
}
console.log(scores);

//###                           to UPDATE CACHE                           ###//

const updateCache = () => {
    if(player1val !== 'x' && player2val !== 'o'){  //<- updates object only if player is named
        scores.push({
            game: 'jogo do galo',
            p1: player1val,
            p2: player2val,
            winner: winner,
            time: `${m}:${s}`,
            timestamp: dateFormat(Date.now())+ " " + timeFormat(Date.now())
        })
        localStorage.setItem("scores", JSON.stringify(scores)); // <- stringify to localStorage
    }
    console.log(scores);
}

//###                 to VERIFY if PLAYERS enter their NAMES                 ###//

const verifyNames = () => {
    let get1UP = $("#player1_input");
    let get2UP = $("#player2_input");
    console.log("console.log(get1UP):", get1UP);
    console.log("console.log(get2UP):", get2UP);
    if(!get1UP[0].checkValidity() && !get2UP[0].checkValidity()){
        player1val = 'o';
        player2val = 'x';
        console.log("verifyNames() says: inputs are empty, proceeding with generic 'o' & 'x'");
    } else if(!get1UP[0].checkValidity()){
        get1UP.addClass("p1-error");
        console.log("verifyNames() says: missing 1UP input");
        return false;
    } else if(!get2UP[0].checkValidity()){
        get2UP.addClass("p2-error");
        console.log("verifyNames() says: missing 2UP input");
        return false;
    } else {
        player1val = get1UP.val();
        player2val = get2UP.val();
        console.log("verifyNames() says: getting players ID...");
    }
    console.log("verifyNames() says: inputs successfully filled");
    return true;
}

const verifyToll = () => {
    if(!verifyNames()){
        console.log("console.log(verifyToll): ", verifyToll);
    } else {
        midScreen();
    }
}

//###                 START MENU                 ###//

const startMenu = () => {
    board.hide();
    cells.hide();
    xoPlayers.hide();
    $(startButton).on("click", verifyToll); // <- collecting player names (it exist)
    console.log("passed through startButton.on('click', verifyToll)");
    //$(startButton).on("click", startGame); //jq
    //$(startButton).on("click", midScreen); //jq
}

//###                 ft to COUNT SCORES                 ###//

const scoresCount = () => {
    console.log("counting scores...");
    if(winner === player1val && score1UP < 3){
        console.log("scoresCount(): player 1 wins; ", score2UP);
        score1UP++;
        gameCount++;
    } else if(winner === player2val && score2UP < 3){
        console.log("scoresCount(): player 2 wins; ", score2UP);
        score2UP++;
        gameCount++;
    } else if((check4Draw()) && ((score1UP < 5) || (score2UP < 5))){
        console.log("scoresCount(): it's a draw; ", draw);
        draw++;
        gameCount++;
    } else if(gameCount === 5 || (score1UP + score2UP + draw) === 5){
        console.log("counted scores. scoresCount() returning: false");
        return false;
    }
    console.log("counted scores. scoresCount() returning: true");
    return true;
}

/* //WORKING ON ANOTHER SOLUTION
const scoresCount = () => {
    console.log("counting scores...");
    if (winner === player1val){
        score1UP++;
        gameCount++;
    } else if(winner === player2val){
        score1UP++;
        gameCount++;
    }
}

const check4Draw = () => {
    if ($(".cell.x").length + $(".cell.o").length === 9) {
        draw++;
        gameCount++;
        return true;
    }
};

function endGame() {
    console.log(gameCount);
    if (gameCount === 5) {
        winner = is_o ? player1val : player2val;
        clearInterval(setTime); // <- time stops in (what?) another reality
        updateCache();
        winDisplay.addClass('show-winning-message');
        restartButton.hide();
        winMessage.text(`${winner} venceu a ronda!`);
        menuButton.text("regressar ao menu");
    } else {
        if (isDraw) {
            winMessage.text("empate!");
            clearInterval(setTime); // <- time stops
        } else {
            winner = is_o ? player1val : player2val;
            scoresCount();
            winMessage.text(`${winner} ganhou!`);
            clearInterval(setTime); // <- time stops in another reality
        }
    }
}
*/

//###                       to SKIP ANIMATION                       ###///

const justLeave = () => {
    $(document).mouseup(function(e) {
        // if the target of the click isn't xoPlayers nor a descendant:
        if (xoPlayers.is(e.target) && xoPlayers.has(e.target).length === 0) {
            setTimeout(function () {
                console.log("[justLeave()]console.log: player skipped animation :(");
                startGame();
            }, 800);
        }
    });
}

//###                       > ANIMATION <                       ###///

const midScreen = () => {
    justLeave();
    console.log("console.log: entrou no midScreen");
    startDisplay.hide();
    startDisplay.removeClass('get-players-name');
    xoPlayers.show();
    let player1named = $("#player1_named")
    let player2named = $("#player2_named")
    if(!$("#player1_input")[0].checkValidity() && !$("#player2_input")[0].checkValidity()){
        player1named.html("jogador 1");
        player2named.html("jogador 2");
    } else {
        player1named.html(player1val + "");
        player2named.html("" + player2val);
    }
    setTimeout(function () {
        player1named.addClass("stopped");
        player2named.addClass("stopped");
    }, 3000);
    animeDelay = setTimeout(function() {
        startGame();
    },4000); //2500

}

//###          STARTS GAME          ###//

const startGame = () => {
    xoPlayers.hide();
    xoPlayers.removeClass('mid_player_container');
    board.show();
    cells.show();

    player1Score.text(player1val + " O : " + score1UP);
    player2Score.text(score2UP + " : X " + player2val);
    roundScore.text("jogo " + gameCount + "/5");

    startTimer();

    //is_o = false;          // DELETED

    cells.removeClass('x'); // DELETED before and put back again while testing bug fix;
    cells.removeClass('o'); // DELETED before and put back again while testing bug fix;

    //board.addClass('x'); // DELETED

    cells.each((e, cell) => {
        $(cell).off("click", handleClick); //jq
    })
    cells.each((e, cell) => {
        $(cell).on("click", handleClick); //jq
    })

    boardClass();

    winDisplay.removeClass('show-winning-message'); // <- hides final winning message Display


}

//###           DEFINES DIFFERENT ENDINGS           ###//

const endGame = (isDraw) => {
    if (isDraw){
        winMessage.text("empate!");
        clearInterval(setTime);           // <- time stops
    } else {
        winner = is_o ? player1val : player2val;
        winMessage.text(`${winner} ganhou!`);
        clearInterval(setTime);                       // <- time stops in another reality
    }
    if(scoresCount(true)){
        winDisplay.addClass('show-winning-message'); // <- displays winning message

    } else {
        //winDisplay.empty();
        clearInterval(setTime);                     // <- time stops in (what?) another reality
        updateCache();
        winDisplay.addClass('show-winning-message');
        restartButton.hide();
        winMessage.text(`${winner} venceu a ronda!`);
        menuButton.text("regressar ao menu");
    }
};

//###          CHECKS FOR (TURN) VICTORY          ###// <- ?

const check4Win = (class2Add) => {
    for (let i = 0; i < winComb.length; i++) {
        const cell1 = cells[winComb[i][0]]
        const cell2 = cells[winComb[i][1]]
        const cell3 = cells[winComb[i][2]]

        if (
            cell1.classList.contains(class2Add) &&
            cell2.classList.contains(class2Add) &&
            cell3.classList.contains(class2Add)
        )
        {
            console.log(`check4Win[console.log]: player ${class2Add} wins!`);
            return class2Add;
        }
    }
};

//###               CHECKS FOR (TURN) DRAW               ###// <- ? nah

const check4Draw = () => {
    if ($(".cell.x").length + $(".cell.o").length === 9) {
        return true;
    }
};

//###                   PLACES 'x' OR 'o' (but only if cell is unused)                   ###//js

const placeXO = (cell, class2Add) => {
    if(!(cell.classList.contains('o' && 'x'))){ // <- ? a mais ???
        cell.classList.add(class2Add);
    }
};

//###               SETS BOARD HOVER CLASS               ###//jquery

const boardClass = () => {
    board.removeClass('o');
    board.removeClass('x');

    if(is_o === true){
        board.addClass('o');
    } else {
        board.addClass('x');
    }
}

//###                  SWAPS PLAYERS TURN (if 'o', 'x's turn)                  ###//

const swapUP = () => {
    is_o = !is_o;
    boardClass();
};

//###                           MAGIC HAPPENS                           ###//

const handleClick = (e) => {               // <- handleClick receives element from cell
    const cell = e.target;                  // <- target cell (js)
    const class2Add = is_o ? 'o' : 'x';      // <- we get to know which class to add and change the symbol accordingly
    placeXO(cell, class2Add);

    const isWin = check4Win(class2Add)          // <- we check for VICTORY accordingly to class
    const isDraw = check4Draw();                 // <- we also check for DRAW

    //###                DO WE HAVE A WINNER?                ###//

    if (isWin) {
        endGame(false);         // <- if we have a VICTORY, we feed "false" to endGame()
        console.log(`isWin[console.log]: jogador ${class2Add} ganhou!`);
    } else if (isDraw) {
        endGame(true);           // <- if we have a DRAW, we feed "true" to endGame()
        console.log("isWin[console.log]: empate!");
    } else {
        swapUP();                        // <- otherwise, we SWAP players turn with swapUP()
        console.log("isWin[console.log]:swapping player");
    }
};

//###                       IT ALL STARTS HERE                       ###//

startMenu();

restartSwap = () => {              //             <-   restartSwap() STARTS startGame() (and swapUP())
    startGame();
    swapUP(); // <- ?
}
//                          ^
restartButton.on("click", restartSwap); // <- this button calls restartSwap()

//###               TIMER                ###//

function startTimer() {
    timer = $('#timer');
    timer.text(`${m} : ${s}`);
    setTime = setInterval(function() {
        s++;
        if (s < 10) {
            s = '0' + s;
        } else if (s === 60) {
            s = '00'
            m++;
            if (m < 10) {
                m = '0' + m;
            }
        }
        timer.text(`${m} : ${s}`);
    }, 1000);
}

/* THINGS TO DO:

- fix BUG while clicking same cells
#there's another new 'bug' to fix, happens 1 or 2s after the game starts and resets board,
 probably has to do with timeout bad sync:
 only stressed players (and/or impatient testers) will notice. sorry.

- add ESC key to quit game while running, back to main menu

(DONE) skip animation (w/ players name) with mouse click (and a little timeout) (DONE) yay!

*

would this fix BUG (?):

const cellElements = document.querySelectorAll("[data-cell]");

    for (const cell of cellElements){
        cells.addEventListener("click", handleClick, {once : true}); <--
    }

ps: also, randomize players attribution to cell/class ('o' or 'x') would be a good combo!

João Afonso

*/