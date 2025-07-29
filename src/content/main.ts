console.log("Kana Layout Extension loaded");

const keymap = {
  q: { default: "そ", shift: "ぁ", side: "left" },
  w: { default: "こ", shift: "ひ", side: "left" },
  e: { default: "し", shift: "ほ", side: "left" },
  r: { default: "て", shift: "ふ", side: "left" },
  t: { default: "ょ", shift: "め", side: "left" },

  a: { default: "は", shift: "ぃ", side: "left" },
  s: { default: "か", shift: "を", side: "left" },
  d: { default: "", shift: "ら", side: "left" },
  f: { default: "と", shift: "あ", side: "left" },
  g: { default: "た", shift: "よ", side: "left" },

  z: { default: "す", shift: "ぅ", side: "left" },
  x: { default: "け", shift: "へ", side: "left" },
  c: { default: "に", shift: "せ", side: "left" },
  v: { default: "な", shift: "ゅ", side: "left" },
  b: { default: "さ", shift: "ゃ", side: "left" },

  y: { default: "つ", shift: "ぬ", side: "right" },
  u: { default: "ん", shift: "え", side: "right" },
  i: { default: "い", shift: "み", side: "right" },
  o: { default: "の", shift: "や", side: "right" },
  p: { default: "り", shift: "ぇ", side: "right" },
  "[": { default: "ち", shift: "[", side: "right" },

  h: { default: "く", shift: "ま", side: "right" },
  j: { default: "う", shift: "お", side: "right" },
  k: { default: "", shift: "も", side: "right" },
  l: { default: "゛", shift: "わ", side: "right" },
  ";": { default: "き", shift: "ゆ", side: "right" },
  "'": { default: "れ", shift: "]", side: "right" },

  n: { default: "っ", shift: "む", side: "right" },
  m: { default: "る", shift: "ろ", side: "right" },
  ",": { default: ",", shift: "ね", side: "right" },
  ".": { default: ".", shift: "-", side: "right" },
  "/": { default: "゜", shift: "ぉ", side: "right" },
};

const kanaToJisKana = {
  // 数字行
  ぬ: { key: "1", keyCode: 49, shift: false, code: "Digit1" },
  ふ: { key: "2", keyCode: 50, shift: false, code: "Digit2" },
  あ: { key: "3", keyCode: 51, shift: false, code: "Digit3" },
  ぁ: { key: "#", keyCode: 51, shift: true, code: "Digit3" },
  う: { key: "4", keyCode: 52, shift: false, code: "Digit4" },
  ぅ: { key: "$", keyCode: 52, shift: true, code: "Digit4" },
  え: { key: "5", keyCode: 53, shift: false, code: "Digit5" },
  ぇ: { key: "%", keyCode: 53, shift: true, code: "Digit5" },
  お: { key: "6", keyCode: 54, shift: false, code: "Digit6" },
  ぉ: { key: "&", keyCode: 54, shift: true, code: "Digit6" },
  や: { key: "7", keyCode: 55, shift: false, code: "Digit7" },
  ゃ: { key: "'", keyCode: 55, shift: true, code: "Digit7" },
  ゆ: { key: "8", keyCode: 56, shift: false, code: "Digit8" },
  ゅ: { key: "(", keyCode: 56, shift: true, code: "Digit8" },
  よ: { key: "9", keyCode: 57, shift: false, code: "Digit9" },
  ょ: { key: ")", keyCode: 57, shift: true, code: "Digit9" },
  わ: { key: "0", keyCode: 48, shift: false, code: "Digit0" },
  を: { key: "0", keyCode: 48, shift: true, code: "Digit0" },
  ほ: { key: "-", keyCode: 189, shift: false, code: "Minus" },
  へ: { key: "^", keyCode: 187, shift: false, code: "Equal" },
  "-": { key: "¥", keyCode: 0, shift: false, code: "IntlYen" },

  // Q行
  た: { key: "q", keyCode: 81, shift: false, code: "KeyQ" },
  て: { key: "w", keyCode: 87, shift: false, code: "KeyW" },
  い: { key: "e", keyCode: 69, shift: false, code: "KeyE" },
  ぃ: { key: "E", keyCode: 69, shift: true, code: "KeyE" },
  す: { key: "r", keyCode: 82, shift: false, code: "KeyR" },
  か: { key: "t", keyCode: 84, shift: false, code: "KeyT" },
  ん: { key: "y", keyCode: 89, shift: false, code: "KeyY" },
  な: { key: "u", keyCode: 85, shift: false, code: "KeyU" },
  に: { key: "i", keyCode: 73, shift: false, code: "KeyI" },
  ら: { key: "o", keyCode: 79, shift: false, code: "KeyO" },
  せ: { key: "p", keyCode: 80, shift: false, code: "KeyP" },
  "゛": { key: "@", keyCode: 219, shift: false, code: "BracketLeft" },
  "゜": { key: "[", keyCode: 219, shift: false, code: "BracketRight" },
  "[": { key: "{", keyCode: 219, shift: true, code: "BracketRight" },

  // A行
  ち: { key: "a", keyCode: 65, shift: false, code: "KeyA" },
  と: { key: "s", keyCode: 83, shift: false, code: "KeyS" },
  し: { key: "d", keyCode: 68, shift: false, code: "KeyD" },
  は: { key: "f", keyCode: 70, shift: false, code: "KeyF" },
  き: { key: "g", keyCode: 71, shift: false, code: "KeyG" },
  く: { key: "h", keyCode: 72, shift: false, code: "KeyH" },
  ま: { key: "j", keyCode: 74, shift: false, code: "KeyJ" },
  の: { key: "k", keyCode: 75, shift: false, code: "KeyK" },
  り: { key: "l", keyCode: 76, shift: false, code: "KeyL" },
  れ: { key: ";", keyCode: 186, shift: false, code: "Semicolon" },
  け: { key: ":", keyCode: 186, shift: false, code: "Quote" },
  む: { key: "]", keyCode: 221, shift: false, code: "Backslash" },
  "]": { key: "}", keyCode: 221, shift: true, code: "Backslash" },

  // Z行
  つ: { key: "z", keyCode: 90, shift: false, code: "KeyZ" },
  っ: { key: "Z", keyCode: 90, shift: true, code: "KeyZ" },
  さ: { key: "x", keyCode: 88, shift: false, code: "KeyX" },
  そ: { key: "c", keyCode: 67, shift: false, code: "KeyC" },
  ひ: { key: "v", keyCode: 86, shift: false, code: "KeyV" },
  こ: { key: "b", keyCode: 66, shift: false, code: "KeyB" },
  み: { key: "n", keyCode: 78, shift: false, code: "KeyN" },
  も: { key: "m", keyCode: 77, shift: false, code: "KeyM" },
  ね: { key: ",", keyCode: 188, shift: false, code: "Comma" },
  ",": { key: "<", keyCode: 188, shift: true, code: "Comma" },
  る: { key: ".", keyCode: 190, shift: false, code: "Period" },
  ".": { key: ">", keyCode: 190, shift: true, code: "Period" },
  め: { key: "/", keyCode: 191, shift: false, code: "Slash" },
  "・": { key: "?", keyCode: 191, shift: true, code: "Slash" },
  ろ: { key: "_", keyCode: 189, shift: false, code: "IntlRo" },
} satisfies Record<string, TypingEvent>;

