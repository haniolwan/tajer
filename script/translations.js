const defaultLocale = localStorage.getItem("lang") || "en";

let locale;
let translations = {};

// Initialize Loader on Window Load
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader--hidden");
  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
});

// Set Default Locale on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  setLocale(defaultLocale);
});

async function setLocale(newLocale) {
  // Trigger loader visibility every time
  showLoader();

  try {
    document.documentElement.dir = dir(newLocale);
    document.documentElement.lang = newLocale;
    localStorage.setItem("lang", newLocale);

    if (newLocale !== locale) {
      const newTranslations = await fetchTranslationsFor(newLocale);
      translations = newTranslations;
      locale = newLocale;
    }

    translatePage();
  } catch (error) {
    console.error("Error setting locale:", error);
  } finally {
    hideLoader();
  }
}

async function fetchTranslationsFor(newLocale) {
  const response = await fetch(`/lang/${newLocale}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch translations for ${newLocale}`);
  }
  return await response.json();
}

function translatePage() {
  document.querySelectorAll("[data-i18n-key]").forEach(translateElement);
}

function translateElement(element) {
  const key = element.getAttribute("data-i18n-key");
  const translation = translations[key];

  if (element.tagName.toLowerCase() === "img") {
    element.src = translation || element.src;
  }
  if (element.tagName.toLowerCase() === ("input" || "textarea")) {
    element.placeholder = translation || element.placeholder;
  } else {
    element.innerText = translation || key;
  }
}

function dir(locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

function changeLanguage(lang) {
  setLocale(lang);
}

// Show Loader
function showLoader() {
  let loader = document.querySelector(".loader");
  if (!loader) {
    loader = document.createElement("div");
    loader.className = "loader";
    document.body.appendChild(loader);
  }
  loader.classList.remove("loader--hidden");
}

// Hide Loader
function hideLoader() {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.classList.add("loader--hidden");
  }
}

// Hide Switcher on Scroll
document.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const target = document.getElementById("local-changer");

  if (scrollPosition > 100) {
    target.style.display = "none";
  } else {
    target.style.display = "flex";
  }
});
