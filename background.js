/**
 * Background Script for Kana Layout Extension
 */

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ enabled: true });
  console.log("Kana Layout Extension installed");
});
