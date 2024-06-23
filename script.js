const playerVsPlayerButton = document.getElementById('player-vs-player-button');
const playerVsMachineButton = document.getElementById('player-vs-machine-button');
const selectPlayerModeSection = document.querySelector('.select-player-mode');
const playerVsPlayerSection = document.getElementById('player-vs-player');
const playerVsMachineSection = document.getElementById('player-vs-machine');
const attemptsInput = document.getElementById('attempts-input');

const rockPlayer1 = document.getElementById('rock-p1');
const paperPlayer1 = document.getElementById('paper-p1');
const scissorPlayer1 = document.getElementById('scissor-p1');

const rockPlayer2 = document.getElementById('rock-p2');
const paperPlayer2 = document.getElementById('paper-p2');
const scissorPlayer2 = document.getElementById('scissor-p2');

let attempts = 0;
let currentAttempt = 1;
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let player1Choice = '';
let player2Choice = '';
let isPlayer1Turn = true;

playerVsMachineButton.addEventListener('click', function() {
    attempts = parseInt(attemptsInput.value);
    selectPlayerModeSection.style.display = 'none';
    playerVsMachineSection.style.display = 'block';
    startPlayerVsMachineGame();
});

function startPlayerVsMachineGame() {
    resetGame();
    // Agregar listeners a los botones del jugador
    document.getElementById('rock').addEventListener('click', () => playRoundPvM('rock'));
    document.getElementById('paper').addEventListener('click', () => playRoundPvM('paper'));
    document.getElementById('scissor').addEventListener('click', () => playRoundPvM('scissor'));
}

function updateMachineImage(choice) {
    const imageElement = document.getElementById('machine-image');
    imageElement.src = `./assets/${choice}.png`;
    imageElement.alt = `Machine chose ${choice}`;
}

function playRoundPvM(choice) {
    playerChoice = choice;
    machineChoice = getRandomChoice();
    
    // Actualizar ambas imágenes después de que el jugador y la máquina hayan elegido
    setTimeout(() => {
        updatePlayerImage('player', playerChoice);
        updatePlayerImage('machine', machineChoice);
        
        // Retraso adicional antes de evaluar y mostrar el resultado
        setTimeout(() => {
            let result = getResultPvM(playerChoice, machineChoice);
            if (result === 'player') {
                scorePlayer1++;
            } else if (result === 'machine') {
                scoreMachine++;
            }
            updateScorePvM();
            showMessagePvM(result, playerChoice, machineChoice);
            
            if (currentAttempt === attempts) {
                endGamePvM();
            } else {
                currentAttempt++;
                // Resetear las imágenes a rock después de un breve retraso
                setTimeout(() => {
                    updatePlayerImage('player', 'rock');
                    updatePlayerImage('machine', 'rock');
                }, 1000);
            }
        }, 1000);
    }, 1000);
}

