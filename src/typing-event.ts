/**
 * キー入力を表すイベント
 */
export type TypingEvent = {
  key: string;
  keyCode: number;
  shift: boolean;
  code: string;
};

/**
 * かな→JISかなでのイベント の対応表
 */
const kanaToJisKanaMap = {
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

const validKanas = Object.keys(kanaToJisKanaMap);

type ValidKana = keyof typeof kanaToJisKanaMap;

function isValidKana(kana: string): kana is ValidKana {
  return validKanas.includes(kana);
}

/**
 * かなを出力するためのイベントに変換する
 */
export function convertKanaToEvent(kana: string): TypingEvent {
  if (!isValidKana(kana)) {
    throw new Error(`${kana}に対応していません`);
  }

  return kanaToJisKanaMap[kana];
}
