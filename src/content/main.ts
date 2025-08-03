import { makeTsukiLayout, type TsukiLayout } from "../layouts/tsuki-2-263";
import { updateKeyGuide } from "../layouts/tsuki-2-263-keyguide";
import { applyHighlights } from "../keyguide";
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
function handleKeyDown(event: KeyboardEvent, tsukiLayout: TsukiLayout) {
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

    const keyboardContainer = document.getElementById("vk_container");
    const sentence = document.getElementById("sentenceText");

    // キーガイドを更新する
    if (keyboardContainer) {
      keyboardContainer.children[0].remove();

      let restCharacters = "";
      if (sentence) {
        const restElement = sentence.querySelector("span:not(.entered)");

        if (restElement) restCharacters = restElement.textContent ?? "";
        else {
          // 最後の文字を打ったあとはsentenceTextが空のdivになるので、restElementはnullになる
          restCharacters = "";
        }
      }

      const { layerId, highlights } = updateKeyGuide({
        state: app.state,
        restCharacters,
      });
      const keyboard = applyHighlights(layerId, highlights);
      keyboardContainer.appendChild(keyboard);
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
  // 前の設定のイベントハンドラがあれば削除する
  app.cleanup();

  if (app.settings && app.settings.enabled) {
    // イベントハンドラを設定する
    const layout = makeTsukiLayout(app.settings.keyboardLayout);
    const handler = (event: KeyboardEvent) => handleKeyDown(event, layout);

    window.addEventListener("keydown", handler, true);
    const cleanup = () => window.removeEventListener("keydown", handler, true);

    return { ...app, cleanup };
  }

  return app;
}

let keyguideInitialized = false;

/**
 * メインページまたはe-typingのプレイ画面のiframeの場合にのみ、拡張機能を有効化する
 */
async function main() {
  const isEtypingIframe = window.location.href.includes("/jsa_kana/typing.asp");

  if (window.parent === window || isEtypingIframe) {
    const settings = await loadSettings();
    app = { ...app, settings };
    app = syncAppWithSettings(app);

    if (isEtypingIframe) {
      const etypingApp = document.getElementById("app");
      if (!etypingApp) return;

      const observer = new MutationObserver((mutations) => {
        // キーボードが表示されたとき、置き換える
        mutations.forEach((mutation) => {
          if (!(mutation.target instanceof Element)) return;

          // #vk_containerに#kana_keyboardが追加され、その後#kana_keyboardにキーが一つずつ追加される
          if (mutation.target.id === "vk_container") {
            const container = mutation.target;

            if (!keyguideInitialized) {
              keyguideInitialized = true;

              container.children[0].remove();
              const { layerId } = updateKeyGuide({
                state: app.state,
                restCharacters: "",
              });

              const keyboard = applyHighlights(layerId, ["space"]);
              container.appendChild(keyboard);
              console.log("appended");
            }
          }
        });
      });
      observer.observe(etypingApp, { subtree: true, childList: true });
    }
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
