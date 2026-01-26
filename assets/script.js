// Show current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Copy email to clipboard
const email = "shanmathyravisankaran03@gmail.com";

document.getElementById("copyEmailBtn").addEventListener("click", () => {
  navigator.clipboard.writeText(email).then(() => {
    const btn = document.getElementById("copyEmailBtn");
    btn.textContent = "Copied!";
    setTimeout(() => {
      btn.textContent = "Copy Email";
    }, 1200);
  });
});
