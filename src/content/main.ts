import { tsukiLayout } from "../layouts/tsuki-2-263";
import { Settings, defaultSettings } from "../settings";

type State = {
  shift: "none" | "left" | "right";
};

type Application = {
  state: State;
  settings: Settings | undefined;
  cleanup: () => void;
};

let app: Application = {
  state: { shift: "none" },
  settings: undefined,
  cleanup: () => {},
};

/**
 * キーボードイベントを処理する
 */
function handleKeyDown(event: KeyboardEvent) {
  if (!event.isTrusted) return;

  if (tsukiLayout.isValidKey(event.key)) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const result = tsukiLayout.process({ state: app.state, key: event.key });
    app.state = result.state;

    if (result.event !== undefined) {
      event.target?.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: result.event.key,
          code: result.event.code,
          keyCode: result.event.keyCode,
          shiftKey: result.event.shift,
          bubbles: true,
        })
      );
    }
  }
}

/**
 * ストレージから設定を読み込む
 */
async function loadSettings(): Promise<Settings> {
  const result = await chrome.storage.sync.get([
    "enabled",
    "keyboardLayout",
    "kanaLayout",
  ]);
  const settings: Settings = {
    enabled: result.enabled ?? defaultSettings.enabled,
    keyboardLayout: result.keyboardLayout ?? defaultSettings.keyboardLayout,
    kanaLayout: result.kanaLayout ?? defaultSettings.kanaLayout,
  };
  return settings;
}

/**
 * 設定をアプリケーションに同期する
 */
function syncAppWithSettings(app: Application): Application {
  function createKeydownHandler(
    _settings: Settings
  ): (event: KeyboardEvent) => void {
    return (event: KeyboardEvent) => handleKeyDown(event);
  }

  // 前の設定のイベントハンドラがあれば削除する
  app.cleanup();

  if (app.settings && app.settings.enabled) {
    // イベントハンドラを設定する
    const handler = createKeydownHandler(app.settings);
    window.addEventListener("keydown", handler, true);
    const cleanup = () => window.removeEventListener("keydown", handler, true);

    return { ...app, cleanup };
  }

  return app;
}

/**
 * メインページまたはe-typingのプレイ画面のiframeの場合にのみ、拡張機能を有効化する
 */
async function main() {
  const isEtypingIframe = window.location.href.includes("/jsa_kana/typing.asp");

  if (window.parent === window || isEtypingIframe) {
    app = { ...app, settings: await loadSettings() };
    app = syncAppWithSettings(app);
  }
}

main();

// 設定変更をリアルタイムで反映する
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync") {
    if (!app.settings) return;
    if (changes.enabled) {
      app.settings.enabled = changes.enabled.newValue;
    }

    if (changes.keyboardLayout) {
      app.settings.keyboardLayout = changes.keyboardLayout.newValue;
    }

    if (changes.kanaLayout) {
      app.settings.kanaLayout = changes.kanaLayout.newValue;
    }

    app = syncAppWithSettings(app);
  }
});
