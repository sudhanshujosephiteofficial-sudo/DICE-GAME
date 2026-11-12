'use strict';

// Selecting elements
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');

let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');

let currentScore, playing, activePlayer, scores;

// 3. New game Button functionality
let init = () => {
  // 3.1 set all scores to 0
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // 3.2 set player 1 as active player
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
   
  // 3.3 Remove dice image
  diceEl.classList.add("hidden");
};
init();

// 4. Switch player functionality
let changePlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// 1. Roll dice button functionality
let rollDice = () => {
  // 4.1 currently we are playing or not 
  if (playing === true) {
    // 4.1.1 Generate a random dice number between 1 and 6
    let randomNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(randomNumber);
    
    // 4.1.2 Show the dice image
    diceEl.src = `dice-${randomNumber}.png`;
    diceEl.classList.remove('hidden');
    
    // 4.1.3 if random not 1
    if (randomNumber !== 1) {
      currentScore = currentScore + randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      changePlayer();
    }
  }
};

// 2. Hold score button functionality
let holdScore = () => {
  if (playing === true) {
    // Add current score to total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // Check if score >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      changePlayer();
    }
  }
};

// Event Listeners
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', init);