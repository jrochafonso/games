const cells = $(".cell");
const board = $(".board");
const winMessage = $(".winning-message-text");
const winDisplay = $(".winning-message");
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

const endGame = (isDraw) => {
    if (isDraw){
        winMessage.innerText = "empate!";
    } else {
        winMessage.innerText = is_o ? "o venceu!" : "x venceu!";
    }
    winDisplay.addClass('show-winning-message'); //jq
};

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
            console.log(`player ${class2Add} wins!`);
            return class2Add;
        }
    }
};

const check4Draw = () => {
    //     if (cells.x.length + cells.o.length === 9) {
    if (cells.x.length === 4) {
        return true;
    }
};

const placeXO = (cell, class2Add) => { // adicionar x ou o
    if(!(cell.classList.contains('o' && 'x'))){ // checks if cell is used
        cell.classList.add(class2Add); //js
    }
};

const swapUP = () => {
    is_o = !is_o;

    board.removeClass("o"); //jq
    board.removeClass("x"); //jq

    if(is_o === true){
        board.addClass('o'); //jq
    } else {
        board.addClass('x'); //jq
    }
};

const handleClick = (e) => {    // recebe elemento da cell
    const cell = e.target; //js
    const class2Add = is_o ? 'o' : 'x'; // mudar o símbolo
    placeXO(cell, class2Add);

    const isWin = check4Win(class2Add)
    const isDraw = check4Draw();

    if (isWin) {
        console.log("ganhou");
        endGame(false);
    } else if (isDraw) {
        console.log("empate");
        endGame(true);
    } else {
        swapUP();
    }

    //endGame(false);
    swapUP();
};

startGame();



/*
const check4Win = (currentPlayer) => {
    return winComb.$(winComb).val(comb => {
        return comb.every

    })
}
*/


// placeXO: done w/check
// winComb
// checkWin
// checkTie
// swapUP: done




//({once: true});