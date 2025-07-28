# kana-layout-extension

ブラウザ拡張機能で、タイピングゲーム用にかな入力配列をエミュレートできるかどうかを試す実験です。

## やりたいこと

- Chrome拡張機能で月配列でタイピングゲームができるか試したい
- それができたら他の配列も使えるようにしたい

最初はかな入力用のタイピングゲームで遊ぶ想定で作ってみる。キーボード入力イベントを受け取って、新しいイベントで上書きできればOK。

とりあえずJISかな左手中段の

ち→[
と→f
し→e
は→a

が打てるようにできるかを、e-typingで検証する。左が月配列で入力するキー。

つまり以下のようにマッピングすればよい。

[→a
f→s
e→d
a→f

## 作り方

とりあえず最初はJavaScriptでJSDocを書いて作る。拡張機能くらいの規模であれば全部JavaScriptでもいいかも。

最初は素直にKeyboardEventを発火する処理を書いてみる。

[Enterくんの開発メモ](https://zenn.dev/dotdotdot/scraps/eae386fab13242)

それがe-typingで動かなかったら、以下の方法を参考にして書く。

[chrome拡張からkeyboard操作をする方法 | Mitsuru Takahashi Personal Site](https://www.mitsuru-takahashi.net/blog/chrome-extension-keyboard/)