function getRandomChoice() {
    let choices = ['rock', 'paper', 'scissor'];
    let randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getResultPvM(choicePlayer, choiceMachine) {
    if (choicePlayer === choiceMachine) return 'tie';
    if (
        (choicePlayer === 'rock' && choiceMachine === 'scissor') ||
        (choicePlayer === 'paper' && choiceMachine === 'rock') ||
        (choicePlayer === 'scissor' && choiceMachine === 'paper')
    ) {
        return 'player';
    }
    return 'machine';
}

function updateScorePvM() {
    document.getElementById('player-score').textContent = `Player: ${scorePlayer1}`;
    document.getElementById('machine-score').textContent = `Machine: ${scoreMachine}`;
}

function updatePlayerImage(player, choice) {
    const imageElement = player === 'player' ? 
        document.querySelector('#player-vs-machine .video-game-container div:first-child img') :
        document.querySelector('#player-vs-machine .video-game-container div:last-child img');
    
    if (imageElement) {
        imageElement.src = choice === 'default' ? './assets/default.png' : `./assets/${choice}.png`;
        imageElement.alt = choice === 'default' ? 'Waiting for choice' : `${player} chose ${choice}`;
    } else {
        console.error(`Image element for ${player} not found`);
    }
}

function showMessagePvM(result, choicePlayer1, choiceMachine) {
    let message = '';
    if (result === 'player') {
        message = `Player wins: ${choicePlayer1} beats ${choiceMachine}`;
    } else if (result === 'machine') {
        message = `Machine wins: ${choiceMachine} beats ${choicePlayer1}`;
    } else {
        message = `It's a tie: Both chose ${choicePlayer1}`;
    }
    alert(message);
}

function endGamePvM() {
    let finalMessage = '';
    if (scorePlayer1 > scoreMachine) {
        finalMessage = 'Player wins the game!';
    } else if (scoreMachine > scorePlayer1) {
        finalMessage = 'Machine wins the game!';
    } else {
        finalMessage = 'It\'s a tie game!';
    }
    alert(finalMessage);
    returnToMainScreen();
}

playerVsPlayerButton.addEventListener('click', function() {
    attempts = parseInt(attemptsInput.value);
    selectPlayerModeSection.style.display = 'none';
    playerVsPlayerSection.style.display = 'block';
    startPlayerVsPlayerGame();
});

// _________________ Player vs Player ______________________
playerVsPlayerButton.addEventListener('click', function() {
    attempts = parseInt(attemptsInput.value);
    if (isNaN(attempts) || attempts <= 0) {
        alert('Por favor, ingresa un número válido de intentos.');
        return;
    }
    selectPlayerModeSection.style.display = 'none';
    playerVsPlayerSection.style.display = 'block';
    startPlayerVsPlayerGame();
});

function startPlayerVsPlayerGame() {
    resetGame();
    enablePlayer1Buttons();
    disablePlayer2Buttons();
}

function resetGame() {
    currentAttempt = 1;
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    scoreMachine = 0;
    player1Choice = '';
    player2Choice = '';
    isPlayer1Turn = true;
    updateScorePvP();
    updateScorePvM();
    updatePlayerImagePvP(1, 'rock');
    updatePlayerImagePvP(2, 'rock');
    updatePlayerImage('player', 'rock');
    updatePlayerImage('machine', 'rock');
}

function updatePlayerImagePvP(player, choice) {
    const imageElement = player === 1 ? 
        document.querySelector('#player-vs-player .video-game-container div:first-child img') :
        document.querySelector('#player-vs-player .video-game-container div:last-child img');
    if (imageElement) {
        imageElement.src = choice === 'default' ? './assets/default.png' : `./assets/${choice}.png`;
        imageElement.alt = choice === 'default' ? 'Waiting for choice' : `Player ${player} chose ${choice}`;
    } else {
        console.error(`Image element for Player ${player} not found`);
    }
}

function updatePlayerImages() {
    updatePlayerImage(1, player1Choice);
    updatePlayerImage(2, player2Choice);
}

function playerChoice(player, choice) {
    if (player === 1 && isPlayer1Turn) {
        player1Choice = choice;
        isPlayer1Turn = false;
        disablePlayer1Buttons();
        enablePlayer2Buttons();
    } else if (player === 2 && !isPlayer1Turn) {
        player2Choice = choice;
        disablePlayer2Buttons();
        // Actualizar ambas imágenes después de que ambos jugadores hayan elegido
        updatePlayerImagePvP(1, player1Choice);
        updatePlayerImagePvP(2, player2Choice);
        setTimeout(evaluateRound, 1000); // Retraso de 1 segundo antes de evaluar la ronda
    }
}

function evaluateRound() {
    const result = getWinner(player1Choice, player2Choice);
    updateScorePvP(result);
    
    // Retraso de 1 segundo antes de mostrar el resultado y reiniciar la ronda
    setTimeout(() => {
        displayRoundResult(result);
        if (currentAttempt >= attempts) {
            endGamePvP();
        } else {
            currentAttempt++;
            resetRound();
        }
    }, 1000);
}

function getWinner(choice1, choice2) {
    if (choice1 === choice2) return 'tie';
    if (
        (choice1 === 'rock' && choice2 === 'scissor') ||
        (choice1 === 'paper' && choice2 === 'rock') ||
        (choice1 === 'scissor' && choice2 === 'paper')
    ) {
        return 'player1';
    }
    return 'player2';
}

function updateScorePvP(result) {
    if (result === 'player1') scorePlayer1++;
    if (result === 'player2') scorePlayer2++;
    document.getElementById('player-1-score').textContent = `Player 1: ${scorePlayer1}`;
    document.getElementById('player-2-score').textContent = `Player 2: ${scorePlayer2}`;
}

function displayRoundResult(result) {
    let message = '';
    if (result === 'tie') {
        message = '¡Empate!';
    } else if (result === 'player1') {
        message = '¡Jugador 1 gana la ronda!';
    } else {
        message = '¡Jugador 2 gana la ronda!';
    }
    alert(message);
}

function endGamePvP() {
    let finalMessage = '';
    if (scorePlayer1 > scorePlayer2) {
        finalMessage = '¡Jugador 1 gana la partida!';
    } else if (scorePlayer2 > scorePlayer1) {
        finalMessage = '¡Jugador 2 gana la partida!';
    } else {
        finalMessage = '¡La partida termina en empate!';
    }
    alert(finalMessage);
    returnToMainScreen();
}

function resetRound() {
    player1Choice = '';
    player2Choice = '';
    isPlayer1Turn = true;
    enablePlayer1Buttons();
    disablePlayer2Buttons();
    // Reset images to rock
    updatePlayerImagePvP(1, 'rock');
    updatePlayerImagePvP(2, 'rock');
}

function enablePlayer1Buttons() {
    rockPlayer1.disabled = false;
    paperPlayer1.disabled = false;
    scissorPlayer1.disabled = false;
}

function disablePlayer1Buttons() {
    rockPlayer1.disabled = true;
    paperPlayer1.disabled = true;
    scissorPlayer1.disabled = true;
}

function enablePlayer2Buttons() {
    rockPlayer2.disabled = false;
    paperPlayer2.disabled = false;
    scissorPlayer2.disabled = false;
}

function disablePlayer2Buttons() {
    rockPlayer2.disabled = true;
    paperPlayer2.disabled = true;
    scissorPlayer2.disabled = true;
}

// Add event listeners for player vs player buttons
rockPlayer1.addEventListener('click', () => playerChoice(1, 'rock'));
paperPlayer1.addEventListener('click', () => playerChoice(1, 'paper'));
scissorPlayer1.addEventListener('click', () => playerChoice(1, 'scissor'));
rockPlayer2.addEventListener('click', () => playerChoice(2, 'rock'));
paperPlayer2.addEventListener('click', () => playerChoice(2, 'paper'));
scissorPlayer2.addEventListener('click', () => playerChoice(2, 'scissor'));

function returnToMainScreen() {
    // Ocultar las secciones de juego
    playerVsPlayerSection.style.display = 'none';
    playerVsMachineSection.style.display = 'none';
    
    // Mostrar la sección de selección de modo
    selectPlayerModeSection.style.display = 'block';
    
    // Resetear el input de intentos
    attemptsInput.value = '';
    
    // Resetear los marcadores y las imágenes
    resetGame();
}
