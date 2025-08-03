type ETypingPhase =
  | "start"
  | "waiting"
  | "countdown"
  | "playing"
  | "interval"
  | "result";

export function createETypingObserver(
  app: HTMLDivElement,
  options: {
    onWaiting: (container: Element) => void;
  }
): MutationObserver {
  let currentPhase: ETypingPhase = "start";

  const eTypingObserver = new MutationObserver(() => {
    const newPhase = detectETypingPhase(app);

    if (newPhase !== currentPhase) {
      console.log(`フェーズ変更: ${currentPhase} → ${newPhase}`);
      currentPhase = newPhase;

      if (currentPhase === "waiting") {
        const container = app.querySelector("#vk_container")!;
        options.onWaiting(container);
      }
    }
  });

  return eTypingObserver;
}

function detectETypingPhase(app: HTMLDivElement): ETypingPhase {
  // 開始画面
  if (app.querySelector("#start_view")) return "start";

  const container = app.querySelector("#example_container");
  if (!container) {
    // 例文を入れるコンテナがなかったらリザルト画面
    return "result";
  }

  if (container.querySelector("#start_msg")) return "waiting";
  if (container.querySelector("#countdown")) return "countdown";
  if (container.querySelector("#sentenceText span")) return "playing";
  return "interval";
}
