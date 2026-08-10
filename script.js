function playDrawIntro(options = {}) {
  const opts = Object.assign({
    text: 'BJA',
    tagline: 'Benjamin J Alani — portfolio',
    drawMs: 2200,
    strokeWidth: 2,
    accentColor: '#f0e119',
    onComplete: null
  }, options);

  const loader = document.getElementById('loader');
  const textEl = document.getElementById('loaderText');
  const tagEl = document.getElementById('loaderTag');

  if (!loader || !textEl || !tagEl) return;

  document.body.classList.add('no-scroll');

  document.documentElement.style.setProperty('--yellow', opts.accentColor);
  const len = opts.text.length || 3;
  const fontSize = len <= 3 ? 90 : Math.max(34, 90 - (len - 3) * 7);
  textEl.setAttribute('font-size', fontSize);
  textEl.style.strokeWidth = opts.strokeWidth;
  textEl.textContent = opts.text;
  tagEl.textContent = opts.tagline;


  loader.classList.remove('done');
  textEl.classList.remove('drawing', 'filled');
  tagEl.classList.remove('show');
  void textEl.offsetWidth;

  textEl.style.animationDuration = opts.drawMs + 'ms';

  requestAnimationFrame(() => {
    textEl.classList.add('drawing');
  });

  setTimeout(() => {
    textEl.classList.add('filled');
    tagEl.classList.add('show');
  }, opts.drawMs);

  setTimeout(() => {
    loader.classList.add('done');
    setTimeout(() => {
      document.body.classList.remove('no-scroll');
      if (typeof opts.onComplete === 'function') opts.onComplete();
    }, 900);
  }, opts.drawMs + 900);
}


document.addEventListener('DOMContentLoaded', () => {
  playDrawIntro({
    text: 'BJA',
    tagline: 'Benjamin J Alani — portfolio',
    drawMs: 2200,
    accentColor: '#f0e119'
  });


  const words = ["CREATIVE", "BCA GRADUATE", "FREELANCE", "DEVELOPER"];
  const slidingTitle = document.getElementById('sliding-title');
  let currentIndex = 0;

  if (slidingTitle) {
    function rotateWords() {
      slidingTitle.classList.remove('visible');
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % words.length;
        slidingTitle.textContent = words[currentIndex];
        slidingTitle.classList.add('visible');
      }, 600);
    }

    slidingTitle.textContent = words[0];
    setTimeout(() => {
      slidingTitle.classList.add('visible');
    }, 100);

    setInterval(rotateWords, 3200);
  }
});



let ttt = Array(9).fill("");
let tttOver = false;
let gamesPlayed = 0;
const HUMAN = "X";
const AI = "O";
const WINS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const boardEl = document.getElementById("ttt-board");
const statusEl = document.getElementById("tttStatus");

function renderTTT(winLine) {
  if (!boardEl) return;
  boardEl.innerHTML = "";
  ttt.forEach((v, i) => {
    const c = document.createElement("div");
    c.className = "ttt-cell" + (v ? " " + v.toLowerCase() : "") + (winLine && winLine.includes(i) ? " winline" : "");
    c.textContent = v;
    c.addEventListener("click", () => humanMove(i));
    boardEl.appendChild(c);
  });
}

function winnerOf(b) {
  for (const line of WINS) {
    const [a, b1, c] = line;
    if (b[a] && b[a] === b[b1] && b[b1] === b[c]) return { player: b[a], line };
  }
  if (b.every((v) => v)) return { player: "draw", line: null };
  return null;
}

function minimax(b, isMax, alpha, beta) {
  const res = winnerOf(b);
  if (res) {
    if (res.player === AI) return { score: 10 };
    if (res.player === HUMAN) return { score: -10 };
    return { score: 0 };
  }

  if (isMax) {
    let best = { score: -Infinity };
    for (let i = 0; i < 9; i++) {
      if (!b[i]) {
        b[i] = AI;
        const r = minimax(b, false, alpha, beta);
        b[i] = "";
        if (r.score > best.score) best = { score: r.score, index: i };
        alpha = Math.max(alpha, r.score);
        if (beta <= alpha) break;
      }
    }
    return best;
  } else {
    let best = { score: Infinity };
    for (let i = 0; i < 9; i++) {
      if (!b[i]) {
        b[i] = HUMAN;
        const r = minimax(b, true, alpha, beta);
        b[i] = "";
        if (r.score < best.score) best = { score: r.score, index: i };
        beta = Math.min(beta, r.score);
        if (beta <= alpha) break;
      }
    }
    return best;
  }
}

