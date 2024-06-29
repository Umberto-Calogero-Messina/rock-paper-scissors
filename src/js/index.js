import '../scss/styles.scss';

/* 
    - Localizar los elementos implicados del DOM
    - Crear los datos del programa necesarios

FLUJO DEL PROGRAMA
    - Detectar dónde hemos click
    - Guardar nuestra jugada
    - Generar una jugada aleatoria para el ordenador y guardarla
    - Comparar jugadas
    - Mostrar resultado
    - Asignar puntos
*/

const gameItemElement = document.getElementById('game-items');
const userPointElement = document.getElementById('points-user');
const PcPointElement = document.getElementById('points-pc');
const resultElement = document.getElementById('game-result');
const resetGameElement = document.getElementById('play-again');
const userPickedElement = document.getElementById('picked-user-image');
const pcPickedElement = document.getElementById('picked-pc-image');
const resultShowElement = document.getElementById('game-results');
const rulesButtonElement = document.getElementById('rules-button');
const rulesWindowElement = document.getElementById('rules');
const bodySimpleElement = document.getElementById('body-simple');

let userPoint = 0;
let pcPoint = 0;
//let userPlay;
let pcPlay;
let pcPlayArray = [];

///////ADD CHECK PATCHNAME HERE AND IN STARTGAME - ERROR IN SELECT GAME
// if (window.location.pathname != 'simple.htm') {
//   pcPlayArray = ['rock', 'paper', 'scissors'];
// } else {
// }

bodySimpleElement
  ? (pcPlayArray = ['rock', 'paper', 'scissors'])
  : (pcPlayArray = ['rock', 'paper', 'scissors', 'lizard', 'spock']);

const symbolObject = {
  rock: ['TIE', 'LOSE', 'WIN', 'WIN', 'LOSE'],
  paper: ['WIN', 'TIE', 'LOSE', 'LOSE', 'WIN'],
  scissors: ['LOSE', 'WIN', 'TIE', 'WIN', 'LOSE'],
  lizard: ['LOSE', 'WIN', 'LOSE', 'TIE', 'WIN'],
  spock: ['LOSE', 'WIN', 'WIN', 'LOSE', 'TIE']
};

// console.log(pcPlayArray.length);
// console.dir(window);
// const userObject = {
//   rock: 0,
//   paper: 1,
//   scissors: 2
// };

const imgObject = {
  rock: '../assets/images/icon-rock.svg',
  paper: '../assets/images/icon-paper.svg',
  scissors: '../assets/images/icon-scissors.svg',
  lizard: '../assets/images/icon-lizard.svg',
  spock: '../assets/images/icon-spock.svg'
};

const checkWinner = event => {
  // If user = Pc = tie

  //console.log('user = ' + userPlay);
  //console.log('pc = ' + pcPlay);
  // if (userPlay === pcPlay) {
  //   resultElement.textContent = 'TIE';
  //   //console.log('enter');
  //   return;
  // }

  // symbolObject -> pasa valor ordenador y me dice si user ha perdido

  //console.log(symbolObject[userPlay][pcPlay] + '---');

  //console.log(symbolObject[userPlay][pcPlay -1]);

  // console.log(event + 'user');
  // console.log(pcPlay + 'pc');
  // console.log(symbolObject[event][pcPlay]);

  //else if user > pc = Win userPoint++
  //else if user < px = Lose pcPoint++
  if (symbolObject[event][pcPlay] === 'TIE') {
    resultElement.textContent = symbolObject[event][pcPlay];
  } else if (symbolObject[event][pcPlay] === 'WIN') {
    resultElement.textContent = symbolObject[event][pcPlay];
    userPoint++;
  } else if (symbolObject[event][pcPlay] === 'LOSE') {
    resultElement.textContent = symbolObject[event][pcPlay];
    pcPoint++;
  }

  //console.log(symbolObject[userPlay][pcPlay]);
};

const updateRanking = () => {
  //Update ranking user & pc
  userPointElement.textContent = userPoint;
  PcPointElement.textContent = pcPoint;
};

const changeImgElement = (playerImg, pcImg) => {
  //console.dir(userPickedElement);
  //.src
  //Change Img for both --> Dont work src patch
  userPickedElement.src = imgObject[playerImg];
  pcPickedElement.src = imgObject[pcImg];

  // console.log(pcImg);
  //console.log(imgObject[userPlay]);
  //console.log(imgObject[pcPlay]);
};

const generateRandomPcPlay = event => {
  // Add lenth de algo para añadir luego más jugadas

  //Add if to check file.index
  //   if ()
  //     else()
  const randomValue = Math.floor(Math.random() * pcPlayArray.length);

  pcPlay = randomValue;
  // console.log(pcPlayArray[pcPlay]);

  checkWinner(event.target.dataset.item);
  ShowRankingWindow();
  updateRanking();
  changeImgElement(event.target.dataset.item, pcPlayArray[pcPlay]);
};

const startGame = event => {
  if (!event.target.classList.contains('game-item')) return;
  //console.log(event.target.dataset.item);

  //userPlay = userObject[event.target.dataset.item];
  //console.log(userObject[userPlay]);
  generateRandomPcPlay(event);
};

const resetGame = () => {
  //console.log('ResetGame');
  resultElement.textContent = '';
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
