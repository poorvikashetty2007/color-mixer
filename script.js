let round = 1, score = 0, target = {};
const $ = id => document.getElementById(id);
const rand = () => Math.floor(Math.random() * 256);
const show = (el, c) => el.style.background = `rgb(${c.r},${c.g},${c.b})`;
const mix = () => ({ r: +$('r').value, g: +$('g').value, b: +$('b').value });

function newRound() {
  target = { r: rand(), g: rand(), b: rand() };
  show($('target'), target);
  $('r').value = $('g').value = $('b').value = 128;
  show($('mine'), mix());
  $('round').textContent = round;
}

['r', 'g', 'b'].forEach(id =>
  $(id).addEventListener('input', () => show($('mine'), mix()))
);

$('check').addEventListener('click', () => {
  const m = mix();
  const diff = Math.abs(m.r - target.r) + Math.abs(m.g - target.g) + Math.abs(m.b - target.b);
  const points = Math.max(0, Math.round(100 - diff / 7.65));
  score += points;
  let msg;
  if (round === 5) {
    msg = `Game over! Final score: ${score}/500`;
    round = 1; score = 0;
  } else {
    msg = `+${points} points`;
    round++;
  }
  $('result').textContent = msg;
  $('score').textContent = score;
  newRound();
});

newRound();