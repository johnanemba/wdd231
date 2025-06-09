// scripts/visitMessage.js

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("visit-message");
  const now = Date.now();
  const oneDay = 1000 * 60 * 60 * 24;

  const lastVisit = localStorage.getItem("lastVisit");

  let message = "";

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const daysBetween = Math.floor((now - Number(lastVisit)) / oneDay);

    if (daysBetween < 1) {
      message = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${daysBetween} days ago.`;
    }
  }

  sidebar.textContent = message;
  localStorage.setItem("lastVisit", now);
});
