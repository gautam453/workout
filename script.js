const exercises = [
    { name: "Jumping Jacks", type: "cardio", description: "A full-body warm-up exercise." },
    { name: "Push-ups", type: "strength", description: "Upper body strength training." },
    { name: "Plank", type: "strength", description: "Core stability and endurance." },
    { name: "High Knees", type: "cardio", description: "Cardio move to increase heart rate." },
    { name: "Yoga Stretch", type: "flexibility", description: "Improves flexibility and balance." },
    { name: "Lunges", type: "strength", description: "Strengthens legs and glutes." },
    { name: "Toe Touches", type: "flexibility", description: "Stretches hamstrings and lower back." }
  ];
  
  const list = document.getElementById("exercise-list");
  const filter = document.getElementById("filter");
  
  function renderExercises(type = "all") {
    list.innerHTML = "";
    const filtered = type === "all" ? exercises : exercises.filter(e => e.type === type);
    filtered.forEach(ex => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${ex.name}</h3>
        <p><strong>Type:</strong> ${ex.type}</p>
        <button onclick="toggleDetails(this)">Show Details</button>
        <div class="details"><p>${ex.description}</p></div>
      `;
      list.appendChild(card);
    });
  }
  
  function toggleDetails(btn) {
    const details = btn.nextElementSibling;
    const isVisible = details.style.display === "block";
    details.style.display = isVisible ? "none" : "block";
    btn.textContent = isVisible ? "Show Details" : "Hide Details";
  }
  
  filter.addEventListener("change", e => renderExercises(e.target.value));
  
  renderExercises(); // Initial render