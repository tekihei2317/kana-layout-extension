console.log("Kana Layout Extension loaded");

function handleKeyDown(event) {
  console.log(
    `Key: ${event.key}, isTrusted: ${event.isTrusted}, keyCode: ${event.keyCode}, which: ${event.which}`
  );

  // f→sに変換する（月配列の「と」→JISかなの「と」）
  if (event.key === "f") {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    console.log("Converting f to s");

    // より詳細なイベントを作成
    const mappedEvent = new KeyboardEvent("keydown", {
      // key: "s",
      // code: "KeyS",
      keyCode: 83, // sのキーコード
      // which: 83,
      // charCode: 83,
      bubbles: true,
      // cancelable: true,
      // composed: true,
      // 修飾キーの状態を保持
      // shiftKey: event.shiftKey,
      // ctrlKey: event.ctrlKey,
      // altKey: event.altKey,
      // metaKey: event.metaKey,
    });

    console.log(
      `Generated event - Key: ${mappedEvent.key}, isTrusted: ${mappedEvent.isTrusted}, keyCode: ${mappedEvent.keyCode}`
    );

    event.target.dispatchEvent(mappedEvent);
  }
}

// キャプチャフェーズで最優先でキーイベントを処理
document.addEventListener("keydown", handleKeyDown, true);

// フォーカスされている要素を監視
document.addEventListener("focusin", (event) => {
  console.log("Focus changed to:", event.target);
});

// 5秒後にアクティブな要素を表示
setTimeout(() => {
  console.log("Currently focused element:", document.activeElement);
  console.log(
    "All input elements:",
    document.querySelectorAll("input, textarea")
  );
}, 5000);
