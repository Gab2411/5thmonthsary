const scenes = document.querySelectorAll(".scene");
const chuchayButton = document.getElementById("chuchayButton");
const runningPuppy = document.getElementById("runningPuppy");
const journeyMessage = document.getElementById("journeyMessage");
const letterButton = document.getElementById("letterButton");
const surpriseButton = document.getElementById("surpriseButton");
const restartButton = document.getElementById("restartButton");

let adventureStarted = false;
let transitionTimer = null;

function showScene(sceneId) {
  scenes.forEach((scene) => {
    scene.classList.toggle("active", scene.id === sceneId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupPuppyImage(imageId, emojiId) {
  const image = document.getElementById(imageId);
  const emoji = document.getElementById(emojiId);

  function updateImage() {
    const loaded = image.complete && image.naturalWidth > 0;
    image.style.display = loaded ? "block" : "none";
    emoji.style.display = loaded ? "none" : "";
  }

  image.addEventListener("load", updateImage);
  image.addEventListener("error", updateImage);
  updateImage();
}

setupPuppyImage("puppyImage", "puppyEmoji");
setupPuppyImage("runningImage", "runningEmoji");
setupPuppyImage("finalPuppyImage", "finalEmoji");

document.querySelectorAll(".photo-frame img").forEach((image) => {
  const fallback = image.parentElement.querySelector(".photo-fallback");

  function updatePhoto() {
    const loaded = image.complete && image.naturalWidth > 0;
    image.style.display = loaded ? "block" : "none";
    fallback.style.display = loaded ? "none" : "block";
  }

  image.addEventListener("load", updatePhoto);
  image.addEventListener("error", updatePhoto);
  updatePhoto();
});

chuchayButton.addEventListener("click", () => {
  if (adventureStarted) return;

  adventureStarted = true;
  chuchayButton.disabled = true;
  showScene("journey");
  journeyMessage.textContent = "Chuchay is running to his two favorite humans! 💗";

  runningPuppy.classList.remove("running");
  void runningPuppy.offsetWidth;
  runningPuppy.classList.add("running");

  transitionTimer = setTimeout(() => {
    showScene("memories");
    adventureStarted = false;
    chuchayButton.disabled = false;
  }, 2600);
});

letterButton.addEventListener("click", () => showScene("letter"));

surpriseButton.addEventListener("click", () => {
  showScene("surprise");
  launchConfetti();
});

function launchConfetti() {
  const confetti = document.getElementById("confetti");
  const decorations = ["💗", "💕", "💖", "🌸", "✨", "🐾"];
  confetti.replaceChildren();

  for (let i = 0; i < 34; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = decorations[Math.floor(Math.random() * decorations.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--duration", `${3 + Math.random() * 3}s`);
    piece.style.setProperty("--delay", `${Math.random() * 2}s`);
    piece.style.fontSize = `${14 + Math.random() * 18}px`;
    confetti.appendChild(piece);
  }
}

restartButton.addEventListener("click", () => {
  clearTimeout(transitionTimer);
  adventureStarted = false;
  chuchayButton.disabled = false;
  runningPuppy.classList.remove("running");
  journeyMessage.textContent = "Chuchay is on his way to his favorite people!";
  document.getElementById("confetti").replaceChildren();
  showScene("intro");
});
