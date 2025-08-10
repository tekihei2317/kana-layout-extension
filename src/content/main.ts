import { makeTsukiLayout, type TsukiLayout } from "../layouts/tsuki-2-263";
import { updateKeyGuide } from "../layouts/tsuki-2-263-keyguide";
import {
  applyHighlights,
  updateHandsHighlights,
  tsukiLayoutLayers,
} from "../keyguide";
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

  // スペースを押した時にハイライトを削除する
  // とりあえず、スペースを押した時にspaceにハイライトが付いてたら消すことにする
  if (event.key === " ") {
    const keyboardContainer = document.getElementById("vk_container");

    if (
      keyboardContainer &&
      keyboardContainer.querySelector("div.key_space.active")
    ) {
      keyboardContainer.children[0].remove();

      const { layerId } = updateKeyGuide({
        state: app.state,
        restCharacters: "",
      });
      keyboardContainer.appendChild(tsukiLayoutLayers[layerId]);
    }
    return;
  }

  // キー入力の変換処理
  if (tsukiLayout.isValidKey(event.code)) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const result = tsukiLayout.process({ state: app.state, key: event.code });
    app.state = result.state;

    if (result.event !== undefined) {
      event.target?.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: result.event.key,
          code: result.event.code,
          keyCode: result.event.keyCode,
          shiftKey: result.event.shift,
          bubbles: true,
        }),
      );
    }

    const keyboardContainer = document.getElementById("vk_container");
    const sentence = document.getElementById("sentenceText");
    const hands = document.getElementById("hands");

    // キーガイドを更新する
    if (keyboardContainer) {
      keyboardContainer.children[0].remove();

      let restCharacters = "";
      if (sentence) {
        const restElement = sentence.querySelector("span:not(.entered)");

        if (restElement) {
          restCharacters = restElement.textContent ?? "";
        } else {
          // 最後の文字を打ったあとはsentenceTextが空のdivになるので、restElementはnullになる
          restCharacters = "";
        }
      }

      const { layerId, highlights, fingers } = updateKeyGuide({
        state: app.state,
        restCharacters,
      });
      const keyboard = applyHighlights(layerId, highlights);
      keyboardContainer.appendChild(keyboard);

      // 指のハイライトを更新する
      if (hands) {
        updateHandsHighlights(hands, fingers);
      }
    }
  }
}

/**
 * ストレージから設定を読み込む
 */
async function loadSettings(): Promise<Settings> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(null, (result) => {
      const settings: Settings = {
        enabled: result.enabled ?? defaultSettings.enabled,
        kanaLayout: result.kanaLayout ?? defaultSettings.kanaLayout,
      };
      resolve(settings);
    });
  });
}

/**
 * 設定をアプリケーションに同期する
 */
function syncAppWithSettings(app: Application): Application {
  // 前の設定のイベントハンドラがあれば削除する
  app.cleanup();

  if (app.settings && app.settings.enabled) {
    // イベントハンドラを設定する
    const layout = makeTsukiLayout();
    const handler = (event: KeyboardEvent) => handleKeyDown(event, layout);
    window.addEventListener("keydown", handler, true);

    // e-typingのフレームを監視する
    const isEtypingIframe = window.location.href.includes(
      "/jsa_kana/typing.asp",
    );
    if (isEtypingIframe) {
      const etypingApp = document.getElementById("app");
      if (etypingApp) {
        rootObserver.observe(etypingApp, {
          subtree: true,
          childList: true,
        });
      }
    }

    const cleanup = () => {
      window.removeEventListener("keydown", handler, true);
      rootObserver.disconnect();
      wordDisplayObserver.disconnect();
    };

    return { ...app, cleanup };
  }

  return app;
}

// e-typingのプレイ画面を監視する
const rootObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      // ワードの表示の検知のため、example_containerを監視する
      if (node instanceof Element && node.id === "example_container") {
        wordDisplayObserver.observe(node, {
          childList: true,
          subtree: true,
        });
      }

      // キーボードが表示されたとき、置き換える
      if (node instanceof Element && node.id === "virtual_keyboard") {
        const container = node.querySelector("#vk_container");
        if (!container) {
          throw new Error("#vk_containerが見つかりませんでした");
        }

        container.children[0].remove();
        const { layerId } = updateKeyGuide({
          state: app.state,
          restCharacters: "",
        });
        const keyboard = applyHighlights(layerId, ["space"]);
        container.appendChild(keyboard);
      }
    }
  }
});

// ワードが表示されたときに、次のキーをハイライトする
const wordDisplayObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      const isEtypingWord =
        node instanceof Element &&
        node.tagName === "SPAN" &&
        !node.classList.contains("entered") &&
        node.textContent?.trim() !== "";

      if (isEtypingWord) {
        const word = node.textContent!.trim();

        // キーガイドを更新する
        const container = document.getElementById("vk_container");
        if (container) {
          const { layerId, highlights, fingers } = updateKeyGuide({
            state: app.state,
            restCharacters: word,
          });

          const keyboard = applyHighlights(layerId, highlights);
          container.children[0].remove();
          container.appendChild(keyboard);

          const hands = document.getElementById("hands");
          if (hands) {
            updateHandsHighlights(hands, fingers);
          }
        }
      }
    }
  }
});

/**
 * メインページまたはe-typingのプレイ画面のiframeの場合にのみ、拡張機能を有効化する
 */
async function main() {
  const isEtypingIframe = window.location.href.includes("/jsa_kana/typing.asp");

  if (window.parent === window || isEtypingIframe) {
    const settings = await loadSettings();
    app = { ...app, settings };
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

    if (changes.kanaLayout) {
      app.settings.kanaLayout = changes.kanaLayout.newValue;
    }

    app = syncAppWithSettings(app);
  }
});
