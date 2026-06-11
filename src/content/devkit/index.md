---
update: 2026-06-11
---

このページでは、mochiOSのアプリ開発に使えるDevKitについて紹介します。
DevKitは現在開発中で、完全にオープンソースです。リポジトリは[こちら](https://github.com/mochiOS/devkit)です。

## devkitとは？
devkitはmochiOSのアプリ開発、特にKome言語を用いた開発に用いるツールです。
このツールには次のようなものが含まれています。

- `kome`: kome言語のパッケージマネージャ、devkitの中枢的存在
- `komec`: kome言語のコンパイラ
- `msign`: mochiOSのアプリパッケージに署名したり、鍵を生成します
- `mpack`: アプリをmochiOSアプリパッケージ（`.pkg`）にパッケージします
