import "./style.css";
import { Settings, defaultSettings } from "../settings";

const enabledToggle = document.getElementById(
  "enabled-toggle",
) as HTMLInputElement;
const kanaLayoutSelect = document.getElementById(
  "kana-layout",
) as HTMLSelectElement;

function loadSettings() {
  chrome.storage.sync.get(["enabled", "kanaLayout"], (result) => {
    const settings: Settings = {
      enabled: result.enabled ?? defaultSettings.enabled,
      kanaLayout: result.kanaLayout ?? defaultSettings.kanaLayout,
    };

    enabledToggle.checked = settings.enabled;
    kanaLayoutSelect.value = settings.kanaLayout;
  });
}

function saveSetting(key: keyof Settings, value: Settings[keyof Settings]) {
  chrome.storage.sync.set({ [key]: value });
}

enabledToggle.addEventListener("change", () => {
  saveSetting("enabled", enabledToggle.checked);
});

kanaLayoutSelect.addEventListener("change", () => {
  saveSetting("kanaLayout", kanaLayoutSelect.value as Settings["kanaLayout"]);
});

// 初期化
loadSettings();
