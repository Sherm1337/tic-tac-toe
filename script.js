let multiplayer = false;

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
    this.tilesPlayed = [];
}

const gameRenderModule =  {
    selectGameType: (function() {
        const mainContainer = document.querySelector(".main-container");

        const startGameDialog = document.querySelector(".start-game");

        const multiplayerButton = document.querySelector(".multiplayer");

        multiplayerButton.addEventListener("click", () => {
            mainContainer.removeChild(startGameDialog);
            multiplayer = true;
        });

        const computerButton = document.querySelector(".computer");
        
        computerButton.addEventListener("click", () => {
            mainContainer.removeChild(startGameDialog);
            multiplayer = false;
        });
    })(),

    createGameBoard: (function() {

        const mainContainer = document.querySelector(".main-container");

        (function createGameBoardContainer() {
            const gameBoard = document.createElement("div");
            gameBoard.classList.add("gameboard");
            mainContainer.appendChild(gameBoard);

            for (let i = 1; i < 10; i++) {
                const newTile = document.createElement("div");
                newTile.classList.add("gameTile");
                newTile.setAttribute("id", `${i}`);
                gameBoard.appendChild(newTile);

                newTile.addEventListener("click", () => {
                    if (newTile.textContent == ""){
                        newTile.textContent = gameStats.currentPlayer.marker;
                        newTile.id = newTile.getAttribute("id");
                        gameStats.currentPlayer.tilesPlayed.push(parseInt(newTile.id));
                        gameStats.roundCount++;

                        if (multiplayer == true){
                            if (gameStats.currentPlayer === gameStats.player1) {
                                gameStats.currentPlayer = gameStats.player2;
                            } else if (gameStats.currentPlayer === gameStats.player2) {
                                gameStats.currentPlayer = gameStats.player1
                            }
                        }
                        
                        if (gameStats.roundCount < 9){
                            checkForWinner();
                            if (multiplayer == false){
                            computerTurn();
                            }
                        } else if (gameStats.roundCount == 9){
                            checkForWinner();
                        }
                    }
                });
                function computerTurn() {
                    let computerChoice = Math.trunc(Math.random()*9) + 1;
                    let tileChoice = document.getElementById(`${computerChoice}`);
                    if (tileChoice.textContent === gameStats.player1.marker ||
                        tileChoice.textContent === gameStats.computer.marker){
                            computerTurn();
                    } else if (tileChoice.textContent === ""){
                    gameStats.computer.tilesPlayed.push(computerChoice);
                    tileChoice.textContent = gameStats.computer.marker;
                    gameStats.roundCount++;
                    checkForWinner();
                    }
                };
            }
        })();
    })(),
}

const gameStats = (function() {    
    const player1 = new Player("player1", "X");

    let computer = new Player("computer", "O");

    let player2 = new Player("player2", "O");

    let roundCount = 0;

    let currentPlayer = player1;

    return {
        player1,
        player2,
        computer,
        roundCount,
        currentPlayer,
    }
})();

function checkForWinner() {

        const mainContainer = document.querySelector(".main-container");

        function showNewGameDialog(winner) {
            const newDialog = document.createElement("dialog");
            newDialog.classList.add("new-game");
            mainContainer.appendChild(newDialog);

            const winnerPara = document.createElement("p");
            if (winner !== ""){
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

        gameStats.player1.tilesPlayed.sort();
        player1TilesPlayedString = gameStats.player1.tilesPlayed.join("");

        gameStats.computer.tilesPlayed.sort();
        computerTilesPlayedString = gameStats.computer.tilesPlayed.join("");

        gameStats.player2.tilesPlayed.sort();
        player2TilesPlayedString = gameStats.player2.tilesPlayed.join("");

        const checkWinnerRegex = /(1.*2.*3|4.*5.*6|7.*8.*9|1.*4.*7|2.*5.*8|3.*6.*9|1.*5.*9|3.*5.*7)/;
        const player1Matches = player1TilesPlayedString.match(checkWinnerRegex);
        const computerMatches = computerTilesPlayedString.match(checkWinnerRegex);
        const player2Matches = player2TilesPlayedString.match(checkWinnerRegex);

        function clearPlayerTilesPlayed() {
            gameStats.player1.tilesPlayed = [];
            gameStats.computer.tilesPlayed = [];
            gameStats.player2.tilesPlayed = [];
        };

        const gameTiles = document.querySelectorAll(".gameTile");
        const clearTiles = function clear() {
            gameTiles.forEach((tile) => {
            tile.textContent = "";
            gameStats.roundCount = 0;
        });
    };

    function clearGameBoard() {
        clearTiles();
        clearPlayerTilesPlayed();
    }

        if (player1Matches) {
            showNewGameDialog("Player1");
            clearGameBoard();
        } else if (computerMatches) {
            showNewGameDialog("Computer");
            clearGameBoard();
        } else if (player2Matches) {
            showNewGameDialog("Player2");
            clearGameBoard();
        } else if (gameStats.roundCount == 9) {
            showNewGameDialog("");
            clearGameBoard();
        }
};