import "./style.css";
import { Settings, defaultSettings } from "../settings";

const enabledToggle = document.getElementById(
  "enabled-toggle"
) as HTMLInputElement;
const keyboardJisRadio = document.getElementById(
  "keyboard-jis"
) as HTMLInputElement;
const keyboardUsRadio = document.getElementById(
  "keyboard-us"
) as HTMLInputElement;
const kanaLayoutSelect = document.getElementById(
  "kana-layout"
) as HTMLSelectElement;

function loadSettings() {
  chrome.storage.sync.get(
    ["enabled", "keyboardLayout", "kanaLayout"],
    (result) => {
      console.log(result);
      const settings: Settings = {
        enabled: result.enabled ?? defaultSettings.enabled,
        keyboardLayout: result.keyboardLayout ?? defaultSettings.keyboardLayout,
        kanaLayout: result.kanaLayout ?? defaultSettings.kanaLayout,
      };

      enabledToggle.checked = settings.enabled;
      (settings.keyboardLayout === "JIS"
        ? keyboardJisRadio
        : keyboardUsRadio
      ).checked = true;
      kanaLayoutSelect.value = settings.kanaLayout;
    }
  );
}

function saveSetting(key: keyof Settings, value: Settings[keyof Settings]) {
  chrome.storage.sync.set({ [key]: value });
}

enabledToggle.addEventListener("change", () => {
  saveSetting("enabled", enabledToggle.checked);
});

keyboardJisRadio.addEventListener("change", () => {
  if (keyboardJisRadio.checked) {
    saveSetting("keyboardLayout", "JIS");
    saveSetting("keyboardLayout", "US");
  }
});

kanaLayoutSelect.addEventListener("change", () => {
  saveSetting("kanaLayout", kanaLayoutSelect.value as Settings["kanaLayout"]);
});

// 初期化
loadSettings();
