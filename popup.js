/**
 * Popup Script for Kana Layout Extension
 */

const toggle = document.getElementById("toggle");
const status = document.getElementById("status");

function updateUI(enabled) {
  if (enabled) {
    toggle.classList.add("active");
    status.textContent = "機能が有効です";
    status.className = "status enabled";
  } else {
    toggle.classList.remove("active");
    status.textContent = "機能が無効です";
    status.className = "status disabled";
  }
}

chrome.storage.sync.get(["enabled"], (result) => {
  const enabled = result.enabled !== false;
  updateUI(enabled);
});

toggle.addEventListener("click", () => {
  chrome.storage.sync.get(["enabled"], (result) => {
    const currentState = result.enabled !== false;
    const newState = !currentState;

    chrome.storage.sync.set({ enabled: newState }, () => {
      updateUI(newState);
    });
  });
});
