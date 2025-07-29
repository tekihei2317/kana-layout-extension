# 各タイピングサイトでの対応について

## e-typing

`event.keyCode`で判定しているので、`keyCode`を書けばOK。

## タイピング速度検定

`event.key`で判定知るので、`key`を書けばOK。

## YTyping

からくりピエロで調査。「まちあわせはにじかんまえで」

`event.key`、`event.keyCode`のどちらか一方のみでは1文字目から打てなかった。

`event.key`と`event.keyCode`の両方を設定すると"まち"までは打てた。

まずはcodeを追加して試してみましょう。

Digit1
Digit2
Digit3
Digit4
Digit5
Digit6
Digit7
Digit8
Digit9
Digit0
Minus
Equal
IntlYen

KeyQ
KeyW
KeyE
KeyR
KeyT
KeyY
KeyU
KeyI
KeyO
KeyP
BracketLeft
BracketRight

KeyA
KeyS
KeyD
KeyF
KeyG
KeyH
KeyJ
KeyK
KeyL
Semicolon
Quote
Backslash

KeyZ
KeyX
KeyC
KeyV
KeyB
KeyN
KeyM
Comma
Period
Slash
IntlRo