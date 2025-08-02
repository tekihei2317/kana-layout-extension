import { createKanaKeyboard, KeyLayout } from "./keyguide";

export async function replaceKanaKeyboard(keyLayout: KeyLayout): Promise<void> {
  const vkContainer = document.querySelector("#vk_container");
  if (!vkContainer) {
    console.error("#vk_container not found");
    return;
  }

  const existingKeyboard = vkContainer.querySelector("#kana_keyboard");
  existingKeyboard?.remove();

  const newKeyboard = createKanaKeyboard(keyLayout);
  vkContainer.appendChild(newKeyboard);
}
