import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  description: "タイピングゲーム用のかな入力配列エミュレーター",
  icons: {
    48: "public/logo.png",
  },
  action: {
    default_icon: {
      48: "public/logo.png",
    },
    default_popup: "src/popup/index.html",
  },
  content_scripts: [
    {
      js: ["src/content/main.ts"],
      matches: [
        "https://www.e-typing.ne.jp/*",
        "https://typing-tube.net/*",
        "https://ytyping.net/*",
        "https://taisoku.com/*",
      ],
      all_frames: true,
    },
  ],
  permissions: ["storage"],
});
