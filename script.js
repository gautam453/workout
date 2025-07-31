const exercises = [
  {
    name: "Jumping Jacks",
    type: "cardio",
    description: "A full-body warm-up exercise.",
    howTo: "Stand upright, jump while spreading your legs and arms outward, then return.",
    duration: "30 seconds",
    durationInSec: 30,
    image: "https://www.verywellfit.com/thmb/qFjdzXl0WKHgl8OqB2rR7Cwuhuk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1317583372-29a3f01747394336aa3b8a0bb0219d67.jpg"
  },
  {
    name: "Push-ups",
    type: "strength",
    description: "Upper body strength training.",
    howTo: "Keep body straight, lower chest to floor, push back up.",
    duration: "3 sets of 10 reps (~45s)",
    durationInSec: 45,
    image: "https://www.verywellfit.com/thmb/9kB_XQYh2y71w8Wb-ZR8EK9UNXY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Pushups1-5bdf3a0546e0fb002602c01e.gif"
  },
  {
    name: "Plank",
    type: "strength",
    description: "Core stability and endurance.",
    howTo: "Hold plank position with tight core and flat back.",
    duration: "60 seconds",
    durationInSec: 60,
    image: "https://www.inspireusafoundation.org/wp-content/uploads/2022/12/plank.gif"
  },
  {
    name: "High Knees",
    type: "cardio",
    description: "Boost heart rate by running in place with knees high.",
    howTo: "Run in place, bringing knees to chest with each step.",
    duration: "30 seconds",
    durationInSec: 30,
    image: "https://www.inspireusafoundation.org/wp-content/uploads/2022/12/high-knees.gif"
  },
  {
    name: "Yoga Stretch",
    type: "flexibility",
    description: "Improves flexibility and posture.",
    howTo: "Lie on stomach, push chest upward with arms extended.",
    duration: "30 seconds",
    durationInSec: 30,
    image: "https://yogapractice.com/wp-content/uploads/2021/07/Cobra-Pose.gif"
  },
  {
    name: "Lunges",
    type: "strength",
    description: "Strengthens legs and glutes.",
    howTo: "Step forward, lower hips until both knees are at 90°, return.",
    duration: "3 sets of 12 reps per leg (~60s)",
    durationInSec: 60,
    image: "https://media.tenor.com/BrKPEJUlFvEAAAAC/lunges-exercise.gif"
  },
  {
    name: "Toe Touches",
    type: "flexibility",
    description: "Stretches hamstrings and lower back.",
    howTo: "Stand straight, bend forward to touch toes, hold.",
    duration: "20 seconds",
    durationInSec: 20,
    image: "https://www.inspireusafoundation.org/wp-content/uploads/2022/12/toe-touch.gif"
  }
];

function renderExercises(type = "all", keyword = "") {
  list.innerHTML = "";
  const filtered = exercises.filter(e =>
    (type === "all" || e.type === type) &&
    e.name.toLowerCase().includes(keyword.toLowerCase())
  );

  if (filtered.length === 0) {
    list.innerHTML = "<p>No exercises found.</p>";
    return;
  }

  filtered.forEach((ex, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${ex.image}" alt="${ex.name}" />
      <h3>${ex.name}</h3>
      <p><strong>Type:</strong> ${ex.type}</p>
      <button class="toggle-btn">Show Details</button>
      <div class="details">
        <p><strong>Description:</strong> ${ex.description}</p>
        <p><strong>How to:</strong> ${ex.howTo}</p>
        <p><strong>Duration:</strong> ${ex.duration}</p>
        <div class="timer-area">
          <button class="start-timer" data-index="${index}">Start Timer</button>
          <div class="progress-container">
            <div class="progress-bar" id="progress-${index}"></div>
          </div>
          <span class="countdown" id="countdown-${index}"></span>
        </div>
      </div>
    `;
    list.appendChild(card);
  });
}
let activeTimer = null;

list.addEventListener("click", e => {
  if (e.target.classList.contains("toggle-btn")) {
    const details = e.target.nextElementSibling;
    const visible = details.style.display === "block";
    details.style.display = visible ? "none" : "block";
    e.target.textContent = visible ? "Show Details" : "Hide Details";
  }

  if (e.target.classList.contains("start-timer")) {
    const idx = e.target.getAttribute("data-index");
    const exercise = exercises[idx];
    const duration = exercise.durationInSec;
    const progressBar = document.getElementById(`progress-${idx}`);
    const countdownText = document.getElementById(`countdown-${idx}`);

    if (activeTimer) clearInterval(activeTimer);

    let timeLeft = duration;
    progressBar.style.width = "0%";
    countdownText.textContent = `${timeLeft}s`;

    activeTimer = setInterval(() => {
      timeLeft--;
      const percent = ((duration - timeLeft) / duration) * 100;
      progressBar.style.width = `${percent}%`;
      countdownText.textContent = `${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(activeTimer);
        countdownText.textContent = "Done!";
        progressBar.style.width = "100%";
      }
    }, 1000);
  }
});
