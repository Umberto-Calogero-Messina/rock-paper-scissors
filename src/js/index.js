import '../scss/styles.scss';

const gameItemElement = document.getElementById('game-items');
const userPointElement = document.getElementById('points-user');
const PcPointElement = document.getElementById('points-pc');
const resultElement = document.getElementById('game-result');
const resetGameElement = document.getElementById('play-again');
const userPickedElement = document.getElementById('picked-user-image');
const gameUserResultElement = document.getElementById('result-user');
const gamePcResultElement = document.getElementById('result-pc');
const pcPickedElement = document.getElementById('picked-pc-image');
const resultShowElement = document.getElementById('game-results');
const rulesButtonElement = document.getElementById('rules-button');
const rulesWindowElement = document.getElementById('rules');
const bodySimpleElement = document.getElementById('body-simple');

let userPoint = 0;
let pcPoint = 0;
let userPlay;
let pcPlay;
let pcPlayArray = [];

bodySimpleElement
  ? (pcPlayArray = ['rock', 'paper', 'scissors'])
  : (pcPlayArray = ['rock', 'paper', 'scissors', 'lizard', 'spock']);

const symbolObject = {
  rock: {
    paper: false,
    scissors: true,
    lizard: true,
    spock: false
  },
  paper: {
    rock: true,
    scissors: false,
    lizard: false,
    spock: true
  },
  scissors: {
    rock: false,
    paper: true,
    lizard: true,
    spock: false
  },
  lizard: {
    rock: false,
    paper: true,
    scissors: false,
    spock: true
  },
  spock: {
    rock: false,
    paper: true,
    scissors: true,
    lizard: false
  }
};

const imgObject = {
  rock: '../assets/images/icon-rock.svg',
  paper: '../assets/images/icon-paper.svg',
  scissors: '../assets/images/icon-scissors.svg',
  lizard: '../assets/images/icon-lizard.svg',
  spock: '../assets/images/icon-spock.svg'
};

const checkWinner = () => {
  if (userPlay === pcPlay) {
    resultElement.textContent = 'TIE';
    return;
  }
  if (symbolObject[userPlay][pcPlay]) {
    resultElement.textContent = 'WIN';
    userPoint++;
  } else {
    resultElement.textContent = 'LOSE';
    pcPoint++;
  }
  updateRanking();
};

const updateRanking = () => {
  userPointElement.textContent = userPoint;
  PcPointElement.textContent = pcPoint;
};

const changeImgElement = () => {
  userPickedElement.src = imgObject[userPlay];
  pcPickedElement.src = imgObject[pcPlay];
  gameUserResultElement.classList.add('game-item--' + userPlay);
  gamePcResultElement.classList.add('game-item--' + pcPlay);
};

const generateRandomPcPlay = event => {
  const randomValue = Math.floor(Math.random() * pcPlayArray.length);
  pcPlay = pcPlayArray[randomValue];

  checkWinner();
  ShowRankingWindow();
  changeImgElement();
};

const startGame = event => {
  if (!event.target.classList.contains('game-item')) return;
  userPlay = event.target.dataset.item;
  generateRandomPcPlay(event);
};

const resetGame = () => {
  resultElement.textContent = '';
  gameUserResultElement.classList.remove('game-item--' + userPlay);
  gamePcResultElement.classList.remove('game-item--' + pcPlay);
  HideRankingWindow();
};

const ShowRankingWindow = () => {
  resultShowElement.classList.remove('hide');
  gameItemElement.classList.add('hide');
};
const HideRankingWindow = () => {
  resultShowElement.classList.add('hide');
  gameItemElement.classList.remove('hide');
};

const showRules = () => {
  rulesWindowElement.classList.add('rules--show');
};
const rulesHide = () => {
  rulesWindowElement.classList.remove('rules--show');
};

gameItemElement.addEventListener('click', startGame);
resetGameElement.addEventListener('click', resetGame);
rulesButtonElement.addEventListener('click', showRules);
rulesWindowElement.addEventListener('click', rulesHide);
