'use strict';

const startbutton = document.querySelector('.startbutton');
const holes = document.querySelectorAll('.hole');
const countdown = document.querySelector('.countdown');
const moles = document.querySelectorAll('.mole');
const score = document.querySelector('.score');
const highest = document.querySelector('.highest span');

let times = 60;
let scores = 0;
let randomHole = 0;

highest.textContent = localStorage.getItem('score')
  ? localStorage.getItem('score')
  : 0;

const runGame = function () {
  const min = String(Math.trunc(times / 60)).padStart(2, 0);
  const sec = String(Math.trunc(times % 60)).padStart(2, 0);
  const timersRandomRange = Math.floor(Math.random() * (3000 - 900) + 900);
  randomHole = Math.floor(Math.random() * holes.length);

  if (times > -1) {
    startbutton.style.display = 'none';
    times--;

    setTimeout(() => {
      holes[randomHole].classList.add('up');
      countdown.textContent = `${min}:${sec}`;
    }, 1000);

    setTimeout(() => {
      holes.forEach((hole) => hole.classList.remove('up'));

      runGame();
    }, timersRandomRange);
  } else {
    if (scores > +localStorage.getItem('score'))
      localStorage.setItem('score', scores);

    alert(`Game Over, You Got ${scores}`);
    location.reload();
  }
};

const startGame = function () {
  runGame();
};

const addScore = function () {
  scores++;
  const audio = new Audio('./hit.wav');
  audio.play();
  moles[randomHole].classList.add('hard');
  moles[randomHole].style.pointerEvents = 'none';
  score.textContent = scores;

  setTimeout(() => {
    moles.forEach((mole) => mole.classList.remove('hard'));
    moles.forEach((mole) => (mole.style.pointerEvents = 'auto'));

    audio.pause();
  }, 800);
};

////////////////
startbutton.addEventListener('click', startGame);
moles.forEach((mole) => mole.addEventListener('click', addScore));
