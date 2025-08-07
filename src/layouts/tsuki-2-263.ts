import { InputProcessor } from "../input-processor";
import { convertKanaToEvent } from "../typing-event";
import { updateKeyGuide, UpdateKeyGuide } from "./tsuki-2-263-keyguide";

type KeymapEntry = {
  default: string;
  shift: string | undefined;
  side: "left" | "right";
};

type Keymap = Record<string, KeymapEntry>;

const keymap = {
  KeyQ: { default: "そ", shift: "ぁ", side: "left" },
  KeyW: { default: "こ", shift: "ひ", side: "left" },
  KeyE: { default: "し", shift: "ほ", side: "left" },
  KeyR: { default: "て", shift: "ふ", side: "left" },
  KeyT: { default: "ょ", shift: "め", side: "left" },
  KeyY: { default: "つ", shift: "ぬ", side: "right" },
  KeyU: { default: "ん", shift: "え", side: "right" },
  KeyI: { default: "い", shift: "み", side: "right" },
  KeyO: { default: "の", shift: "や", side: "right" },
  KeyP: { default: "り", shift: "ぇ", side: "right" },
  BracketLeft: { default: "ち", shift: "[", side: "right" },

  KeyA: { default: "は", shift: "ぃ", side: "left" },
  KeyS: { default: "か", shift: "を", side: "left" },
  KeyD: { default: "", shift: "ら", side: "left" },
  KeyF: { default: "と", shift: "あ", side: "left" },
  KeyG: { default: "た", shift: "よ", side: "left" },
  KeyH: { default: "く", shift: "ま", side: "right" },
  KeyJ: { default: "う", shift: "お", side: "right" },
  KeyK: { default: "", shift: "も", side: "right" },
  KeyL: { default: "゛", shift: "わ", side: "right" },
  Semicolon: { default: "き", shift: "ゆ", side: "right" },
  Quote: { default: "れ", shift: "]", side: "right" },

  KeyZ: { default: "す", shift: "ぅ", side: "left" },
  KeyX: { default: "け", shift: "へ", side: "left" },
  KeyC: { default: "に", shift: "せ", side: "left" },
  KeyV: { default: "な", shift: "ゅ", side: "left" },
  KeyB: { default: "さ", shift: "ゃ", side: "left" },
  KeyN: { default: "っ", shift: "む", side: "right" },
  KeyM: { default: "る", shift: "ろ", side: "right" },
  Comma: { default: ",", shift: "ね", side: "right" },
  Period: { default: ".", shift: "-", side: "right" },
  Slash: { default: "゜", shift: "ぉ", side: "right" },
  IntlRo: { default: "・", shift: undefined, side: "right" },
} satisfies Keymap;

type State = {
  shift: "none" | "left" | "right";
};

type ValidKeys = keyof typeof keymap;

/**
 * 配列の範囲内のキー入力かどうかを判定する
 */
function makeIsValidKey(keymap: Keymap) {
  return function isValidKey(key: string): key is ValidKeys {
    return Object.keys(keymap).includes(key);
  };
}

/**
 * キー入力を処理する
 */
function makeProcess(keymap: Keymap) {
  const process: InputProcessor<State, ValidKeys> = ({ state, key }) => {
    if (state.shift === "none") {
      if (key === "KeyD") {
        return { state: { shift: "left" }, event: undefined };
      } else if (key === "KeyK") {
        return { state: { shift: "right" }, event: undefined };
      } else {
        const event = convertKanaToEvent(keymap[key].default);
        return { state: { shift: "none" }, event };
      }
    } else if (state.shift === "left") {
      if (key === "KeyD") {
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
      if (key === "KeyK") {
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

  return process;
}

export type TsukiLayout = {
  process: InputProcessor<State, ValidKeys>;
  isValidKey: (key: string) => key is ValidKeys;
  updateKeyGuide: UpdateKeyGuide;
};

/**
 * 月配列用のキー処理関数
 */
export function makeTsukiLayout(): TsukiLayout {
  const process = makeProcess(keymap);
  const isValidKey = makeIsValidKey(keymap);

  return {
    process,
    isValidKey,
    updateKeyGuide,
  };
}
