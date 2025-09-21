let tries = 5;
let message = "Guess a letter to start!";
let guessedLetters = "";
let currentTeam = "";
let hiddenTeam = "";
let gameOver = false;

const teams = [
    "pakistan", "india", "bangladesh", "newzealand",
    "australia", "zimbabwe", "westindies",
    "england", "afghanistan", "usa", "uae", "srilanka"
];

const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');

function initGame() {
    tries = 5;
    guessedLetters = "";
    gameOver = false;
    
  
    currentTeam = teams[Math.floor(Math.random() * teams.length)];
    hiddenTeam = 'X'.repeat(currentTeam.length);
    
    updateDisplay();
    drawHangman(0);
    
    
    document.getElementById('letterInput').value = '';
    document.getElementById('letterInput').disabled = false;
    document.getElementById('guessButton').disabled = false;
    
    
    document.querySelector('.game-container').classList.remove('game-over', 'game-win');
}

function drawHangman(state) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
  
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(50, 280);
    ctx.lineTo(200, 280);
    ctx.stroke();
    

    ctx.beginPath();
    ctx.moveTo(100, 280);
    ctx.lineTo(100, 50);
    ctx.stroke();
    
  
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(180, 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(180, 50);
    ctx.lineTo(180, 80);
    ctx.stroke();

  
    ctx.strokeStyle = '#ff0000';
    ctx.fillStyle = '#ff0000';
    ctx.lineWidth = 3;

    if (state >= 1) {
    
        ctx.beginPath();
        ctx.arc(180, 110, 25, 0, 2 * Math.PI);
        ctx.stroke();
    }
    
    if (state >= 2) {
     
        ctx.beginPath();
        ctx.moveTo(180, 135);
        ctx.lineTo(180, 220);
        ctx.stroke();
    }
    
    if (state >= 3) {
    
        ctx.beginPath();
        ctx.moveTo(180, 160);
        ctx.lineTo(150, 190);
        ctx.stroke();
    }
    
    if (state >= 4) {
      
        ctx.beginPath();
        ctx.moveTo(180, 160);
        ctx.lineTo(210, 190);
        ctx.stroke();
    }
    
    if (state >= 5) {
       
        ctx.beginPath();
        ctx.moveTo(180, 220);
        ctx.lineTo(150, 260);
        ctx.stroke();
    }
    
    if (state >= 6) {
      
        ctx.beginPath();
        ctx.moveTo(180, 220);
        ctx.lineTo(210, 260);
        ctx.stroke();
    }
}

function checkGuess(guess, realTeam, hiddenTeam) {
    let matches = 0;
    let newHiddenTeam = '';
    
    for (let i = 0; i < realTeam.length; i++) {
        if (guess === hiddenTeam[i]) {
            return { matches: 0, newHidden: hiddenTeam }; // Already guessed
        }
        if (guess === realTeam[i]) {
            newHiddenTeam += guess;
            matches++;
        } else {
            newHiddenTeam += hiddenTeam[i];
        }
    }
    
    return { matches: matches, newHidden: newHiddenTeam };
}

function makeGuess() {
    if (gameOver) return;
    
    const input = document.getElementById('letterInput');
    const letter = input.value.toLowerCase();
    
    if (!letter || letter.length !== 1) {
        message = "Please enter a single letter!";
        updateDisplay();
        return;
    }
    
    if (!/^[a-z]$/.test(letter)) {
        message = "Please enter only letters!";
        updateDisplay();
        return;
    }
    
    if (guessedLetters.includes(letter)) {
        message = "You already guessed that letter!";
        updateDisplay();
        return;
    }
    
    guessedLetters += letter;
    const result = checkGuess(letter, currentTeam, hiddenTeam);
    
    if (result.matches === 0) {
        message = "Wrong guess!";
        tries--;
    } else {
        message = "Nice! Good guess.";
        hiddenTeam = result.newHidden;
    }
    
    if (hiddenTeam === currentTeam) {
        message = "🎉 You guessed it! 🎉";
        gameOver = true;
        document.getElementById('letterInput').disabled = true;
        document.getElementById('guessButton').disabled = true;
        document.querySelector('.game-container').classList.add('game-win');
    } else if (tries === 0) {
        message = "💀 You are hanged! 💀";
        hiddenTeam = currentTeam;
        gameOver = true;
        document.getElementById('letterInput').disabled = true;
        document.getElementById('guessButton').disabled = true;
        document.querySelector('.game-container').classList.add('game-over');
    }
    
    updateDisplay();
    drawHangman(5 - tries);
    input.value = '';
}

function updateDisplay() {
    document.getElementById('wordDisplay').textContent = hiddenTeam.toUpperCase();
    document.getElementById('message').textContent = message;
    document.getElementById('triesLeft').textContent = 
        tries > 0 ? `You have ${tries} attempt${tries === 1 ? '' : 's'} left!` : 'Game Over!';
    document.getElementById('guessedLetters').textContent = 
        'Guessed letters: ' + (guessedLetters ? guessedLetters.toUpperCase().split('').join(', ') : 'None');
}

function restartGame() {
    initGame();
}


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('letterInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            makeGuess();
        }
    });
    
    
    initGame();
});
