import { InputProcessor } from "../input-processor";
import { convertKanaToEvent } from "../typing-event";
import { updateKeyGuide, UpdateKeyGuide } from "./tsuki-2-263-keyguide";

type KeyboardLayoutKind = "JIS" | "US";

type KeymapEntry = { default: string; shift: string; side: "left" | "right" };

function createKeymap(
  keyboardLayout: KeyboardLayoutKind
): Record<string, KeymapEntry> {
  const layouts = {
    JIS: ["qwertyuiop@", "asdfghjkl;:", "zxcvbnm,./"],
    US: ["qwertyuiop[", "asdfghjkl;'", "zxcvbnm,./"],
  };
  const layout = layouts[keyboardLayout];

  return {
    [layout[0][0]]: { default: "そ", shift: "ぁ", side: "left" }, // q
    [layout[0][1]]: { default: "こ", shift: "ひ", side: "left" }, // w
    [layout[0][2]]: { default: "し", shift: "ほ", side: "left" }, // e
    [layout[0][3]]: { default: "て", shift: "ふ", side: "left" }, // r
    [layout[0][4]]: { default: "ょ", shift: "め", side: "left" }, // t

    [layout[1][0]]: { default: "は", shift: "ぃ", side: "left" }, // a
    [layout[1][1]]: { default: "か", shift: "を", side: "left" }, // s
    [layout[1][2]]: { default: "", shift: "ら", side: "left" }, // d
    [layout[1][3]]: { default: "と", shift: "あ", side: "left" }, // f
    [layout[1][4]]: { default: "た", shift: "よ", side: "left" }, // g

    [layout[2][0]]: { default: "す", shift: "ぅ", side: "left" }, // z
    [layout[2][1]]: { default: "け", shift: "へ", side: "left" }, // x
    [layout[2][2]]: { default: "に", shift: "せ", side: "left" }, // c
    [layout[2][3]]: { default: "な", shift: "ゅ", side: "left" }, // v
    [layout[2][4]]: { default: "さ", shift: "ゃ", side: "left" }, // b

    [layout[0][5]]: { default: "つ", shift: "ぬ", side: "right" }, // y
    [layout[0][6]]: { default: "ん", shift: "え", side: "right" }, // u
    [layout[0][7]]: { default: "い", shift: "み", side: "right" }, // i
    [layout[0][8]]: { default: "の", shift: "や", side: "right" }, // o
    [layout[0][9]]: { default: "り", shift: "ぇ", side: "right" }, // p
    [layout[0][10]]: { default: "ち", shift: "[", side: "right" }, // [ or @

    [layout[1][5]]: { default: "く", shift: "ま", side: "right" }, // h
    [layout[1][6]]: { default: "う", shift: "お", side: "right" }, // j
    [layout[1][7]]: { default: "", shift: "も", side: "right" }, // k
    [layout[1][8]]: { default: "゛", shift: "わ", side: "right" }, // l
    [layout[1][9]]: { default: "き", shift: "ゆ", side: "right" }, // ;
    [layout[1][10]]: { default: "れ", shift: "]", side: "right" }, // ' or :

    [layout[2][5]]: { default: "っ", shift: "む", side: "right" }, // n
    [layout[2][6]]: { default: "る", shift: "ろ", side: "right" }, // m
    [layout[2][7]]: { default: ",", shift: "ね", side: "right" }, //,
    [layout[2][8]]: { default: ".", shift: "-", side: "right" }, // .
    [layout[2][9]]: { default: "゜", shift: "ぉ", side: "right" }, // /
  };
}

const keymaps = {
  JIS: createKeymap("JIS"),
  US: createKeymap("US"),
};

type State = {
  shift: "none" | "left" | "right";
};

/**
 * 配列の範囲内のキー入力かどうかを判定する
 */
function makeIsValidKey(layout: KeyboardLayoutKind) {
  const keymap = keymaps[layout];

  return function isValidKey(key: string): boolean {
    return Object.keys(keymap).includes(key);
  };
}

/**
 * キー入力を処理する
 */
function makeProcess(layout: KeyboardLayoutKind) {
  const keymap = keymaps[layout];

  const process: InputProcessor<State, string> = ({ state, key }) => {
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

  return process;
}

export type TsukiLayout = {
  process: InputProcessor<State, string>;
  isValidKey: (key: string) => boolean;
  updateKeyGuide: UpdateKeyGuide;
};

/**
 * 月配列用のキー処理関数
 */
export function makeTsukiLayout(
  keyboardLayout: KeyboardLayoutKind
): TsukiLayout {
  const process = makeProcess(keyboardLayout);
  const isValidKey = makeIsValidKey(keyboardLayout);

  return {
    process,
    isValidKey,
    updateKeyGuide,
  };
}