function humanMove(i) {
  if (tttOver || ttt[i]) return;
  ttt[i] = HUMAN;
  let res = winnerOf(ttt);
  if (!res) {
    const best = minimax(ttt.slice(), true, -Infinity, Infinity);
    if (best.index !== undefined) ttt[best.index] = AI;
    res = winnerOf(ttt);
  }
  if (res) endTTT(res);
  else {
    if (statusEl) {
      statusEl.textContent = "Your move.";
      statusEl.className = "ttt-status mono";
    }
    renderTTT();
  }
}

function endTTT(res) {
  tttOver = true;
  gamesPlayed++;
  renderTTT(res.line);

  if (res.player === AI) {
    if (boardEl) boardEl.classList.add("shake");
    if (statusEl) {
      statusEl.textContent = "SYSTEM OUTSMARTED YOU";
      statusEl.className = "ttt-status mono glitch";
    }
    setTimeout(() => boardEl && boardEl.classList.remove("shake"), 500);
  } else if (res.player === HUMAN) {
    if (statusEl) {
      statusEl.textContent = "IMPRESSIVE";
      statusEl.className = "ttt-status mono";
    }
    const flash = document.getElementById("flashWin");
    if (flash) {
      flash.classList.add("go");
      setTimeout(() => flash.classList.remove("go"), 700);
    }
    burstConfetti();
    if (typeof unlock === 'function') unlock("Anomaly", "defeated the system");
  } else {
    if (statusEl) {
      statusEl.textContent = "PERFECT DEFENSE";
      statusEl.className = "ttt-status mono";
    }
  }

  if (gamesPlayed === 1 && typeof unlock === 'function') {
    unlock("Gamer", "played the system");
  }
}

function resetTTT() {
  ttt = Array(9).fill("");
  tttOver = false;
  if (statusEl) {
    statusEl.textContent = "Your move.";
    statusEl.className = "ttt-status mono";
  }
  renderTTT();
}

function burstConfetti() {
  for (let i = 0; i < 28; i++) {
    const sq = document.createElement("div");
    sq.className = "confetti-sq";
    sq.style.left = innerWidth / 2 + "px";
    sq.style.top = innerHeight / 2 + "px";
    document.body.appendChild(sq);
    const angle = Math.random() * Math.PI * 2,
      dist = 100 + Math.random() * 200;
    sq.animate(
      [
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) rotate(${Math.random() * 360}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 900 + Math.random() * 400,
        easing: "cubic-bezier(0.16,1,0.3,1)",
      }
    );
    setTimeout(() => sq.remove(), 1400);
  }
}

renderTTT();


const circleOverlay = document.getElementById('profile-overlay');

function openProfile(e) {
    if (e) e.preventDefault();
    circleOverlay.classList.add('active');
    const island = document.getElementById('dynamic-island');
    island.classList.remove('island-expanded');
    island.classList.add('island-collapsed');
}
function closeProfile() {
    circleOverlay.classList.remove('active');
}
circleOverlay.addEventListener('click', (e) => {
    if (e.target === circleOverlay) {
        closeProfile();
    }
});


let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function changeSlide(direction) {
    slides[currentSlideIndex].classList.remove('active-slide');
    dots[currentSlideIndex].classList.remove('active-dot');
    currentSlideIndex += direction;
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    slides[currentSlideIndex].classList.add('active-slide');
    dots[currentSlideIndex].classList.add('active-dot');
}

window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (window.scrollY > 900) {
        nav.classList.add("onscroll");
    } else {
        nav.classList.remove("onscroll");
    }
});
