// lang.js - Dynamic Language Switcher Based on Available Files

async function fetchAvailableLanguages() {
    try {
        const response = await fetch("translations/");
        const text = await response.text();
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(text, "text/html");
        const files = Array.from(htmlDoc.querySelectorAll("a"));
        const langFiles = files.filter((file) => file.href.endsWith(".json"));

        const languages = langFiles.map((file) => {
            const fileName = file.href.split("/").pop().replace(".json", "");
            return { code: fileName, label: fileName.toUpperCase() };
        });

        populateLanguageSelector(languages);
    } catch (error) {
        console.error("Error fetching translation files:", error);
    }
}

function populateLanguageSelector(languages) {
    const langSwitcher = document.getElementById("language-switcher");
    langSwitcher.innerHTML = ""; // Clear existing options

    languages.forEach((lang) => {
        const option = document.createElement("option");
        option.value = lang.code;
        option.textContent = lang.label;
        langSwitcher.appendChild(option);
    });
}

async function fetchTranslations(lang) {
    try {
        const response = await fetch(`translations/${lang}.json`);
        const translations = await response.json();
        applyTranslations(translations);
    } catch (error) {
        console.error("Error loading translation file:", error);
    }
}

function applyTranslations(translations) {
    const keys = Object.keys(translations);
    keys.forEach((key) => {
        const element = document.getElementById(key);
        if (element) {
            if (element.hasAttribute("placeholder")) {
                element.setAttribute("placeholder", translations[key]);
            } else {
                element.textContent = translations[key];
            }
        }
    });
}

// Event Listener for Language Switcher
document.addEventListener("DOMContentLoaded", () => {
    fetchAvailableLanguages();

    const langSwitcher = document.getElementById("language-switcher");
    langSwitcher.addEventListener("change", (e) => {
        fetchTranslations(e.target.value);
    });

    // Load default language (English) on page load
    fetchTranslations("en");
});
