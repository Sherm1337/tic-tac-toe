const gameModule =  {
    createGameBoard: (function() {
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
                    if(newTile.textContent == ""){
                    newTile.textContent = gameOperations.player1.marker;
                    newTile.id = newTile.getAttribute("id");
                    gameOperations.player1.tilesPlayed.push(parseInt(newTile.id));
                    gameOperations.roundCount++;
                    if (gameOperations.roundCount < 5){
                        gameOperations.gameOver();
                        computerTurn();
                    } else if (gameOperations.roundCount == 5){
                        gameOperations.gameOver();
                    }
                }});
                computerTurn = function() {
                    let computerChoice = Math.trunc(Math.random()*9) + 1;

                    tileChoice = document.getElementById(`${computerChoice}`);
                    if(tileChoice.textContent === gameOperations.player1.marker ||
                        tileChoice.textContent === gameOperations.computer.marker){
                            computerChoice = Math.trunc(Math.random()*9) + 1;
                            computerTurn();
                    } else if (tileChoice.textContent === ""){
                    gameOperations.computer.tilesPlayed.push(computerChoice);
                    tileChoice.textContent = gameOperations.computer.marker;
                    gameOperations.gameOver();
                    }
                }
            }
        })();
    })(),

    winningCombos: [123, 456, 789, 147, 258, 369, 159, 357],

    Player: function(name, marker) {
        this.name = name;
        this.marker = marker;
        this.tilesPlayed = [];
    },
}


const gameOperations = {
    roundCount: 0,
    
    player1: new gameModule.Player("player1", "X"),
    

    computer: new gameModule.Player("computer", "O"),

    gameOver: function() {
        this.player1.tilesPlayed.sort();
        playerTilesPlayedString = this.player1.tilesPlayed.join("");
        console.log(playerTilesPlayedString);
        
        this.computer.tilesPlayed.sort();
        computerTilesPlayedString = this.computer.tilesPlayed.join("");

        function clearTilesPlayed() {
            gameOperations.player1.tilesPlayed = [];
            gameOperations.computer.tilesPlayed = [];
        }

        const gameTiles = document.querySelectorAll(".gameTile")
        const regex = /(1.*2.*3|4.*5.*6|7.*8.*9|1.*4.*7|2.*5.*8|3.*6.*9|1.*5.*9|3.*5.*7)/;
        const playerMatches = playerTilesPlayedString.match(regex);
        const computerMatches = computerTilesPlayedString.match(regex);
        if (playerMatches) {
            alert(this.player1.name + " is the winner!");
            gameTiles.forEach((tile) => {
                tile.textContent = "";
            })
            clearTilesPlayed();
        } else if (computerMatches) {
            alert(this.computer.name + " is the winner!")
            gameTiles.forEach((tile) => {
                tile.textContent = "";
            })
            clearTilesPlayed();
        }
    },
};