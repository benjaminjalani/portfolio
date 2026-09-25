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


function renderPortfolioData()
{
  if(!window.portfolioData)
  {
    console.error("Portfolio data not found.");
    return;
  }

  const data = window.portfolioData;

  const aboutBadge = document.getElementById('about-badge');
  const aboutName = document.getElementById('about-name');
  const aboutSubtitle = document.getElementById('about-subtitle');
  const aboutTags = document.getElementById('about-tags');
  const aboutBadge2 = document.getElementById('about-back-badge');
  const aboutBiography = document.getElementById('about-biography');

  if(aboutBadge) 
    aboutBadge.textContent = data.about.badge;
  if(aboutName)
    aboutName.innerHTML = `${data.personal.firstname} ${data.personal.middlename} <span class="highlight-yellow">${data.personal.lastname}</span>`;
  if(aboutSubtitle)
    aboutSubtitle.textContent = data.about.subtitle;
  if(aboutTags)
    aboutTags.innerHTML = data.about.tags.map(tag => `<span class="exp-tag">${tag}</span>`).join(' ');
  if(aboutBadge2)
    aboutBadge2.textContent = data.about.badge2;
  if(aboutBiography)
    aboutBiography.textContent = data.about.biography;


  renderSkills();
  renderProjects();
  const emailElement = document.getElementById("contact-email");
    const linkedinElement = document.getElementById("linkedin-link");
    const githubElement = document.getElementById("github-link");

    if (emailElement) {
        emailElement.textContent = data.personal.email;
        emailElement.href = `mailto:${data.personal.email}`;
    }

    if (linkedinElement) {
        linkedinElement.href = data.links.Linkedin;
    }

    if (githubElement) {
        githubElement.href = data.links.Github;
}

function renderSkills()
{
  const bottom = document.getElementById('skills-marquee-track-bottom');
  const top = document.getElementById('skills-marquee-track-top');
  if(!bottom)
    return;

  bottom.innerHTML = window.portfolioData.skills.map((skill ,index) => {
    return `<div class="skill-card" data-categories="language web">

                    <div class="skill-icon">
                        <img
                            src="${skill.icon}"
                            alt="${skill.name} icon"
                            width="28"
                            height="28">
                    </div>
                    <span class="skill-cat">
                        ${skill.category}
                    </span>
                    <h3>${skill.name}</h3>
                </div>
            `;
     }).join('');
  }
}

function renderProjects() 
{
    const container = document.getElementById("projects-grid");
    if (!container) 
      return;
    container.innerHTML = portfolioData.projects
        .map((project, index) => {
            const position = index + 1;
            return `
                <div class="project-card shape-pos-${position}">
                    <span class="project-tag">
                        ${project.tag}
                    </span>
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${project.stack.join(" &bull; ")}
                    </div>
                    <div class="project-links">
                        <a
                            href="${project.demo}"
                            class="btn-demo"
                            target="_blank"
                            rel="noopener noreferrer">
                            ${project.demoLabel}
                        </a>
                        <a
                            href="${project.github}"
                            class="btn-github"
                            target="_blank"
                            rel="noopener noreferrer">
                            GitHub
                        </a>
                    </div>
                </div>
            `;
        })
        .join("");

}
document.addEventListener("DOMContentLoaded", renderPortfolioData);

document.addEventListener("DOMContentLoaded", () => {
    renderPortfolioData();
    playDrawIntro({
        text: "BJA",
        tagline: `${portfolioData.personal.name} — portfolio`,
        drawMs: 2200,
        accentColor: "#f0e119"
    });
    const words = [
        "CREATIVE",
        "BCA GRADUATE",
        "FREELANCE",
        "DEVELOPER"
    ];
    const slidingTitle = document.getElementById("sliding-title");
    let currentIndex = 0;
    if (slidingTitle) 
    {
        function rotateWords() 
        {
            slidingTitle.classList.remove("visible");
            setTimeout(() => {
                currentIndex =
                    (currentIndex + 1) % words.length;
                slidingTitle.textContent =
                    words[currentIndex];
                slidingTitle.classList.add("visible");
            }, 600);
        }
        slidingTitle.textContent = words[0];
        setTimeout(() => {
            slidingTitle.classList.add("visible");
        }, 100);
        setInterval(rotateWords, 3200);
    }
    setupSkillMarquees();
    setupDragScroll("skills-marquee-bottom");
    setupDragScroll("skills-marquee-top");
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


function scrollSection(id, amount) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollBy({ left: amount, behavior: 'smooth' });
  }
}

function setupSkillMarquees() {
    const bottom = document.getElementById("skills-marquee-track-bottom");
    const top = document.getElementById("skills-marquee-track-top");
    if (!bottom) return;
    const html = bottom.innerHTML;
    bottom.innerHTML = html + html;
    if (top) {
        top.innerHTML = bottom.innerHTML;
    }
    document.querySelectorAll(".skills-marquee-wrapper").forEach(wrapper => {
        wrapper.setAttribute("tabindex", "0");
        wrapper.addEventListener("focus", () => {
            const track = wrapper.querySelector(".skills-marquee-track");
            if (track) {
                track.style.animationPlayState = "paused";
            }
        });
        wrapper.addEventListener("blur", () => {
            const track = wrapper.querySelector(".skills-marquee-track");

            if (track) {
                track.style.animationPlayState = "running";
            }
        });
    });
}

function setupDragScroll(id) {
  const el = document.getElementById(id);
  if (!el) return;
  let isDown = false;
  let startX;
  let scrollLeft;

  el.addEventListener('mousedown', (e) => {
    isDown = true;
    el.classList.add('active-drag');
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  });

  el.addEventListener('mouseleave', () => {
    isDown = false;
    el.classList.remove('active-drag');
  });

  el.addEventListener('mouseup', () => {
    isDown = false;
    el.classList.remove('active-drag');
  });

  el.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    el.scrollLeft = scrollLeft - walk;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupDragScroll('skills-grid');
  setupDragScroll('projects-grid');
});

window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (nav) {
      if (window.scrollY > 300) {
          nav.classList.add("onscroll");
      } else {
          nav.classList.remove("onscroll");
      }
    }
});
