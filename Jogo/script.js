const player = document.getElementById("player");
const notification = document.getElementById("notification");
const vidaLabel = document.getElementById("vida");
const nivelLabel = document.getElementById("nivel");
const pontosLabel = document.getElementById("pontos");

const stats = {
  vida: 100,
  nivel: 1,
  pontos: 0,
};

const area = {
  width: 760,
  height: 540,
  step: 40,
};

const playerState = {
  x: area.width / 2 - 14,
  y: area.height / 2 - 14,
};

function atualizarHUD() {
  vidaLabel.textContent = stats.vida;
  nivelLabel.textContent = stats.nivel;
  pontosLabel.textContent = stats.pontos;
}

function mover(dx, dy) {
  playerState.x = Math.max(8, Math.min(area.width - 40, playerState.x + dx * area.step));
  playerState.y = Math.max(8, Math.min(area.height - 40, playerState.y + dy * area.step));
  player.style.left = `${playerState.x}px`;
  player.style.top = `${playerState.y}px`;
  atualizarHUD();
}

function exibirNotificacao(mensagem) {
  notification.textContent = mensagem;
  notification.classList.add("show");
  setTimeout(() => notification.classList.remove("show"), 1500);
}

function interagir() {
  const eventos = [
    "Você encontrou uma poção de vida! +20 vida",
    "Um mercador aparece: +30 pontos",
    "Você coletou uma moeda rara! +10 pontos",
    "Você abriu um baú: +1 nível",
    "Cuidado! Armadilha atingiu sua vida -15",
  ];

  const resultado = eventos[Math.floor(Math.random() * eventos.length)];

  if (resultado.includes("poção")) {
    stats.vida = Math.min(100, stats.vida + 20);
    stats.pontos += 5;
  } else if (resultado.includes("mercador")) {
    stats.pontos += 30;
  } else if (resultado.includes("moeda")) {
    stats.pontos += 10;
  } else if (resultado.includes("baú")) {
    stats.nivel += 1;
    stats.pontos += 15;
  } else if (resultado.includes("armadilha")) {
    stats.vida = Math.max(0, stats.vida - 15);
  }

  if (stats.vida === 0) {
    exibirNotificacao("Você foi derrotado! Recarregue a página para recomeçar.");
    window.removeEventListener("keydown", handleKeyDown);
  } else {
    exibirNotificacao(resultado);
  }

  atualizarHUD();
}

function handleKeyDown(event) {
  switch (event.key) {
    case "ArrowUp":
    case "w":
    case "W":
      mover(0, -1);
      break;
    case "ArrowDown":
    case "s":
    case "S":
      mover(0, 1);
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      mover(-1, 0);
      break;
    case "ArrowRight":
    case "d":
    case "D":
      mover(1, 0);
      break;
    case " ":
      interagir();
      break;
  }
}

window.onload = () => {
  const screen = document.getElementById("gameScreen");
  screen.focus();
  atualizarHUD();
  player.style.left = `${playerState.x}px`;
  player.style.top = `${playerState.y}px`;
  window.addEventListener("keydown", handleKeyDown);
};
