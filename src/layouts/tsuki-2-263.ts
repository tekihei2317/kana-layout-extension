import { InputProcessor } from "../input-processor";
import { convertKanaToEvent } from "../typing-event";

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

type ValidKey = keyof typeof keymap;

export function isValidKey(key: string): key is ValidKey {
  return Object.keys(keymap).includes(key);
}

type State = {
  shift: "none" | "left" | "right";
};

const process: InputProcessor<State, ValidKey> = ({ state, key }) => {
  if (state.shift === "none") {
    if (key === "d") {
      return { state: { shift: "left" }, event: undefined };
    } else if (key === "k") {
      return { state: { shift: "right" }, event: undefined };
    } else {
      const event = convertKanaToEvent(keymap[key].default);
      return { state: { shift: "none" }, event };
    }
  } else if (state.shift === "left") {
    if (key === "d") {
      // シフト2回押してもシフトのまま何もしない
      return { state: { shift: "left" }, event: undefined };
    } else {
      const entry = keymap[key];

      if (entry.side === "left") {
        // 同手シフトは通常面
        const event = convertKanaToEvent(entry.default);
        return { state: { shift: "none" }, event };
      } else {
        // 異手シフトはシフト面
        const event = convertKanaToEvent(entry.shift);
        return { state: { shift: "none" }, event };
      }
    }
  } else {
    if (key === "k") {
      // シフト2回押してもシフトのまま何もしない
      return { state: { shift: "right" }, event: undefined };
    } else {
      const entry = keymap[key];

      if (entry.side === "right") {
        // 同手シフトは通常面
        const event = convertKanaToEvent(entry.default);
        return { state: { shift: "none" }, event };
      } else {
        // 異手シフトはシフト面
        const event = convertKanaToEvent(entry.shift);
        return { state: { shift: "none" }, event };
      }
    }
  }
};

export const tsukiLayout = {
  process,
  isValidKey,
};
