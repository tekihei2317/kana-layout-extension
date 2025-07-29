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
  ぬ: { key: "1", keyCode: 49, shift: false },
  ふ: { key: "2", keyCode: 50, shift: false },
  あ: { key: "3", keyCode: 51, shift: false },
  ぁ: { key: "3", keyCode: 51, shift: true },
  う: { key: "4", keyCode: 52, shift: false },
  ぅ: { key: "4", keyCode: 52, shift: true },
  え: { key: "5", keyCode: 53, shift: false },
  ぇ: { key: "5", keyCode: 53, shift: true },
  お: { key: "6", keyCode: 54, shift: false },
  ぉ: { key: "6", keyCode: 54, shift: true },
  や: { key: "7", keyCode: 55, shift: false },
  ゃ: { key: "7", keyCode: 55, shift: true },
  ゆ: { key: "8", keyCode: 56, shift: false },
  ゅ: { key: "8", keyCode: 56, shift: true },
  よ: { key: "9", keyCode: 57, shift: false },
  ょ: { key: "9", keyCode: 57, shift: true },
  わ: { key: "0", keyCode: 48, shift: false },
  を: { key: "0", keyCode: 48, shift: true },
  ほ: { key: "-", keyCode: 189, shift: false },
  へ: { key: "^", keyCode: 187, shift: false },
  "-": { key: "¥", keyCode: 0, shift: false },

  // Q行
  た: { key: "q", keyCode: 81, shift: false },
  て: { key: "w", keyCode: 87, shift: false },
  い: { key: "e", keyCode: 69, shift: false },
  ぃ: { key: "e", keyCode: 69, shift: true },
  す: { key: "r", keyCode: 82, shift: false },
  か: { key: "t", keyCode: 84, shift: false },
  ん: { key: "y", keyCode: 89, shift: false },
  な: { key: "u", keyCode: 85, shift: false },
  に: { key: "i", keyCode: 73, shift: false },
  ら: { key: "o", keyCode: 79, shift: false },
  せ: { key: "p", keyCode: 80, shift: false },
  "゛": { key: "@", keyCode: 219, shift: false },
  "゜": { key: "[", keyCode: 219, shift: false },
  "[": { key: "[", keyCode: 219, shift: true },

  // A行
  ち: { key: "a", keyCode: 65, shift: false },
  と: { key: "s", keyCode: 83, shift: false },
  し: { key: "d", keyCode: 68, shift: false },
  は: { key: "f", keyCode: 70, shift: false },
  き: { key: "g", keyCode: 71, shift: false },
  く: { key: "h", keyCode: 72, shift: false },
  ま: { key: "j", keyCode: 74, shift: false },
  の: { key: "k", keyCode: 75, shift: false },
  り: { key: "l", keyCode: 76, shift: false },
  れ: { key: ";", keyCode: 186, shift: false },
  け: { key: ":", keyCode: 186, shift: false },
  む: { key: "]", keyCode: 221, shift: false },
  "]": { key: "]", keyCode: 221, shift: true },

  // Z行
  つ: { key: "z", keyCode: 90, shift: false },
  っ: { key: "z", keyCode: 90, shift: true },
  さ: { key: "x", keyCode: 88, shift: false },
  そ: { key: "c", keyCode: 67, shift: false },
  ひ: { key: "v", keyCode: 86, shift: false },
  こ: { key: "b", keyCode: 66, shift: false },
  み: { key: "n", keyCode: 78, shift: false },
  も: { key: "m", keyCode: 77, shift: false },
  ね: { key: ",", keyCode: 188, shift: false },
  ",": { key: ",", keyCode: 188, shift: true },
  る: { key: ".", keyCode: 190, shift: false },
  ".": { key: ".", keyCode: 190, shift: true },
  め: { key: "/", keyCode: 191, shift: false },
  "・": { key: "/", keyCode: 191, shift: true },
  ろ: { key: "_", keyCode: 189, shift: false },
} satisfies Record<string, TypingEvent>;

type ShiftState = "none" | "left" | "right";

type TypingEvent = {
  key: string;
  keyCode: number;
  shift: boolean;
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
