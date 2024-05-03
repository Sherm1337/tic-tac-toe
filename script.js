const gameModule =  {
    createGameBoard: (function() {
        const mainContainer = document.querySelector(".main-container");
        const startGameDialog = document.querySelector(".start-game");
        const startGameButton = document.querySelector(".start-game-button");
    
        startGameButton.addEventListener("click", () => {
        mainContainer.removeChild(startGameDialog);
        }),
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
                    if (gameOperations.roundCount < 9){
                        gameOperations.gameOver();
                        computerTurn();
                    } else if (gameOperations.roundCount == 9){
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
                    gameOperations.roundCount++;
                    gameOperations.gameOver();
                    
                    }
                }
            }
        })();
    })(),

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
        
        this.computer.tilesPlayed.sort();
        computerTilesPlayedString = this.computer.tilesPlayed.join("");

        function clearPlayerTilesPlayed() {
            gameOperations.player1.tilesPlayed = [];
            gameOperations.computer.tilesPlayed = [];
        }
        const mainContainer = document.querySelector(".main-container");
        function showNewGameDialog(winner) {
            const newDialog = document.createElement("dialog");
            newDialog.classList.add("new-game");
            mainContainer.appendChild(newDialog);

            const winnerPara = document.createElement("p");
            if(winner !== ""){
                winnerPara.textContent = `${winner} is the winner!`;
                newDialog.appendChild(winnerPara);
            } else {
                winnerPara.textContent = "It's a Draw!";
                newDialog.appendChild(winnerPara);
            }

            const newDialogButton = document.createElement("button");
            newDialogButton.classList.add("new-game-button");
            newDialogButton.textContent = "New Game"
            newDialog.appendChild(newDialogButton);

            newDialogButton.addEventListener("click", () => {
                mainContainer.removeChild(newDialog);
            })
        };

        const gameTiles = document.querySelectorAll(".gameTile")
        const regex = /(1.*2.*3|4.*5.*6|7.*8.*9|1.*4.*7|2.*5.*8|3.*6.*9|1.*5.*9|3.*5.*7)/;
        const playerMatches = playerTilesPlayedString.match(regex);
        const computerMatches = computerTilesPlayedString.match(regex);
        if (playerMatches) {
            showNewGameDialog("Player1");
            gameTiles.forEach((tile) => {
                tile.textContent = "";
                this.roundCount = 0;
            })
            clearPlayerTilesPlayed();
        } else if (computerMatches) {
            showNewGameDialog("Computer");
            gameTiles.forEach((tile) => {
                tile.textContent = "";
                this.roundCount = 0;
            })
            clearPlayerTilesPlayed();
        }else if(this.roundCount == 9) {
            showNewGameDialog("");
            gameTiles.forEach((tile) => {
                tile.textContent = "";
                this.roundCount = 0;
            })
            clearPlayerTilesPlayed();
        }
    },
};

