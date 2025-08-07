type State = {
  shift: "none" | "left" | "right";
};

type KeyboardLayerId = "normal" | "leftShifted" | "rightShifted";

export type KeyPosition =
  | [0, 0]
  | [0, 1]
  | [0, 2]
  | [0, 3]
  | [0, 4]
  | [0, 5]
  | [0, 6]
  | [0, 7]
  | [0, 8]
  | [0, 9]
  | [0, 10]
  | [1, 0]
  | [1, 1]
  | [1, 2]
  | [1, 3]
  | [1, 4]
  | [1, 5]
  | [1, 6]
  | [1, 7]
  | [1, 8]
  | [1, 9]
  | [1, 10]
  | [2, 0]
  | [2, 1]
  | [2, 2]
  | [2, 3]
  | [2, 4]
  | [2, 5]
  | [2, 6]
  | [2, 7]
  | [2, 8]
  | [2, 9]
  | [2, 10]
  | "space";

const keyPositionMap = {
  q: [0, 0],
  w: [0, 1],
  e: [0, 2],
  r: [0, 3],
  t: [0, 4],
  y: [0, 5],
  u: [0, 6],
  i: [0, 7],
  o: [0, 8],
  p: [0, 9],
  "[": [0, 10],
  a: [1, 0],
  s: [1, 1],
  d: [1, 2],
  f: [1, 3],
  g: [1, 4],
  h: [1, 5],
  j: [1, 6],
  k: [1, 7],
  l: [1, 8],
  ";": [1, 9],
  '"': [1, 10],
  z: [2, 0],
  x: [2, 1],
  c: [2, 2],
  v: [2, 3],
  b: [2, 4],
  n: [2, 5],
  m: [2, 6],
  ",": [2, 7],
  ".": [2, 8],
  "/": [2, 9],
} satisfies Record<string, KeyPosition>;

export type UpdateKeyGuide = (args: {
  state: State;
  restCharacters: string;
}) => { layerId: KeyboardLayerId; highlights: KeyPosition[] };

/**
 * キーガイドのレイヤーIDを計算する
 */
function getKeyGuideLayerId(state: State): KeyboardLayerId {
  switch (state.shift) {
    case "none":
      return "normal";
    case "left":
      return "leftShifted";
    case "right":
      return "rightShifted";
  }
}

type KeyInfo = {
  position: KeyPosition;
  side: "left" | "right";
  shift: boolean;
};

