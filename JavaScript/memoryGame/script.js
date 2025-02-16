const resetButton = document.getElementById('reset-button');
const board = document.getElementById('board');
const scoreDisplay = document.getElementById('score1');
const timerDisplay = document.getElementById('timer');
let cards = [];
let flippedCards = [];
let matchedCards = 0;
let playerName = '';
let timer = 0;
let interval;
let gameOver = false;

const pokemonImages = [
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png',
];

function promptForPlayerName() {
  playerName = prompt('הקלד את שמך');
  if (!playerName) {
    alert('יש למלא את שמך');
    promptForPlayerName();  
  } else {
    scoreDisplay.textContent = `שחקן: ${playerName}`;
    resetGame();
  }
}

function shuffleCards() {
  const pairs = [...pokemonImages, ...pokemonImages];
  return pairs.sort(() => Math.random() - 0.5);
}

function createCards() {
  const shuffledCards = shuffleCards();
  board.innerHTML = '';
  shuffledCards.forEach((imageUrl, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', index);

    const front = document.createElement('div');
    front.classList.add('front');
    front.textContent = '?';

    const back = document.createElement('div');
    back.classList.add('back');
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = `Pokemon ${index + 1}`;
    back.appendChild(img);

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (gameOver || card.classList.contains('flipped') || flippedCards.length === 2) {
    return;
  }

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [firstCard, secondCard] = flippedCards;
  const firstImage = firstCard.querySelector('.back img').src;
  const secondImage = secondCard.querySelector('.back img').src;

  if (firstImage === secondImage) {
    matchedCards += 2;
    if (matchedCards === pokemonImages.length * 2) {
      setTimeout(() => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        alert(`כל הכבודד!!, ${playerName}, סיימת את המשחק בזמן של ${minutes} דקות ו-${seconds} שניות!`);
        gameOver = true;
        clearInterval(interval);
      }, 100);
    }
    flippedCards = [];
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

function startTimer() {
  clearInterval(interval);
  timer = 0;
  updateTimerDisplay();
  interval = setInterval(() => {
    timer++;
    updateTimerDisplay();
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  timerDisplay.textContent = `זמן: ${minutes} דקות ו-${seconds} שניות`;
}

function resetGame() {
  matchedCards = 0;
  flippedCards = [];
  gameOver = false;
  createCards();
  startTimer();
}

resetButton.addEventListener('click', () => {
  promptForPlayerName();
});

promptForPlayerName();
