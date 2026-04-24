const root = document.documentElement;
const yearEl = document.getElementById("year");
const emailText = document.getElementById("emailText");
const copyEmailBtn = document.getElementById("copyEmailBtn");
const themeToggle = document.getElementById("themeToggle");
const themeToggleLabel = document.getElementById("themeToggleLabel");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const storedTheme = localStorage.getItem("theme");
const preferredDark = window.matchMedia("(prefers-color-scheme: dark)");

const applyTheme = (theme) => {
  const isDark = theme === "dark";
  root.classList.toggle("dark", isDark);
  themeToggleLabel.textContent = isDark ? "Light Mode" : "Dark Mode";
  themeToggle.setAttribute("aria-pressed", String(isDark));
};

const resolveInitialTheme = () => {
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }
  return preferredDark.matches ? "dark" : "light";
};

const email = emailText.textContent.trim();

yearEl.textContent = new Date().getFullYear();
applyTheme(resolveInitialTheme());

copyEmailBtn.addEventListener("click", async () => {
  const originalText = copyEmailBtn.textContent;

  try {
    await navigator.clipboard.writeText(email);
    copyEmailBtn.textContent = "Copied";
  } catch {
    copyEmailBtn.textContent = "Copy Failed";
  }

  window.setTimeout(() => {
    copyEmailBtn.textContent = originalText;
  }, 1400);
});

themeToggle.addEventListener("click", () => {
  const nextTheme = root.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("theme", nextTheme);
  applyTheme(nextTheme);
});

menuToggle.addEventListener("click", () => {
  const isOpen = !mobileNav.classList.contains("hidden");
  mobileNav.classList.toggle("hidden", isOpen);
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.textContent = isOpen ? "Menu" : "Close";
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.add("hidden");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "Menu";
  });
});

preferredDark.addEventListener("change", (event) => {
  if (localStorage.getItem("theme")) {
    return;
  }
  applyTheme(event.matches ? "dark" : "light");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});
