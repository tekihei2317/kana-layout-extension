# 各タイピングサイトでの対応について

## キー入力イベントについて

### e-typing

`event.keyCode`で判定しているので、`keyCode`を書けばOKです。

### タイピング速度検定

`event.key`で判定しているので、`key`を書けばOKです。

### YTyping

からくりピエロで調査。「まちあわせはにじかんまえで」

`event.key`、`event.keyCode`のどちらか一方のみでは1文字目から打てなかった。

`event.key`と`event.keyCode`の両方を設定すると"まち"までは打てた。

`event.code`を追加してみると、ほとんどの文字は打てるようになった。

"ゅ"と"ょ"が打てなかった。"っ"は打てた。違いはなんだろう？

`event.key`の値を小文字にしていたけど、これは実際に入力した文字を表すのでシフトの場合に変更する必要があった。"ょ"はJISかなでShift + 9なので、`event.key`は`9`じゃなくて`)`にする。他のシフトが必要なキーについても同様。

"つ"の`event.key`が`Z`じゃなくて`z`でも入力できた理由は分からない。

イベントのデータが不足していた場合のフォールバックの条件分岐等が起こってたかもしれないので、改めてどれが必要か調べたほうがよさそう。

### Typing Tube

これまでのサイトと違いイベントリスナがwindowに設定されているようだったので、同じくwindowにリスナを設定して上書きする必要があった。

documentに設定した場合は、windowの素のイベントも実行されるためキーを打鍵するごとにミスが増えていった。

```js
// document→window
window.addEventListener("keydown", handleKeyDown, true);
```

## e-typingのiframe対応

e-typingは他のサイトと違ってiframeでタイピング練習部分を埋め込んでいるので、そのままの方法で拡張機能を実行することができません。

Content Scriptのall_framesを有効にし、e-typingのプレイ画面のiframeかどうかをURLで判定して有効化するようにしました。

[Chrome拡張でiframe内のDOMの変化を監視する - もやし丸の備忘録](https://dev-moyashi.hatenablog.com/entry/2020/04/05/202256)

e-typing-plusのスクリプトを挿入する方法は、ビルド設定の関係で実装が大変になりそうだったので諦めました。

[etyping-plus/src/js/content.js at develop · nohtaray/etyping-plus](https://github.com/nohtaray/etyping-plus/blob/develop/src/js/content.js)