const keyInfo = {
  そ: { position: [0, 0], side: "left", shift: false },
  こ: { position: [0, 1], side: "left", shift: false },
  し: { position: [0, 2], side: "left", shift: false },
  て: { position: [0, 3], side: "left", shift: false },
  ょ: { position: [0, 4], side: "left", shift: false },
  つ: { position: [0, 5], side: "right", shift: false },
  ん: { position: [0, 6], side: "right", shift: false },
  い: { position: [0, 7], side: "right", shift: false },
  の: { position: [0, 8], side: "right", shift: false },
  り: { position: [0, 9], side: "right", shift: false },
  ち: { position: [0, 10], side: "right", shift: false },

  は: { position: [1, 0], side: "left", shift: false },
  か: { position: [1, 1], side: "left", shift: false },
  // "☆": { position: [1, 2], side: "left", shift: false },
  と: { position: [1, 3], side: "left", shift: false },
  た: { position: [1, 4], side: "left", shift: false },
  く: { position: [1, 5], side: "right", shift: false },
  う: { position: [1, 6], side: "right", shift: false },
  // https://github.com/tekihei2317/kana-layout-extension/issues/10
  ウ: { position: [1, 6], side: "right", shift: false },
  // "★": { position: [1, 7], side: "right", shift: false },
  "゛": { position: [1, 8], side: "right", shift: false },
  き: { position: [1, 9], side: "right", shift: false },
  れ: { position: [1, 10], side: "right", shift: false },

  す: { position: [2, 0], side: "left", shift: false },
  け: { position: [2, 1], side: "left", shift: false },
  に: { position: [2, 2], side: "left", shift: false },
  な: { position: [2, 3], side: "left", shift: false },
  さ: { position: [2, 4], side: "left", shift: false },
  っ: { position: [2, 5], side: "right", shift: false },
  る: { position: [2, 6], side: "right", shift: false },
  "、": { position: [2, 7], side: "right", shift: false },
  "。": { position: [2, 8], side: "right", shift: false },
  "゜": { position: [2, 9], side: "right", shift: false },
  "・": { position: [2, 10], side: "right", shift: false },

  ぁ: { position: [0, 0], side: "left", shift: true },
  ひ: { position: [0, 1], side: "left", shift: true },
  ほ: { position: [0, 2], side: "left", shift: true },
  ふ: { position: [0, 3], side: "left", shift: true },
  め: { position: [0, 4], side: "left", shift: true },
  ぬ: { position: [0, 5], side: "right", shift: true },
  え: { position: [0, 6], side: "right", shift: true },
  み: { position: [0, 7], side: "right", shift: true },
  や: { position: [0, 8], side: "right", shift: true },
  ぇ: { position: [0, 9], side: "right", shift: true },
  "「": { position: [0, 10], side: "right", shift: true },

  ぃ: { position: [1, 0], side: "left", shift: true },
  を: { position: [1, 1], side: "left", shift: true },
  ら: { position: [1, 2], side: "left", shift: true },
  あ: { position: [1, 3], side: "left", shift: true },
  よ: { position: [1, 4], side: "left", shift: true },
  ま: { position: [1, 5], side: "right", shift: true },
  お: { position: [1, 6], side: "right", shift: true },
  も: { position: [1, 7], side: "right", shift: true },
  わ: { position: [1, 8], side: "right", shift: true },
  ゆ: { position: [1, 9], side: "right", shift: true },
  "」": { position: [1, 10], side: "right", shift: true },

  ぅ: { position: [2, 0], side: "left", shift: true },
  へ: { position: [2, 1], side: "left", shift: true },
  せ: { position: [2, 2], side: "left", shift: true },
  ゅ: { position: [2, 3], side: "left", shift: true },
  ゃ: { position: [2, 4], side: "left", shift: true },
  む: { position: [2, 5], side: "right", shift: true },
  ろ: { position: [2, 6], side: "right", shift: true },
  ね: { position: [2, 7], side: "right", shift: true },
  ー: { position: [2, 8], side: "right", shift: true },
  ぉ: { position: [2, 9], side: "right", shift: true },
} satisfies Record<string, KeyInfo>;

/**
 * キーガイドのハイライトを計算する
 */
function getKeyGuideHightlights(
  state: State,
  nextCharacter: string | undefined,
): KeyPosition[] {
  if (nextCharacter === undefined) return [];
  if (!(nextCharacter in keyInfo)) return [];

  const info = keyInfo[nextCharacter as keyof typeof keyInfo];
  switch (state.shift) {
    // 無シフトの場合
    case "none": {
      if (!info.shift) return [info.position];
      else {
        if (info.side === "left") return [keyPositionMap.k];
        else return [keyPositionMap.d];
      }
    }
    // 左シフトの場合
    case "left": {
      if (info.shift) {
        if (info.side === "right") return [info.position];
        else return [];
      } else {
        if (info.side === "left") return [info.position];
        else return [];
      }
    }
    // 右シフトの場合
    case "right": {
      if (info.shift) {
        if (info.side === "left") return [info.position];
        else return [];
      } else {
        if (info.side === "right") return [info.position];
        else return [];
      }
    }
  }
}

export type Finger =
  | "left_little"
  | "left_ring"
  | "left_middle"
  | "left_index"
  | "left_thumb"
  | "right_thumb"
  | "right_index"
  | "right_middle"
  | "right_ring"
  | "right_little";

function positionToFinger(position: KeyPosition): Finger {
  if (position === "space") return "right_thumb";

  const [_, column] = position;

  switch (column) {
    case 0:
      return "left_little";
    case 1:
      return "left_ring";
    case 2:
      return "left_middle";
    case 3:
      return "left_index";
    case 4:
      return "left_index";
    case 5:
      return "right_index";
    case 6:
      return "right_index";
    case 7:
      return "right_middle";
    case 8:
      return "right_ring";
    case 9:
      return "right_little";
    case 10:
      return "right_little";
  }
}

/**
 * キーガイドを更新する
 */
export function updateKeyGuide({
  state,
  restCharacters,
}: {
  state: State;
  restCharacters: string;
}): { layerId: KeyboardLayerId; highlights: KeyPosition[]; fingers: Finger[] } {
  const layerId = getKeyGuideLayerId(state);
  const positions = getKeyGuideHightlights(state, restCharacters[0]);
  const fingers = positions.map((position) => positionToFinger(position));

  return { layerId, highlights: positions, fingers };
}
