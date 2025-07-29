export interface Settings {
  enabled: boolean;
  keyboardLayout: "JIS" | "US";
  kanaLayout: "tsuki";
}

export const defaultSettings: Settings = {
  enabled: true,
  keyboardLayout: "JIS",
  kanaLayout: "tsuki",
};
