const cells = $(".cell");
const board = $(".board");
const winMessage = $("winning-message");
let is_o;

const winComb = [   // lista de arrays (estamos a trabalhar com arrays);
    [0, 1, 2],  //rows
    [3, 5, 6],
    [6, 7, 8],
    [0, 3, 6],  //columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],  //diag
    [2, 4, 6]
];

const startGame = () => {

    cells.each((e, cell) => {
        $(cell).on("click", handleClick); //jq
    })
    is_o = false;

    board.addClass('x'); //jq
}
/*
const endGame = () => {
    if (isDraw){
        winMessage = "empate!";
    } else {
        winMessage = "winner!";
    }
    winMessage.addClass('show-winning-message'); //jq

}*/

//se houver checkwin acabo o jogo
//senão troco jogador

const check4Win = () => {
    for (let i = 0; i < winComb.length; i++) {
        const cell1 = cells[winComb[i][0]]
        const cell2 = cells[winComb[i][1]]
        const cell3 = cells[winComb[i][2]]

        // check x
        if (
            cell1.classList.contains('x') &&
            cell2.classList.contains('x') &&
            cell3.classList.contains('x')
        )
        {
            console.log("x wins");
        }
        // check o
        if (
            cell1.classList.contains('o') &&
            cell2.classList.contains('o') &&
            cell3.classList.contains('o')
        )
        {
            console.log("o wins");
        }
    }
}

/*
const check4Win = (currentPlayer) => {
    return winComb.$(winComb).val(comb => {
        return comb.every

    })
}
*/

const placeXO = (cell, class2Add) => { // adicionar x ou o
    if(!(cell.classList.contains('o' && 'x'))){ // checks if cell is used
        cell.classList.add(class2Add); //js
    }
}

const swapUP = () => {
    is_o = !is_o;

    board.removeClass("o"); //jq
    board.removeClass("x"); //jq

    if(is_o === true){
        board.addClass('o'); //jq
    } else {
        board.addClass('x'); //jq
    }
}

const handleClick = (e) => {    // recebe elemento da cell
    const cell = e.target; //js
    const class2Add = is_o ? 'o' : 'x'; // mudar o símbolo
    placeXO(cell, class2Add);
    check4Win();
    swapUP();
}

startGame();





// placeXO: done w/check
// winComb
// checkWin
// checkTie
// swapUP: done




//({once: true});