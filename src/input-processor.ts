import { TypingEvent } from "./typing-event";

// それぞれの配列が持つべき内部状態がある
// 配列ごとの処理は { State, Key } -> { State, Event }の形
// Eventが複数ある場合は未対応（例えば濁音を1打鍵で打てる配列だと複数必要）

/**
 * 配列ごとのキー入力の処理方法
 *
 * State: それぞれの配列が持つ内部状態
 * Key: 配列が受け付けるキー
 */
export type InputProcessor<State, Key> = (args: { state: State; key: Key }) => {
  state: State;
  event: TypingEvent | undefined;
};
