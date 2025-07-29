import { tsukiLayout } from "~/layout-tsuki-2-263";

console.log("Kana Layout Extension loaded");

type State = {
  shift: "none" | "left" | "right";
};

let state: State = {
  shift: "none",
};

let isExtensionEnabled: boolean = true;

function handleKeyDown(event: KeyboardEvent) {
  if (!event.isTrusted) return;

  if (tsukiLayout.isValidKey(event.key)) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const result = tsukiLayout.process({ state, key: event.key });
    state = result.state;

    if (result.event !== undefined) {
      event.target?.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: result.event.key,
          code: result.event.code,
          keyCode: result.event.keyCode,
          shiftKey: result.event.shift,
          bubbles: true,
        })
      );
    }
  }
}

if (isExtensionEnabled) {
  window.addEventListener("keydown", handleKeyDown, true);
}
