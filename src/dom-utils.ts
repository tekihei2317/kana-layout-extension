import { createKanaKeyboard, KeyLayout } from "./keyguide";

export function waitForElement(
  selector: string,
  timeout: number = 10000
): Promise<Element> {
  return new Promise((resolve, reject) => {
    const existingElement = document.querySelector(selector);
    if (existingElement) {
      resolve(existingElement);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Element ${selector} not found within ${timeout}ms`));
    }, timeout);
  });
}

export async function replaceKanaKeyboard(keyLayout: KeyLayout): Promise<void> {
  try {
    await waitForElement("#vk_container");

    const existingKeyboard = document.querySelector("#kana_keyboard");
    existingKeyboard?.remove();

    const newKeyboard = createKanaKeyboard(keyLayout);
    const vkContainer = document.querySelector("#vk_container")!;
    vkContainer.appendChild(newKeyboard);
  } catch (error) {
    console.error("Failed to replace kana keyboard:", error);
  }
}
