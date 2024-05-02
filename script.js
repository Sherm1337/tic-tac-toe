const gameModule =  {
    createGameBoard: function() {
        const mainContainer = document.querySelector(".main-container");
        (function createGameBoardContainer() {
            const gameBoard = document.createElement("div");
            gameBoard.classList.add("gameboard");
            mainContainer.appendChild(gameBoard);
            for(let i = 1; i < 10; i++) {
                const newTile = document.createElement("div");
                newTile.classList.add("gameTile");
                newTile.setAttribute("id", `${i}`);
                gameBoard.appendChild(newTile);
                //Mark Tile & Push to player.tilesPlayed event listener below
                newTile.addEventListener("click", () => {
                        newTile.textContent = gameModule.player.marker;
                        newTile.id = newTile.getAttribute("id");
                        gameModule.player.tilesPlayed.push(parseInt(newTile.id));
                })
            }
        })();
    },

    winningCombos: [123, 456, 789, 147, 258, 369, 159, 357],

    player: {
        name: "Player1",
        marker: "X",
        tilesPlayed: [],
    },

}

const gameOperations = {
    markTile: function(tileNum) {
        gameModule.player.tilesPlayed.push(tileNum);
    },
    gameover: function() {
        gameModule.player.tilesPlayed.sort();
        tilesPlayedString = gameModule.player.tilesPlayed.join("");
        
        gameModule.winningCombos.forEach((wincombo) => {
            if (tilesPlayedString.includes(wincombo)) {
                alert(gameModule.player.name + "is the winner!")

            }
    })},
    computerTurn: function() {
        let computerChoice = Math.trunc(Math.random()*9) + 1;
        
    }
};