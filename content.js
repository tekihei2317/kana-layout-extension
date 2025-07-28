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
  ぬ: { keyCode: 49, shift: false }, // 1
  ふ: { keyCode: 50, shift: false }, // 2
  あ: { keyCode: 51, shift: false }, // 3
  ぁ: { keyCode: 51, shift: true }, // 3 + shift
  う: { keyCode: 52, shift: false }, // 4
  ぅ: { keyCode: 52, shift: true }, // 4 + shift
  え: { keyCode: 53, shift: false }, // 5
  ぇ: { keyCode: 53, shift: true }, // 5 + shift
  お: { keyCode: 54, shift: false }, // 6
  ぉ: { keyCode: 54, shift: true }, // 6 + shift
  や: { keyCode: 55, shift: false }, // 7
  ゃ: { keyCode: 55, shift: true }, // 7 + shift
  ゆ: { keyCode: 56, shift: false }, // 8
  ゅ: { keyCode: 56, shift: true }, // 8 + shift
  よ: { keyCode: 57, shift: false }, // 9
  ょ: { keyCode: 57, shift: true }, // 9 + shift
  わ: { keyCode: 48, shift: false }, // 0
  を: { keyCode: 48, shift: true }, // 0 + shift

  // Q行
  た: { keyCode: 81, shift: false }, // Q
  て: { keyCode: 87, shift: false }, // W
  い: { keyCode: 69, shift: false }, // E
  ぃ: { keyCode: 69, shift: true }, // E + shift
  す: { keyCode: 82, shift: false }, // R
  か: { keyCode: 84, shift: false }, // T
  ん: { keyCode: 89, shift: false }, // Y
  な: { keyCode: 85, shift: false }, // U
  に: { keyCode: 73, shift: false }, // I
  ら: { keyCode: 79, shift: false }, // O
  せ: { keyCode: 80, shift: false }, // P
  "゛": { keyCode: 219, shift: false }, // [
  "゜": { keyCode: 221, shift: false }, // ]
  "[": { keyCode: 219, shift: true }, // [ + Shift

  // A行
  ち: { keyCode: 65, shift: false }, // A
  と: { keyCode: 83, shift: false }, // S
  し: { keyCode: 68, shift: false }, // D
  は: { keyCode: 70, shift: false }, // F
  き: { keyCode: 71, shift: false }, // G
  く: { keyCode: 72, shift: false }, // H
  ま: { keyCode: 74, shift: false }, // J
  の: { keyCode: 75, shift: false }, // K
  り: { keyCode: 76, shift: false }, // L
  れ: { keyCode: 186, shift: false }, // ;
  け: { keyCode: 222, shift: false }, // '
  む: { keyCode: 221, shift: true },

  // Z行
  つ: { keyCode: 90, shift: false }, // Z
  さ: { keyCode: 88, shift: false }, // X
  そ: { keyCode: 67, shift: false }, // C
  ひ: { keyCode: 86, shift: false }, // V
  こ: { keyCode: 66, shift: false }, // B
  み: { keyCode: 78, shift: false }, // N
  も: { keyCode: 77, shift: false }, // M
  ね: { keyCode: 188, shift: false }, // ,
  ",": { keyCode: 188, shift: true }, // , + Shift
  る: { keyCode: 190, shift: false }, // .
  ".": { keyCode: 190, shift: true }, // . + Shift
  め: { keyCode: 191, shift: false }, // /
};

/**
 * 'none' | 'left' | 'right'
 */
let shiftState = "none";

function toTsukiEvent({ shiftState, key }) {
  if (shiftState === "none") {
    if (key === "d") {
      return { shiftState: "left", event: undefined };
    } else if (key === "k") {
      return { shiftState: "right", event: undefined };
    } else {
      const keymapEntry = keymap[key];
      const event = kanaToJisKana[keymapEntry.default];

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
        const event = kanaToJisKana[entry.default];
        return { shiftState: "none", event };
      } else {
        // 異手シフトはシフト面
        const event = kanaToJisKana[entry.shift];
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
        const event = kanaToJisKana[entry.default];
        return { shiftState: "none", event };
      } else {
        // 異手シフトはシフト面
        const event = kanaToJisKana[entry.shift];
        return { shiftState: "none", event };
      }
    }
  }
}

function handleKeyDown(event) {
  console.log(
    `Key: ${event.key}, isTrusted: ${event.isTrusted}, keyCode: ${event.keyCode}, which: ${event.which}`
  );

  if (Object.keys(keymap).includes(event.key)) {
    const result = toTsukiEvent({ shiftState, key: event.key });
    console.log(result);

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    shiftState = result.shiftState;
    if (result.event !== undefined) {
      event.target.dispatchEvent(
        new KeyboardEvent("keydown", {
          keyCode: result.event.keyCode,
          bubbles: true,
          shiftKey: result.event.shift,
        })
      );
    }
  }
}

// キャプチャフェーズで最優先でキーイベントを処理
document.addEventListener("keydown", handleKeyDown, true);
