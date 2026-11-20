// Goals set kar rahe hain
const STEP_GOAL = 10000;
const CALORIE_GOAL = 500;

// HTML elements ko pakad rahe hain (DOM references)
const form = document.getElementById("activity-form");
const activityTypeInput = document.getElementById("activity-type");
const stepsInput = document.getElementById("steps-input");
const minutesInput = document.getElementById("minutes-input");
const caloriesInput = document.getElementById("calories-input");
const activityList = document.getElementById("activity-list");
const resetBtn = document.getElementById("reset-btn");

const stepsDisplay = document.getElementById("steps-display");
const caloriesDisplay = document.getElementById("calories-display");
const minutesDisplay = document.getElementById("minutes-display");
const stepsFill = document.getElementById("steps-fill");
const caloriesFill = document.getElementById("calories-fill");

// localStorage se purana data load karo, warna empty array []
let activities = JSON.parse(localStorage.getItem("fitnessActivities")) || [];

// Data ko localStorage mein save karne ka function
function saveData() {
  localStorage.setItem("fitnessActivities", JSON.stringify(activities));
}

// Poori screen (summary + list) update karne ka function
function renderApp() {
  let totalSteps = 0;
  let totalCalories = 0;
  let totalMinutes = 0;

  activityList.innerHTML = "";

  // Har activity ke liye total jodo aur list item banao
  activities.forEach((item, index) => {
    totalSteps += item.steps;
    totalCalories += item.calories;
    totalMinutes += item.minutes;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>
        <strong>${item.type}</strong> — ${item.minutes} mins, ${item.calories} kcal, ${item.steps} steps
      </span>
      <button type="button" class="delete-btn" onclick="deleteActivity(${index})">Delete</button>
    `;
    activityList.appendChild(li);
  });

  // Summary text update karo
  stepsDisplay.innerText = `${totalSteps.toLocaleString()} / ${STEP_GOAL.toLocaleString()}`;
  caloriesDisplay.innerText = `${totalCalories} / ${CALORIE_GOAL} kcal`;
  minutesDisplay.innerText = `${totalMinutes} mins`;

  // Progress bar width update karo (max 100% tak)
  const stepPercent = Math.min((totalSteps / STEP_GOAL) * 100, 100);
  const caloriePercent = Math.min((totalCalories / CALORIE_GOAL) * 100, 100);

  stepsFill.style.width = `${stepPercent}%`;
  caloriesFill.style.width = `${caloriePercent}%`;
}

// Form submit hone par nayi activity add karo
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Page ko reload hone se rokta hai

  const newActivity = {
    type: activityTypeInput.value,
    steps: Number(stepsInput.value) || 0,
    minutes: Number(minutesInput.value),
    calories: Number(caloriesInput.value)
  };

  activities.push(newActivity);
  saveData();
  renderApp();

  // Form reset karo
  form.reset();
  stepsInput.value = 0;
});

// Kisi ek activity ko delete karne ka function
function deleteActivity(index) {
  activities.splice(index, 1);
  saveData();
  renderApp();
}

// Saari activities clear karne ka button
resetBtn.addEventListener("click", function () {
  activities = [];
  saveData();
  renderApp();
});

// Page khulte hi saved data dikhao
renderApp();