type ShiftState = "none" | "left" | "right";

type TypingEvent = {
  key: string;
  keyCode: number;
  shift: boolean;
  code: string;
};

type ValidKey = keyof typeof keymap;

type ValidKana = keyof typeof kanaToJisKana;

let shiftState: ShiftState = "none";
let isExtensionEnabled: boolean = true;

function toTsukiEvent({
  shiftState,
  key,
}: {
  shiftState: ShiftState;
  key: ValidKey;
}): { shiftState: ShiftState; event: TypingEvent | undefined } {
  if (shiftState === "none") {
    if (key === "d") {
      return { shiftState: "left", event: undefined };
    } else if (key === "k") {
      return { shiftState: "right", event: undefined };
    } else {
      const keymapEntry = keymap[key];
      const event = kanaToJisKana[keymapEntry.default as ValidKana];

      return { shiftState: "none", event };
    }
  } else if (shiftState === "left") {
    if (key === "d") {
      // シフト2回押してもシフトのまま何もしない
      return { shiftState: "left", event: undefined };
    } else {
      const entry = keymap[key];

      if (entry.side === "left") {
        // 同手シフトは通常面
        const event = kanaToJisKana[entry.default as ValidKana];
        return { shiftState: "none", event };
      } else {
        // 異手シフトはシフト面
        const event = kanaToJisKana[entry.shift as ValidKana];
        return { shiftState: "none", event };
      }
    }
  } else {
    if (key === "k") {
      // シフト2回押してもシフトのまま何もしない
      return { shiftState: "right", event: undefined };
    } else {
      const entry = keymap[key];

      if (entry.side === "right") {
        // 同手シフトは通常面
        const event = kanaToJisKana[entry.default as ValidKana];
        return { shiftState: "none", event };
      } else {
        // 異手シフトはシフト面
        const event = kanaToJisKana[entry.shift as ValidKana];
        return { shiftState: "none", event };
      }
    }
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (!event.isTrusted) return;

  if (Object.keys(keymap).includes(event.key)) {
    const result = toTsukiEvent({ shiftState, key: event.key as ValidKey });

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    shiftState = result.shiftState;
    if (result.event !== undefined) {
      console.log(result.event);
      event.target?.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: result.event.key,
          code: result.event.code,
          keyCode: result.event.keyCode,
          bubbles: true,
          shiftKey: result.event.shift,
        })
      );
    }
  }
}

if (isExtensionEnabled) {
  document.addEventListener("keydown", handleKeyDown, true);
}
