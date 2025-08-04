import { Finger, KeyPosition } from "./layouts/tsuki-2-263-keyguide";

type EtypingKeyPosition =
  | "key_q"
  | "key_w"
  | "key_e"
  | "key_r"
  | "key_t"
  | "key_y"
  | "key_u"
  | "key_i"
  | "key_o"
  | "key_p"
  | "key_192"
  | "key_219"
  | "key_a"
  | "key_s"
  | "key_d"
  | "key_f"
  | "key_g"
  | "key_h"
  | "key_j"
  | "key_k"
  | "key_l"
  | "key_187"
  | "key_186"
  | "key_221"
  | "key_z"
  | "key_x"
  | "key_c"
  | "key_v"
  | "key_b"
  | "key_n"
  | "key_m"
  | "key_comma"
  | "key_dot"
  | "key_191"
  | "key_226"
  | "key_49"
  | "key_50"
  | "key_51"
  | "key_52"
  | "key_53"
  | "key_54"
  | "key_55"
  | "key_56"
  | "key_57"
  | "key_48"
  | "key_189"
  | "key_222"
  | "key_220"
  | "key_space"
  | "key_shift_right"
  | "key_shift_left"
  | "key_13"
  | "key_244"
  | "key_9"
  | "key_20"
  | "key_8"
  | "key_17_left"
  | "key_91_left"
  | "key_18_left"
  | "key_29"
  | "key_28"
  | "key_242"
  | "key_18_right"
  | "key_91_right"
  | "key_17_right";

type KeyData = {
  position: EtypingKeyPosition;
  classes: string[];
};

const keyboardData: KeyData[] = [
  { position: "key_q", classes: ["little", "left"] },
  { position: "key_w", classes: ["ring", "left"] },
  { position: "key_e", classes: ["middle", "left"] },
  { position: "key_r", classes: ["index", "left"] },
  { position: "key_t", classes: ["index", "left"] },
  { position: "key_y", classes: ["index", "right"] },
  { position: "key_u", classes: ["index", "right"] },
  { position: "key_i", classes: ["middle", "right"] },
  { position: "key_o", classes: ["ring", "right"] },
  { position: "key_p", classes: ["little", "right"] },
  { position: "key_192", classes: ["little", "right"] },
  { position: "key_219", classes: ["little", "right"] },
  { position: "key_a", classes: ["little", "left"] },
  { position: "key_s", classes: ["ring", "left"] },
  { position: "key_d", classes: ["middle", "left"] },
  { position: "key_f", classes: ["index", "left"] },
  { position: "key_g", classes: ["index", "left"] },
  { position: "key_h", classes: ["index", "right"] },
  { position: "key_j", classes: ["index", "right"] },
  { position: "key_k", classes: ["middle", "right"] },
  { position: "key_l", classes: ["ring", "right"] },
  { position: "key_187", classes: ["little", "right"] },
  { position: "key_186", classes: ["little", "right"] },
  { position: "key_221", classes: ["little", "right"] },
  { position: "key_z", classes: ["little", "left"] },
  { position: "key_x", classes: ["ring", "left"] },
  { position: "key_c", classes: ["middle", "left"] },
  { position: "key_v", classes: ["index", "left"] },
  { position: "key_b", classes: ["index", "left"] },
  { position: "key_n", classes: ["index", "right"] },
  { position: "key_m", classes: ["index", "right"] },
  { position: "key_comma", classes: ["middle", "right"] },
  { position: "key_dot", classes: ["ring", "right"] },
  { position: "key_191", classes: ["little", "right"] },
  { position: "key_226", classes: ["little", "right"] },
  { position: "key_49", classes: ["little", "left"] },
  { position: "key_50", classes: ["ring", "left"] },
  { position: "key_51", classes: ["middle", "left"] },
  { position: "key_52", classes: ["index", "left"] },
  { position: "key_53", classes: ["index", "left"] },
  { position: "key_54", classes: ["index", "right"] },
  { position: "key_55", classes: ["index", "right"] },
  { position: "key_56", classes: ["middle", "right"] },
  { position: "key_57", classes: ["ring", "right"] },
  { position: "key_48", classes: ["little", "right"] },
  { position: "key_189", classes: ["little", "right"] },
  { position: "key_222", classes: ["little", "right"] },
  { position: "key_220", classes: ["little", "right"] },
  { position: "key_space", classes: [] },
  { position: "key_shift_right", classes: [] },
  { position: "key_shift_left", classes: [] },
];

const decorativeKeys = [
  "key_13",
  "key_244",
  "key_9",
  "key_20",
  "key_8",
  "key_17_left",
  "key_91_left",
  "key_18_left",
  "key_29",
  "key_28",
  "key_242",
  "key_18_right",
  "key_91_right",
  "key_17_right",
];

export type KeyLayout = Partial<Record<EtypingKeyPosition, string>>;

/**
 * キーボードを作成する
 */
export function createKanaKeyboard(keyLayout: KeyLayout): HTMLDivElement {
  const container = document.createElement("div");
  container.id = "kana_keyboard";

  keyboardData.forEach((key) => {
    const keyElement = document.createElement("div");
    keyElement.className = key.classes.join(" ");
    keyElement.classList.add(key.position);
    if (keyLayout[key.position]) {
      keyElement.textContent = keyLayout[key.position] ?? null;
    }
    container.appendChild(keyElement);
  });

  decorativeKeys.forEach((keyId) => {
    const keyElement = document.createElement("div");
    keyElement.id = keyId;
    keyElement.className = "deco_key";
    container.appendChild(keyElement);
  });

  return container;
}

/**
 * 指のガイドを作成する
 */
