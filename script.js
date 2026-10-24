const openGift = document.getElementById("openGift");
const cover = document.getElementById("cover");
const gift = document.getElementById("gift");
const musicBtn = document.getElementById("musicBtn");

let player = null;
let musicReady = false;
let musicStarted = false;

// =========================
// YOUTUBE
// =========================

function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtubePlayer", {
    width: "1",
    height: "1",
    videoId: "TvoNFHOmjqg",
    playerVars: {
      autoplay: 0,
      controls: 0,
      loop: 1,
      playlist: "TvoNFHOmjqg",
      rel: 0
    },
    events: {
      onReady: function (event) {
        musicReady = true;
        event.target.setVolume(18);
      }
    }
  });
}

// =========================
// ABRIR REGALO
// =========================

openGift.addEventListener("click", () => {
  openGift.classList.add("open");

  setTimeout(() => {
    cover.style.display = "none";
    gift.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    startMusic();
  }, 800);
});

// =========================
// MÚSICA
// =========================

function startMusic() {
  if (player && musicReady) {
    player.setVolume(18);
    player.playVideo();
    musicStarted = true;

    if (musicBtn) {
      musicBtn.textContent = "⏸ Pausar música";
    }
  }
}

if (musicBtn) {
  musicBtn.addEventListener("click", () => {
    if (!player || !musicReady) return;

    const state = player.getPlayerState();

    if (state === YT.PlayerState.PLAYING) {
      player.pauseVideo();
      musicBtn.textContent = "🎵 Reanudar música";
    } else {
      player.setVolume(18);
      player.playVideo();
      musicBtn.textContent = "⏸ Pausar música";
    }
  });
}

// =========================
// CONTADOR 25/10/2026
// =========================

const targetDate = new Date(2026, 9, 25, 0, 0, 0).getTime();

function updateCountdown() {

  const now = Date.now();
  const distance = targetDate - now;

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
    console.error("No se encontraron los elementos del contador.");
    return;
  }

  if (distance <= 0) {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    return;
  }

  const days = Math.floor(distance / 86400000);

  const hours = Math.floor(
    (distance % 86400000) / 3600000
  );

  const minutes = Math.floor(
    (distance % 3600000) / 60000
  );

  const seconds = Math.floor(
    (distance % 60000) / 1000
  );

  daysElement.textContent = String(days).padStart(2, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

// Ejecutar contador inmediatamente
updateCountdown();

// Actualizar cada segundo
setInterval(updateCountdown, 1000);


// =========================
// CORAZONES FLOTANDO
// =========================

setInterval(() => {

  if (gift.classList.contains("hidden")) return;

  const heart = document.createElement("span");

  heart.className = "floating-heart";

  heart.textContent =
    Math.random() > 0.5 ? "♥" : "♡";

  heart.style.left =
    Math.random() * 100 + "vw";

  heart.style.fontSize =
    (14 + Math.random() * 14) + "px";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);

}, 900);