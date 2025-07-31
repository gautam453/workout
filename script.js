const exercises = [
  {
    name: "Jumping Jacks",
    type: "cardio",
    description: "A full-body warm-up exercise.",
    image: "https://www.inspireusafoundation.org/wp-content/uploads/2022/12/jumping-jacks.gif"
  },
  {
    name: "Push-ups",
    type: "strength",
    description: "Upper body strength training.",
    image: "https://www.inspireusafoundation.org/wp-content/uploads/2022/12/push-up.gif"
  },
  {
    name: "Plank",
    type: "strength",
    description: "Core stability and endurance.",
    image: "https://www.inspireusafoundation.org/wp-content/uploads/2022/12/plank.gif"
  },
  {
    name: "High Knees",
    type: "cardio",
    description: "Cardio move to increase heart rate.",
    image: "https://www.inspireusafoundation.org/wp-content/uploads/2022/12/high-knees.gif"
  },
  {
    name: "Yoga Stretch",
    type: "flexibility",
    description: "Improves flexibility and balance.",
    image: "https://www.inspireusafoundation.org/wp-content/uploads/2022/12/cobra-stretch.gif"
  },
  {
    name: "Lunges",
    type: "strength",
    description: "Strengthens legs and glutes.",
    image: "https://www.inspireusafoundation.org/wp-content/uploads/2022/12/lunges.gif"
  },
  {
    name: "Toe Touches",
    type: "flexibility",
    description: "Stretches hamstrings and lower back.",
    image: "https://www.inspireusafoundation.org/wp-content/uploads/2022/12/toe-touch.gif"
  }
];

const list = document.getElementById("exercise-list");
const filter = document.getElementById("filter");
const search = document.getElementById("search");
const themeToggle = document.getElementById("theme-toggle");

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

  filtered.forEach(ex => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${ex.image}" alt="${ex.name}" />
      <h3>${ex.name}</h3>
      <p><strong>Type:</strong> ${ex.type}</p>
      <button class="toggle-btn">Show Details</button>
      <div class="details"><p>${ex.description}</p></div>
    `;
    list.appendChild(card);
  });
}

list.addEventListener("click", e => {
  if (e.target.classList.contains("toggle-btn")) {
    const details = e.target.nextElementSibling;
    const visible = details.style.display === "block";
    details.style.display = visible ? "none" : "block";
    e.target.textContent = visible ? "Show Details" : "Hide Details";
  }
});

filter.addEventListener("change", () => {
  localStorage.setItem("selectedFilter", filter.value);
  renderExercises(filter.value, search.value);
});

search.addEventListener("input", () => {
  renderExercises(filter.value, search.value);
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

window.addEventListener("DOMContentLoaded", () => {
  const savedFilter = localStorage.getItem("selectedFilter");
  if (savedFilter) {
    filter.value = savedFilter;
  }
  renderExercises(filter.value);
});