export function createHandsChildren(
  fingerHighlights: Finger[]
): HTMLDivElement[] {
  const fingers: { finger: Finger; classes: string[] }[] = [
    { finger: "left_little", classes: ["finger", "little", "left"] },
    { finger: "left_ring", classes: ["finger", "ring", "left"] },
    { finger: "left_middle", classes: ["finger", "middle", "left"] },
    { finger: "left_index", classes: ["finger", "index", "left"] },
    { finger: "left_thumb", classes: ["finger", "thumb", "left"] },
    { finger: "right_thumb", classes: ["finger", "thumb", "right"] },
    { finger: "right_index", classes: ["finger", "index", "right"] },
    { finger: "right_middle", classes: ["finger", "middle", "right"] },
    { finger: "right_ring", classes: ["finger", "ring", "right"] },
    { finger: "right_little", classes: ["finger", "little", "right"] },
  ];

  return fingers.map(({ finger, classes }) => {
    const fingerElement = document.createElement("div");
    fingerElement.className = classes.join(" ");

    if (fingerHighlights.includes(finger)) {
      fingerElement.classList.add("on");
    }

    return fingerElement;
  });
}

/**
 * 既存のhands要素の子要素を更新する
 */
export function updateHandsHighlights(
  handsElement: HTMLElement,
  fingerHighlights: Finger[]
): void {
  handsElement.innerHTML = "";

  const newChildren = createHandsChildren(fingerHighlights);
  newChildren.forEach((child) => handsElement.appendChild(child));
}

const normalLayout: KeyLayout = {
  key_q: "そ",
  key_w: "こ",
  key_e: "し",
  key_r: "て",
  key_t: "ょ",
  key_y: "つ",
  key_u: "ん",
  key_i: "い",
  key_o: "の",
  key_p: "り",
  key_192: "ち",
  key_a: "は",
  key_s: "か",
  key_d: "☆",
  key_f: "と",
  key_g: "た",
  key_h: "く",
  key_j: "う",
  key_k: "★",
  key_l: "゛",
  key_187: "き",
  key_186: "れ",
  key_z: "す",
  key_x: "け",
  key_c: "に",
  key_v: "な",
  key_b: "さ",
  key_n: "っ",
  key_m: "る",
  key_comma: "、",
  key_dot: "。",
  key_191: "゜",
  key_226: "・",
  key_space: "space",
};

/**
 * KeyPosition → EtypingKeyPosition の変換
 */
function keyPositionToEtyping(
  position: KeyPosition
): EtypingKeyPosition | undefined {
  if (position === "space") {
    return "key_space";
  }

  const [row, col] = position;

  if (row === 0) {
    switch (col) {
      case 0:
        return "key_q";
      case 1:
        return "key_w";
      case 2:
        return "key_e";
      case 3:
        return "key_r";
      case 4:
        return "key_t";
      case 5:
        return "key_y";
      case 6:
        return "key_u";
      case 7:
        return "key_i";
      case 8:
        return "key_o";
      case 9:
        return "key_p";
      case 10:
        return "key_192";
    }
  } else if (row === 1) {
    switch (col) {
      case 0:
        return "key_a";
      case 1:
        return "key_s";
      case 2:
        return "key_d";
      case 3:
        return "key_f";
      case 4:
        return "key_g";
      case 5:
        return "key_h";
      case 6:
        return "key_j";
      case 7:
        return "key_k";
      case 8:
        return "key_l";
      case 9:
        return "key_187";
      case 10:
        return "key_186";
    }
  } else if (row === 2) {
    switch (col) {
      case 0:
        return "key_z";
      case 1:
        return "key_x";
      case 2:
        return "key_c";
      case 3:
        return "key_v";
      case 4:
        return "key_b";
      case 5:
        return "key_n";
      case 6:
        return "key_m";
      case 7:
        return "key_comma";
      case 8:
        return "key_dot";
      case 9:
        return "key_191";
      case 10:
        return "key_226";
    }
  }

  return undefined;
}

export const tsukiLayoutLayers = {
  normal: createKanaKeyboard(normalLayout),
  leftShifted: createKanaKeyboard({
    ...normalLayout,
    key_y: "ぬ",
    key_u: "え",
    key_i: "み",
    key_o: "や",
    key_p: "ぇ",
    key_192: "「",
    key_h: "ま",
    key_j: "お",
    key_k: "も",
    key_l: "わ",
    key_187: "ゆ",
    key_186: "」",
    key_n: "む",
    key_m: "ろ",
    key_comma: "ね",
    key_dot: "ー",
    key_191: "ぉ",
    key_226: undefined,
  }),
  rightShifted: createKanaKeyboard({
    ...normalLayout,
    key_q: "ぁ",
    key_w: "ひ",
    key_e: "ほ",
    key_r: "ふ",
    key_t: "め",
    key_a: "ぃ",
    key_s: "を",
    key_d: "ら",
    key_f: "あ",
    key_g: "よ",
    key_z: "ぅ",
    key_x: "へ",
    key_c: "せ",
    key_v: "ゅ",
    key_b: "ゃ",
  }),
};

/**
 * ハイライトを適用する
 */
export function applyHighlights(
  layerId: "normal" | "leftShifted" | "rightShifted",
  highlights: KeyPosition[]
): HTMLDivElement {
  const keyboardElement = tsukiLayoutLayers[layerId].cloneNode(
    true
  ) as HTMLDivElement;

  highlights.forEach((position) => {
    const etypingKey = keyPositionToEtyping(position);
    if (etypingKey) {
      const keyElement = keyboardElement.querySelector(`.${etypingKey}`);
      if (keyElement) {
        keyElement.classList.add("active");
      }
    }
  });

  return keyboardElement;
}
