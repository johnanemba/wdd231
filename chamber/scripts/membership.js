// Set timestamp when form loads
document.addEventListener("DOMContentLoaded", () => {
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    const now = new Date();
    timestampInput.value = now.toLocaleString();
  }

  // Modal logic
  const modals = document.querySelectorAll(".modal");
  const links = document.querySelectorAll(".info-link");
  const closeButtons = document.querySelectorAll(".close");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const modalId = link.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove("hidden");
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").classList.add("hidden");
    });
  });

  // Optional: Close modal if you click outside it
  window.addEventListener("click", e => {
    modals.forEach(modal => {
      if (!modal.classList.contains("hidden") && e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  });
});
